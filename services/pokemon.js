export async function getPokemons(offset) {
  try {
    const res = await fetch(
      `https://pokedex-nest-production.up.railway.app/api/v2/pokemon?limit=54${offset > 0 ? '&offset=' + offset : ''}`,
    );
    const pokemons = await res.json();
    return pokemons;
  } catch (error) {
    console.log(error);
    return [];
  }
}
