const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Get Pokemon Sprite')
    .addStringOption((option) => 
      option.setName('pokemon')
      .setDescription('Pokemon Name')
    ),
  async execute(interaction) {
    console.log('Command was run.');
  },
};
