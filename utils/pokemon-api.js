// Returns general pokemon data
import { sendRequest } from './send-request';
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export function getPokemon(name) {
  return sendRequest(`${BASE_URL}/${name.toLowerCase()}/`); // Name needs to be spelled out correctly
}


