const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Help pages for commands',
  usage: 'X/help [<page #>] [<command>]',
  longDescriptionInfo: 'The help command provides info about commands in a general sense with X/help or with the same command with the command you need help with like: X/help ping and it will provided more detailed information about that command. ',
  shorthand: 'h',
  execute(message, args) {
    const { commands } = message.client;

    // Check if a specific command is provided as an argument
    if (args[0] && commands.has(args[0])) {
      const command = commands.get(args[0]);
      const embed = new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle(`Command: ${command.name}`)
        .setThumbnail(message.client.user.displayAvatarURL())
        .setFooter({
          text: `Command called by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .addFields(
          {
            name: 'Description',
            value: command.description || 'No description provided',
          },
          {
            name: 'Usage',
            value: command.usage || 'No usage provided',
          },
          {
            name: 'Shorthand',
            value: command.shorthand || 'No shorthand provided',
          },
          {
            name: 'Long Description',
            value: command.longDescriptionInfo || 'No long description provided',
          }
        );

      return message.channel.send({ embeds: [embed] });
    }

    const pageNumber = parseInt(args[0]) || 1;
    const itemsPerPage = 5;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (startIndex >= commands.size) {
      return message.reply('There are no commands to display on this page.');
    }

    const embed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle('Bot Commands')
      .setThumbnail(message.client.user.displayAvatarURL())
      .setFooter({
        text: `Command called by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      });

    const fields = [];

    const commandsToDisplay = Array.from(commands.values()).slice(startIndex, endIndex);

    for (const [index, command] of commandsToDisplay.entries()) {
      fields.push({
        name: command.name,
        value: `Description: ${command.description || 'No description provided'}\nUsage: ${command.usage || 'No usage provided'}\nShorthand: ${command.shorthand || 'No shorthand provided'}`,
        inline: index < 1,
      });
    }

    embed.addFields(...fields);
    message.channel.send({ embeds: [embed] });
  },
};
