import {toastError} from './toast-adapter';

const API_URL = 'https://pokedex-nest-production.up.railway.app/api/v2/pokemon';
export const API_LIMIT = 54;

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const handleRequest = async (url, options, resp) => {
  try {
    const res = await fetch(url, options);
    const response = await res.json();
    if (!!response.statusCode && response.statusCode !== 200) throw response.message;
    return response;
  } catch (error) {
    toastError(error);
    console.log(error);
    return resp;
  }
};

export async function getPokemons(offset) {
  const url = `${API_URL}?limit=${API_LIMIT}${offset > 0 ? '&offset=' + offset : ''}`;
  const res = await handleRequest(url, undefined, []);
  return res;
}

export async function getPokemonBy(id) {
  const res = await handleRequest(`${API_URL}/${id}`, undefined, null);
  return res;
}

export async function updatePokemon(id, data) {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = await handleRequest(`${API_URL}/${id}`, requestOptions, null);
  return res;
}

export async function deletePokemon(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  const res = await handleRequest(`${API_URL}/${id}`, requestOptions, null);
  return res;
}

export async function createPokemon(data) {
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const res = await handleRequest(`${API_URL}`, requestOptions, null);
  return res;
}
