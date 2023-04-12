const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'ping',
  description: 'Ping command to check latency and other information.',
  shorthand: 'p',
  usage: 'X/ping',
  longDescriptionInfo: 'The ping command gives info about the bot as well as some of the APIs it uses, very basic and mostly used for foundational verifying.',
  async execute(message) {
    const msg = await message.channel.send('Pinging...');
    const latency = msg.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);

    const openAIRequests = 5;
    let totalTime = 0;

    for (let i = 0; i < openAIRequests; i++) {
      const start = Date.now();
      try {
        await axios.get('https://api.openai.com/');
      } catch (error) {
        // Ignore error and continue
      }
      totalTime += Date.now() - start;
    }

    const openAIAvgPing = Math.round(totalTime / openAIRequests);

    const embed = new EmbedBuilder()
      .setColor('#7289DA')
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Latency', value: `${latency}ms` },
        { name: 'API Latency', value: `${apiLatency}ms` },
        { name: 'OpenAI API', value: `${openAIAvgPing}ms` },
      )
      .setThumbnail(message.client.user.displayAvatarURL())
      .setFooter({
        text: `Command called by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      })

    msg.edit({ content: '', embeds: [embed] });
  },
};