import Image from 'next/image';
import Link from 'next/link';

export function PokemonCard({name, id, no}) {
  return (
    <article className='col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-2 relative mt-4 sm:mt-5'>
      <Link href={`/pokemon/${id}`} data-mdb-ripple='true' data-mdb-ripple-color='light' className='group'>
        <div className='rounded-lg shadow-lg bg-white'>
          <Image
            width={192}
            height={192}
            priority
            alt={name}
            className='-z-0 aspect-square absolute right-1 bottom-0 sm:-top-8 w-24 sm:w-36 group-hover:opacity-100 group-hover:scale-110 sm:group-hover:scale-[1.20] transition-all opacity-90'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${no}.svg`}
          />
          <div className='p-4 sm:pt-28 z-10'>
            <h2 className='text-gray-900 z-10 text-xl font-medium uppercase'>{name}</h2>
          </div>
        </div>
      </Link>
    </article>
  );
}
