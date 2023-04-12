const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
require('dotenv').config();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));

async function getAIResponse(userMessage, serverID) {
  const serverSettingsFile = `./serverSettings/${serverID}.json`;
  const conversationFile = `./serverChats/${serverID}.json`;

  if (!fs.existsSync(serverSettingsFile)) {
    const defaultSettings = { systemPrompt: 'You are a helpful assistant who responds succinctly', model: 'GPT' };
    fs.writeFileSync(serverSettingsFile, JSON.stringify(defaultSettings));
  }

  const serverSettings = JSON.parse(fs.readFileSync(serverSettingsFile));
  const systemPrompt = serverSettings.systemPrompt;

  let conversation;
  if (!fs.existsSync(conversationFile) || fs.readFileSync(conversationFile, 'utf8') === '[]') {
    conversation = [{ role: 'system', content: `${systemPrompt} (Anything you see in brackets is describing an image that has been given as a text input. Act like you can see it, don't say it is a description at all, pretend to the user)` }];
    fs.writeFileSync(conversationFile, JSON.stringify(conversation));
  } else {
    conversation = JSON.parse(fs.readFileSync(conversationFile));
  }

  conversation.push({ role: 'user', content: userMessage });

  // Check if the conversation has more than 40 messages and delete messages to get to 40 messages in length
  if (conversation.length > 36) {
    const systemMessage = conversation.shift(); // Remove and store the system message temporarily
    conversation.splice(0, conversation.length - 35); // Remove messages beyond the 40th message
    conversation.unshift(systemMessage); // Add the system message back to the beginning of the conversation
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversation,
    });

    const aiResponse = response.data.choices[0].message.content;
    conversation.push({ role: 'assistant', content: aiResponse });
    fs.writeFileSync(conversationFile, JSON.stringify(conversation));

    return aiResponse;
  } catch (error) {
    console.error(error);
    return 'As an AI robot, I errored out.';
  }
}

module.exports = {
  getAIResponse,
};
