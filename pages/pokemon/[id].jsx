import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import {createPokemon, deletePokemon, getPokemonBy, getPokemons, updatePokemon} from '@services/pokemon-api';
import {toastSuccess} from '@services/toast-adapter';
import {Container, Layout} from '@components/layout';
import {PokemonImage} from '@components/pokemon';
import {Input} from '@components/ui';

function PokemonPage({pokemon}) {
  const {name, no} = pokemon;
  const [form, setForm] = useState({});
  const [currentPokemon, setCurrentPokemon] = useState(pokemon);
  const router = useRouter();

  const update = async () => {
    const res = await updatePokemon(pokemon._id, form);
    if (res === null) return;
    toastSuccess('Saved');
    setCurrentPokemon(res);
  };

  const create = async () => {
    const res = await createPokemon(form);
    if (res === null) return;
    toastSuccess('Created');
    router.push(`/pokemon/${res._id}`);
  };

  const handleSave = async e => {
    e.preventDefault();
    pokemon._id ? await update() : await create();
  };

  const handleChange = (key, value) => {
    setForm(current => ({
      ...current,
      [key]: value,
    }));
  };

  const handleDelete = async () => {
    const res = await deletePokemon(pokemon._id);
    if (res === null) return;
    router.push('/');
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
            {pokemon._id ? (
              <span>
                {currentPokemon?.name} <small>{currentPokemon?.no}</small>
              </span>
            ) : (
              <span>Create pokemon</span>
            )}
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
              <div className='flex gap-4 justify-end'>
                <button
                  type='submit'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                  Save
                </button>
                {pokemon._id && (
                  <button
                    type='button'
                    onClick={handleDelete}
                    className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                    Delete
                  </button>
                )}
              </div>
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
