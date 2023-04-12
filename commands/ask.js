// commands/ask.js
const { MessageAttachment } = require('discord.js');
const fs = require('fs');
const pyg = require('../pyg.js');
const gpt = require('../gpt.js');

let fetch;
(async () => {
  const module = await import("node-fetch");
  fetch = module.default;
})();

module.exports = {
  name: 'ask',
  description: 'Ask a question to the AI assistant',
  usage: 'X/ask <text> [image]',
  queueTag: 'CHAT',
  shorthand: 'a',
  longDescriptionInfo: 'The ask command allows the user to interact with an active chatbot for the given server such as ChatGPT or Pygmailion (Not intergrated yet). You can submit an image along with text so that the LLM (Large Language Model) has a more interactive feel to it.',
  async execute(message, args) {
    if (args.length === 0) {
      return message.reply('You need to include text');
    }

    const serverID = message.guild.id;
    const serverSettingsFile = `./serverSettings/${serverID}.json`;

    if (!fs.existsSync(serverSettingsFile)) {
      const defaultSettings = { systemPrompt: 'You are a helpful assistant who responds succinctly', model: 'GPT' };
      fs.writeFileSync(serverSettingsFile, JSON.stringify(defaultSettings));
    }

    const serverSettings = JSON.parse(fs.readFileSync(serverSettingsFile));

    let caption = '';
    const attachment = message.attachments.first();
    if (attachment) {
      const response = await fetch(attachment.url);
      const buffer = await response.arrayBuffer();
      await fs.promises.writeFile('./images/inputChatImage.png', Buffer.from(buffer));

      const base64Image = Buffer.from(buffer).toString('base64');
      const apiResponse = await fetch(`${process.env.BLIP_URL}/api/caption`, {
        method: 'POST',
        body: JSON.stringify({ image: base64Image }),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await apiResponse.json();
      caption = responseData.caption;
    }

    const userMessage = args.join(' ');
    const modifiedUserMessage = caption ? `${message.author.username}:(${caption}) ${userMessage}` : `${message.author.username}:${userMessage}`;
    const aiResponse = serverSettings.model === 'GPT' ? await gpt.getAIResponse(modifiedUserMessage, serverID) : 'PYG is not supported currently! Switch back to GPT';

    message.reply(aiResponse);
  },
};
