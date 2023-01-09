import {toast} from 'react-toastify';
const API_URL = 'https://pokedex-nest-production.up.railway.app/api/v2/pokemon';
export const API_LIMIT = 54;

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export async function getPokemons(offset) {
  try {
    const res = await fetch(`${API_URL}?limit=${API_LIMIT}${offset > 0 ? '&offset=' + offset : ''}`);
    const pokemons = await res.json();
    return pokemons;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPokemonBy(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const pokemon = await res.json();
    return pokemon;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePokemon(id, data) {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const res = await fetch(`${API_URL}/${id}`, requestOptions);
    const response = await res.json();
    if (!!response.statusCode && response.statusCode !== 200) throw response.message;
    return response;
  } catch (error) {
    toast.error(`${error}`);
    console.log(error);
    return null;
  }
}
