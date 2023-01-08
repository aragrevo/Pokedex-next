import {useState} from 'react';
import {Container, Layout, Pagination} from '@components/layout';
import {PokemonCard} from '@components/pokemon';
import {getPokemons} from 'services/pokemon';

// TODO: get from db
const TOTAL_POKEMONS = 650;
const LIMIT = 54;

function Home({pokemons, pages}) {
  const [pokemonList, setPokemonList] = useState([]);
  const [visitedPages, setVisitedPages] = useState({});

  const onChangePage = async page => {
    const localData = visitedPages[page];
    if (localData) {
      setPokemonList(localData);
      return;
    }
    const offset = (page - 1) * LIMIT;
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
  const res = await fetch(`https://pokedex-nest-production.up.railway.app/api/v2/pokemon?limit=${LIMIT}`);
  const pokemons = await res.json();

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
