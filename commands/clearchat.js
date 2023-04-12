// clearchat.js
const fs = require('fs');

module.exports = {
  name: 'clearchat',
  description: 'Clear the chat history and set a new system prompt',
  usage: 'X/clearchat [<new system prompt>]',
  shorthand: 'cc',
  longDescriptionInfo: 'The clearchat command will clear the chatlog of the chatbot so that its memory is wiped clean. You can add a custom starting system prompt with this command to change its personality or who it is or how it can act.',
  queueTag: 'CHAT',
  execute(message, args) {
    const serverID = message.guild.id;
    const conversationFile = `./serverChats/${serverID}.json`;
    const serverSettingsFile = `./serverSettings/${serverID}.json`;

    const modelRegex = /model:(GPT|PYG)/i;
    const modelMatch = args.join(' ').match(modelRegex);

    if (modelMatch) {
      args = args.join(' ').replace(modelRegex, '').trim().split(' ');
    }

    const newSystemPrompt = args.length > 0 ? args.join(' ') : 'You are a helpful assistant who responds succinctly';
    const newModel = modelMatch ? modelMatch[1].toUpperCase() : 'GPT';

    const serverSettings = { systemPrompt: newSystemPrompt, 
                             model: newModel };

    fs.writeFileSync(serverSettingsFile, JSON.stringify(serverSettings));

    fs.writeFileSync(conversationFile, JSON.stringify([]));
    message.reply(`Chat history cleared, system prompt and model updated. \n\n**Model** : ${newModel} \n**System Prompt** : ${newSystemPrompt}`);
  },
};
