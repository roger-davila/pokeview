const pokemonAPI = require('../utils/pokemon-api');
const { SlashCommandBuilder } = require('discord.js');
const pokemonEmbed = require('../embeds/pokemon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Get Pokemon information')
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('Pokemon Name')
        .setRequired(true))
    .addBooleanOption((option) =>
      option.setName('shiny')
        .setDescription('Show shiny sprite')
        .setRequired(true)),
  async execute(interaction) {
    console.log(interaction);
    console.log(interaction.channelId);
    const pokemonName = interaction.options.getString('name');
    const isShiny = interaction.options.getBoolean('shiny');
    console.log(pokemonName);
    console.log(isShiny);
    const pokemon = await pokemonAPI.getPokemon(pokemonName);
    await interaction.reply({ embeds: [pokemonEmbed.embedBuilder(parsePokemonData(pokemon), isShiny)] });
  },
};

function parsePokemonData(pokemon) {
  // Instantiate new pokemon object if it does not already exist in the system.
  const newPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    stats: (() => pokemon.stats.reduce((obj, stat) => (obj[stat.stat.name] = stat.base_stat, obj), {}))(),
    types: (() => pokemon.types.reduce((obj, type) => (obj[type.slot] = type.type.name, obj), {}))(),
    sprites: { front: pokemon.sprites.front_default, frontShiny: pokemon.sprites.front_shiny }
  }
  console.log(newPokemon);
  return newPokemon;
}