const pokemonAPI = require('../utils/pokemon-api');
const { SlashCommandBuilder } = require('discord.js');
const pokemonEmbed = require('../embeds/pokemon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Get Pokemon Sprite')
    .addStringOption((option) =>
      option.setName('pokemon')
        .setDescription('Pokemon Name')
    ),
  async execute(interaction) {
    console.log(interaction);
    console.log(interaction.channelId);
    const pokemonName = interaction.options.getString('pokemon');
    console.log(pokemonName);
    const pokemon = await pokemonAPI.getPokemon(pokemonName);
    await interaction.reply({ embeds: [pokemonEmbed.embedBuilder(parsePokemonData(pokemon))] });
  },
};

function parsePokemonData(pokemon) {
  const newPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    stats: (() => pokemon.stats.reduce((obj, stat) => (obj[stat.stat.name] = stat.base_stat, obj), {}))(),
    types: (() => pokemon.types.reduce((obj, type) => (obj[type.slot] = type.type.name, obj), {}))(),
    sprites: {front: pokemon.sprites.front_default, frontShiny: pokemon.sprites.front_shiny}
  }
  console.log(newPokemon);
  return newPokemon;
}