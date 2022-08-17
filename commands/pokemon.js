const pokemonAPI =  require('../utils/pokemon-api');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Get Pokemon Sprite'),
  async execute(interaction) {
    const pokemon = await pokemonAPI.getPokemon(interaction.commandName);
    await interaction.reply(pokemon);
  },
};
