// Returns general pokemon data
const sendRequest = require('./send-request');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function getPokemon(name) {
  return sendRequest.sendRequest(`${BASE_URL}/${name.toLowerCase()}/`); // Name needs to be spelled out correctly
}

module.exports = {
  getPokemon
}