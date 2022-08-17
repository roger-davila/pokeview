import * as pokemonAPI from '../utils/pokemon-api';
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Get Pokemon Sprite'),
  async execute(interaction) {
    await interaction.reply('Fetching Pokemon');
  },
};
