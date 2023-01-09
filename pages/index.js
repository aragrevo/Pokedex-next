import {useState} from 'react';
import Link from 'next/link';
import {Container, Layout} from '@components/layout';
import {SearchInput} from '@components/ui';
import {PokemonGrid} from '@components/pokemon';
import {getPokemons} from '@services/pokemon-api';

// TODO: get from db
const TOTAL_POKEMONS = 216;

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
          <div className='grid grid-cols-6 gap-4 mb-8'>
            <SearchInput list={pokemonFound} onSearch={handleSearch} />
            <Link
              type='button'
              href='/new'
              className='sm:col-start-6 col-span-full sm:col-span-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center '>
              New
            </Link>
          </div>
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
