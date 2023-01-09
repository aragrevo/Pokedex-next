import {useState} from 'react';
import {Container, Layout} from '@components/layout';
import {Pagination} from '@components/ui';
import {PokemonCard} from '@components/pokemon';
import {API_LIMIT, getPokemons} from '@services/pokemon-api';

// TODO: get from db
const TOTAL_POKEMONS = 650;

function Home({pokemons, pages}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [visitedPages, setVisitedPages] = useState({});

  const onChangePage = async page => {
    const localData = visitedPages[page];
    if (localData) {
      setPokemonList(localData);
      return;
    }
    const offset = (page - 1) * API_LIMIT;
    const resp = await getPokemons(offset);
    setVisitedPages(current => ({
      ...current,
      [page]: resp,
    }));
    setPokemonList(resp);
  };

  const list = pokemonList.length > 0 ? pokemonList : pokemons;
  return (
    <Layout>
      <Container>
        <section className='overflow-hidden '>
          <h1 className='text-6xl text-center mb-8'>Pokedex App</h1>
          <div className='grid grid-cols-12 gap-2 sm:gap-4'>
            {list.map(({name, _id, no}) => (
              <PokemonCard key={_id} name={name} id={_id} no={no} />
            ))}
          </div>
          <Pagination pages={pages} onChangePage={e => onChangePage(e)} />
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
  };
}

export default Home;
