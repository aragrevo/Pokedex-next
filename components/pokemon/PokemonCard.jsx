import Image from 'next/image';

export function PokemonCard({name, id, no}) {
  return (
    <article className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 relative mt-6'>
      <a href='#!' data-mdb-ripple='true' data-mdb-ripple-color='light' className='group'>
        <div className='rounded-lg shadow-lg bg-white max-w-sm'>
          <Image
            width={192}
            height={192}
            priority={false}
            alt={name}
            className='-z-0 aspect-square absolute right-1 -top-8 w-40 group-hover:scale-125 transition-all'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${no}.svg`}
          />
          <div className='p-6 pt-28 z-10'>
            <h5 className='text-gray-900 z-10 text-xl font-medium uppercase'>{name}</h5>
          </div>
        </div>
      </a>
    </article>
  );
}
