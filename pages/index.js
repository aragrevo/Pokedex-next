import {useState} from 'react';
import {Container, Layout} from '@components/layout';
import {Pagination, SearchInput} from '@components/ui';
import {PokemonCard} from '@components/pokemon';
import {API_LIMIT, getPokemonBy, getPokemons} from '@services/pokemon-api';

// TODO: get from db
const TOTAL_POKEMONS = 650;

function Home({pokemons, pages}) {
  const [pokemonList, setPokemonList] = useState(pokemons);
  const [pokemonSearch, setPokemonSearch] = useState(pokemons);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);

  const onChangePage = async p => {
    const offset = (p - 1) * API_LIMIT;
    const resp = await getPokemons(offset);
    setPage(p);
    setPokemonList(resp);
    setPokemonSearch(resp);
  };

  const handleSearch = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const query = data.get('default-search').trim().toLowerCase();
    if (!query) {
      setSearched(false);
      setPokemonSearch(pokemonList);
      return;
    }
    let found = pokemonList.filter(pokemon => pokemon.name === query);
    if (found.length === 0) {
      const pokemon = await getPokemonBy(query);
      found = [pokemon];
    }
    setSearched(true);
    setPokemonSearch(found);
  };

  return (
    <Layout>
      <Container>
        <section className='overflow-hidden '>
          <h1 className='text-6xl text-center mb-8'>Pokedex App</h1>
          <SearchInput onSearch={handleSearch} />
          <div className='grid grid-cols-12 gap-2 sm:gap-4'>
            {pokemonSearch.map(({name, _id, no}) => (
              <PokemonCard key={_id} name={name} id={_id} no={no} />
            ))}
          </div>
          {!searched && <Pagination page={page} pages={pages} onChangePage={e => onChangePage(e)} />}
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
