// commands/image2text.js
const fs = require('fs');
const { MessageAttachment } = require('discord.js');

let fetch;
(async () => {
  const module = await import("node-fetch");
  fetch = module.default;
})();

module.exports = {
  name: 'image2text',
  description: 'Caption an image using BLIP image captioning',
  usage: 'X/image2text <image>',
  shorthand: 'i2t',
  longDescriptionInfo: 'The image2text command allows the user to submit an image and have the BLIP image captioning AI caption the image and send back that caption.',
  queueTag: 'CHAT',
  async execute(message) {
    const attachment = message.attachments.first();
    if (!attachment) {
      return message.reply('Please attach an image to caption');
    }

    const response = await fetch(attachment.url);
    const buffer = await response.arrayBuffer();
    await fs.promises.writeFile('./images/i2timage.png', Buffer.from(buffer));

    const base64Image = Buffer.from(buffer).toString('base64');
    const apiResponse = await fetch(`${process.env.BLIP_URL}/api/caption`, {
      method: 'POST',
      body: JSON.stringify({ image: base64Image }),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseData = await apiResponse.json();
    const caption = responseData.caption;

    message.reply(caption);
  },
};
