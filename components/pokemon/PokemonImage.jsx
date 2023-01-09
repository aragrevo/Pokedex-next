import Image from 'next/image';

// TODO: fallback image
export function PokemonImage({name, file}) {
  return (
    <Image
      width={96}
      height={96}
      priority
      alt={name}
      className='max-w-full w-full h-auto aspect-square'
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${file}`}
    />
  );
}
