module.exports = {
    name: 'delete',
    description: 'Deletes a bot message.',
    usage: 'X/delete (reply to a bot message)',
    shorthand: 'd',
    longDescriptionInfo: 'The delete command will allow anyone to reply to a message created by this bot to delete it for if any NSFW content is generated and not wanted by users.',
    async execute(message) {
      if (!message.reference || !message.reference.messageId) {
        return message.reply('You need to reply to a bot message.');
      }
  
      try {
        const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
  
        if (repliedMessage.author.id === message.client.user.id) {
          await repliedMessage.delete();
          await message.reply("The bot's message has been deleted.");
        } else if (repliedMessage.author.id != message.client.user.id) {
            message.reply("You can't delete other user's messages or messages from other bots.");
        }
      } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command!");
      }
    },
  };