import PokemonPage from './pokemon/[id]';

function NewPage() {
  const pokemon = {
    name: '',
    no: null,
  };
  return <PokemonPage pokemon={pokemon} />;
}

export default NewPage;
