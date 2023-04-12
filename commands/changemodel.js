// commands/changemodel.js
const { MessageActionRow, MessageButton } = require('discord.js');

let fetch;
(async () => {
  const module = await import("node-fetch");
  fetch = module.default;
})();

const models = {
  "AV3": "anything-v3-fp16-pruned.safetensors [d1facd9a2b]",
  "ANYTHING V3": "anything-v3-fp16-pruned.safetensors [d1facd9a2b]",
  "SDV1.5": "v1-5-pruned-emaonly.safetensors [6ce0161689]",
  "STABLE DIFFUSION V1.5": "v1-5-pruned-emaonly.safetensors [6ce0161689]",
  "OJ": "mdjrny-v4.ckpt [5d5ad06cc2]",
  "OPEN JOURNEY": "mdjrny-v4.ckpt [5d5ad06cc2]",
  "ID": "Inkpunk-Diffusion-v2.ckpt [2182245415]",
  "INKPUNK DIFFUSION": "Inkpunk-Diffusion-v2.ckpt [2182245415]",
  "SDV2": "v2-1_512-ema-pruned.ckpt [88ecb78256]",
  "STABLE DIFFUSION V2": "v2-1_512-ema-pruned.ckpt [88ecb78256]",
};

module.exports = {
  name: 'changemodel',
  description: 'Change the loaded model for image generation',
  usage: 'X/changemodel <model name or shorthand>',
  shorthand: 'cm',
  longDescriptionInfo: 'The changemodel command allows you to change models out from Stable Diffusion to serve different styles. Here are the available models to switch to:\n\n Anything V3 (AV3) No Keyword \n Stable Diffusion V1.5 (SDV1.5) No Keyword \n Open Journey (OJ) Keyword : mdjrny-v4 style \n Inkpunk Diffusion (ID) Keyword : nvinkpunk \n Stable Diffusion V2 (SDV2) No Keyword \n\n Keywords are something you put into your prompt to get the style from that model',
  queueTag: 'MEDIA',
  async execute(message, args) {
    if (args.length === 0) {
      return message.reply('You need to specify a model or shorthand');
    }

    const input = args.join(' ').toUpperCase();
    const model = models[input];

    if (!model) {
      return message.reply('Invalid model or shorthand. Please use a valid one.');
    }

    const url = `${process.env.STABLE_DIFFUSION_URL}`;
    const payload = {
      sd_model_checkpoint: model,
    };

    const reply = await message.reply(`Loading Model ${input}...`);

    await fetch(`${url}/sdapi/v1/options`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    await reply.edit(`Model Switched to ${input}`);
  },
};
