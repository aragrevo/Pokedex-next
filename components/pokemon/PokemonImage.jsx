import {useEffect, useState} from 'react';
import Image from 'next/image';
import {IMAGE_FALLBACK, myLoader} from '@services/constants';

export function PokemonImage({name, file}) {
  const [src, setSrc] = useState(file);
  useEffect(() => {
    setSrc(file);
  }, [file]);

  return (
    <Image
      width={96}
      height={96}
      priority
      loader={myLoader}
      alt={name}
      className='max-w-full w-full h-auto aspect-square'
      src={src}
      onError={() => setSrc(`${IMAGE_FALLBACK}`)}
    />
  );
}
