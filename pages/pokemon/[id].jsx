import {useState} from 'react';
import Link from 'next/link';

import {getPokemonBy, getPokemons, updatePokemon} from '@services/pokemon-api';
import {toastSuccess} from '@services/toast-adapter';
import {Container, Layout} from '@components/layout';
import {PokemonImage} from '@components/pokemon';
import {Input} from '@components/ui';

function PokemonPage({pokemon}) {
  const [form, setForm] = useState({});
  const [currentPokemon, setCurrentPokemon] = useState();
  const {name, no} = pokemon;

  const handleSave = async e => {
    e.preventDefault();
    const res = await updatePokemon(pokemon._id, form);
    if (res === null) return;
    toastSuccess('Saved');
    setCurrentPokemon(res);
  };

  const handleChange = (key, value) => {
    if (!currentPokemon) setCurrentPokemon(pokemon);
    setForm(current => ({
      ...current,
      [key]: value,
    }));
  };

  const pokemonNumber = form.no ?? no;
  const pokemonName = form.name ?? name;

  return (
    <Layout>
      <Container>
        <Link
          className='inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-gray-200 focus:text-blue-700 focus:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-200 active:text-blue-800 transition duration-300 ease-in-out'
          href='/'>
          Back
        </Link>
        <section className='overflow-hidden '>
          <h1 className='text-6xl text-center mb-8 capitalize'>
            {currentPokemon?.name || name} <small>{currentPokemon?.no || no}</small>
          </h1>
          <div className='max-w-3xl p-8 mx-auto'>
            <div className='grid grid-cols-4 grid-rows-2 gap-4 h-auto'>
              <div className='p-0 rounded-full shadow-lg bg-white'>
                <PokemonImage name={name} file={`${pokemonNumber}.png`} />
              </div>
              <div className='p-0 rounded-full shadow-lg bg-white'>
                <PokemonImage name={name} file={`shiny/${pokemonNumber}.png`} />
              </div>
              <div className='col-span-2 row-span-2 rounded-full bg-slate-100 backdrop-blur-xl drop-shadow-xl'>
                <div className='translate-x-[8%]'>
                  <PokemonImage name={name} file={`other/dream-world/${pokemonNumber}.svg`} />
                </div>
              </div>
              <div className='p-0 rounded-full shadow-lg bg-white'>
                <PokemonImage name={name} file={`back/${pokemonNumber}.png`} />
              </div>
              <div className='p-0 rounded-full shadow-lg bg-white'>
                <PokemonImage name={name} file={`back/shiny/${pokemonNumber}.png`} />
              </div>
            </div>
            <form className='mt-8' onSubmit={handleSave}>
              <div className='flex gap-4'>
                <Input label='No' value={pokemonNumber} onChange={e => handleChange('no', e.target.value)} />
                <Input label='Name' value={pokemonName} onChange={e => handleChange('name', e.target.value)} />
              </div>
              <button
                type='submit'
                className='text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                Save
              </button>
            </form>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const pokemons = await getPokemons(0);

  const paths = pokemons.map(pokemon => ({
    params: {id: pokemon._id},
  }));

  return {paths, fallback: 'blocking'};
}

export async function getStaticProps(ctx) {
  const pokemon = await getPokemonBy(ctx.params.id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 60,
  };
}

export default PokemonPage;
