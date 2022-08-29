const stringy = require('../utils/stringy');
const { EmbedBuilder } = require('discord.js');

const BLOCK_UNIT = 32; // Divide stats by this to represent stat value as blocks.

// Stat emoji and format lookup
const emojiMap = new Map ();
emojiMap.set('hp', ['HP', ':heart:']);
emojiMap.set('attack', ['Attack', ':boom:']);
emojiMap.set('defense', ['Defense', ':shield:']);
emojiMap.set('special-attack', ['Sp. Atk', ':zap:']);
emojiMap.set('special-defense', ['Sp. Def', ':mirror:']);
emojiMap.set('speed', ['Speed', ':dash:']);

function embedBuilder(pokemon, isShiny) {
  const pokemonEmbed = new EmbedBuilder()
    .setColor(0xFF001A)
    .setTitle(stringy.properCase(pokemon.name))
    .setImage(isShiny ? pokemon.sprites.frontShiny : pokemon.sprites.front)
    .setFields({ 
      name: 'Base Stats :books:',
      value: Object.entries(pokemon.stats).reduce((template, stat) => template += `${emojiMap.get(stat[0])[1]} **${emojiMap.get(stat[0])[0]}:** ${stat[1]}\n ${':green_square: '.repeat(Math.ceil(stat[1]/BLOCK_UNIT)) + ':black_large_square: '.repeat(8 - Math.ceil(stat[1]/BLOCK_UNIT))}\n\n`, ``), 
      inline: true 
    })
    .setFooter({text: `Base stat values range from 1 - 255`});
  return pokemonEmbed;
}

module.exports = {
  embedBuilder
}
