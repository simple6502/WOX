// commands/image2image.js
const fs = require('fs');
const { MessageAttachment } = require('discord.js');

let fetch;
(async () => {
  const module = await import("node-fetch");
  fetch = module.default;
})();

module.exports = {
  name: 'image2image',
  description: 'Modify an image using Stable Diffusion',
  usage: 'X/image2image <image> <prompt> [<width=>] [<height=>] [<steps=>] [<seed=>] [<negative_prompt=>]',
  shorthand: 'i2i',
  longDescriptionInfo: 'The image2image command takes in an image and a prompt as an input. With this, you either submit it the way it is, or edit some aditional tags.\n\nHere are those tags:\n\nwidth (edit the horizontal image resolution) [Min = 256, Max = 768]\nheight (edit the vertical image resolution) [Min = 256, Max = 768]\nsteps (quality of the output image) [Min = 1, Max = 60]\n seed (just like a Minecraft world seed)\n negative_prompt (just like the prompt but opposite)',
  queueTag: 'MEDIA',
  async execute(message, args) {
    const attachment = message.attachments.first();

    if (!attachment) {
      return message.reply('You need to attach an image');
    }

    const response = await fetch(attachment.url);
    const buffer = await response.buffer();
    await fs.promises.writeFile('./images/i2ipromptimage.png', buffer);

     // Set default values
    let width = 512;
    let height = 512;
    let steps = 20;
    let seed = -1;
    let negative_prompt = '';

    args = args.filter(arg => {
        if (arg.startsWith('width=')) {
          width = Math.max(Math.min(parseInt(arg.split('=')[1]), 768), 256);
          return false;
        } else if (arg.startsWith('height=')) {
          height = Math.max(Math.min(parseInt(arg.split('=')[1]), 768), 256);
          return false;
        } else if (arg.startsWith('steps=')) {
          steps = Math.min(parseInt(arg.split('=')[1]), 60);
          return false;
        } else if (arg.startsWith('seed=')) {
          seed = Math.max(Math.min(parseInt(arg.split('=')[1]), 9999999999), 0);
          return false;
        } else if (arg.startsWith('negative_prompt=')) {
          negative_prompt = arg.split('=')[1];
          return false;
        }
        return true;
      });

    const prompt = args.join(' ');

    const url = `${process.env.STABLE_DIFFUSION_URL}`;
    const payload = {
      init_images: [`data:${attachment.contentType};base64,${buffer.toString('base64')}`],
      prompt: prompt,
      width: width,
      height: height,
      seed: seed,
      negative_prompt: negative_prompt,
      steps: steps,
    };

    const apiResponse = await fetch(`${url}/sdapi/v1/img2img`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseData = await apiResponse.json();
    const base64Image = responseData.images[0].split(",",1)[0];
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const imageName = `./images/i2iresult.png`;

    await fs.promises.writeFile(imageName, imageBuffer);

    message.reply({ content: `"${prompt}"`, files: ['./images/i2iresult.png'] });
  },
};
