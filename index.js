// index.js
const fs = require('fs');
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const dotenv = require('dotenv');
const commandHandler = require('./commandHandler');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
  client.user.setPresence({
    activities: [{ name: `${process.env.PREFIX}about`, type: ActivityType.Playing }],
    status: 'online',
  });
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
  commandHandler(message, client);
});

client.login(process.env.DISCORD_TOKEN);
