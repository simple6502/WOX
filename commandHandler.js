const queueManager = require('./queueManager');

module.exports = (message, client) => {
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.find(
    (cmd) => cmd.name === commandName || cmd.shorthand === commandName
  );

  if (!command) return;

  if (command.queueTag) {
    queueManager.addToQueue(command.queueTag, command.execute, message, args);
  } else {
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  }
};
