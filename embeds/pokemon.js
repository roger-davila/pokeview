const stringy = require('../utils/stringy');
const { EmbedBuilder } = require('discord.js');

function embedBuilder(pokemon, isShiny) {
  const pokemonEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(stringy.properCase(pokemon.name))
    .setDescription('Description of the pokemon here')
    .setImage(isShiny ? pokemon.sprites.frontShiny : pokemon.sprites.front)
    .setFields([...Object.entries(pokemon.stats)].map((stat) => ({ name: stat[0], value: stat[1].toString(), inline: true })))
  return pokemonEmbed;
}

module.exports = {
  embedBuilder
}