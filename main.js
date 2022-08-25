require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const pokemonAPI = require('./utils/pokemon-api');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Set the js files as commands for the client
// Uses the file path to point to the command
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => console.log(`Logged in as ${client.user.tag}!`));

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error with executing this command!', ephemeral: true })
  }
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!ps ')) return;

  let commands = message.content.replace('!ps ', '');
  commands = commands.split(' ');

  const pokemonName = commands[0];

  try {
    // Currently responds with an error if the pokemon might have a different form like Deoxys and Giratina
    const pokemon = await pokemonAPI.getPokemon(pokemonName);
    console.log(pokemon);
    message.channel.send(pokemon.sprites.front_default);
  } catch (error) {
    console.error(error);
    message.reply(`${pokemonName} is not a valid pokemon name`);
  }
});

require('./server');
client.login(process.env.LOGIN_TOKEN); // Has to be the last line in the file