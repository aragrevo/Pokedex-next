import {Container, Layout} from '@components/layout';
import {PokemonCard} from '@components/pokemon';

function Home({pokemons}) {
  return (
    <Layout>
      <Container>
        <section className='overflow-hidden '>
          <h1 className='text-6xl text-center'>Pokedex App</h1>
          <div className='grid grid-cols-12 sm:gap-4'>
            {pokemons.map(({name, _id, no}) => (
              <PokemonCard key={_id} name={name} id={_id} no={no} />
            ))}
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://pokedex-nest-production.up.railway.app/api/v2/pokemon?limit=50');
  const pokemons = await res.json();

  return {
    props: {
      pokemons,
    },
  };
}

export default Home;
