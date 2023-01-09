import {useState} from 'react';
import {Container, Layout} from '@components/layout';
import {SearchInput} from '@components/ui';
import {PokemonGrid} from '@components/pokemon';
import {getPokemons} from '@services/pokemon-api';

// TODO: get from db
const TOTAL_POKEMONS = 650;

function Home({pokemons, pages}) {
  const [pokemonList, setPokemonList] = useState(pokemons);
  const [pokemonFound, setPokemonFound] = useState(pokemons);

  const [searched, setSearched] = useState(false);

  const handleSearch = (success, list) => {
    setSearched(success);
    setPokemonFound(list);
    if (!success) setPokemonFound(pokemonList);
  };

  return (
    <Layout>
      <Container>
        <section className='overflow-hidden '>
          <h1 className='text-6xl text-center mb-8'>Pokedex App</h1>
          <SearchInput list={pokemonFound} onSearch={handleSearch} />
          <PokemonGrid list={pokemonFound} pages={pages} viewPagination={searched} setList={setPokemonList} />
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const pokemons = await getPokemons(0);
  const qty = Math.ceil(TOTAL_POKEMONS / pokemons.length);
  const pages = Array.from(Array(qty).keys()).map((_, i) => i + 1);

  return {
    props: {
      pokemons,
      pages,
    },
    revalidate: 60,
  };
}

export default Home;
