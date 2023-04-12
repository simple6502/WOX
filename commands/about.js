// commands/about.js
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'about',
  description: 'Displays information about the bot',
  usage: 'X/about',
  shorthand: 'ab',
  longDescriptionInfo: 'The about command gives generalized info about the bot, yeah, thats it!',
  async execute(message) {
    const mainSettings = JSON.parse(fs.readFileSync('./mainSettings.json', 'utf8'));

    const file = new AttachmentBuilder('./mainImage.png');
    const embed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle(mainSettings.title)
      .setImage('attachment://mainImage.png')
      .addFields(
        {
          name: 'Say hello to WOX!',
          value: mainSettings.about || 'No about information provided',
        },
        {
          name: 'To Begin',
          value: mainSettings.toBegin || 'No to begin information provided',
        },
        {
          name: 'GitHub Link',
          value: mainSettings.github || 'No github information provided',
        }
      )
      .setFooter({
        text: `Command called by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      });

    message.channel.send({ embeds: [embed], files: [file] });
  },
};
