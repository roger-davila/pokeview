const stringy = require('../utils/stringy');
const { EmbedBuilder } = require('discord.js');

function embedBuilder(pokemon) {
  const pokemonEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(stringy.properCase(pokemon.name))
    .setDescription('Description of the pokemon here')
    .setImage(pokemon.sprites.front)
  return pokemonEmbed;
}

module.exports = {
  embedBuilder
}