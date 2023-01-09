export const IMAGE_FALLBACK = '/404_Error.svg';

export const myLoader = ({src, width, quality}) => {
  return src === IMAGE_FALLBACK
    ? IMAGE_FALLBACK
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${src}?w=${width}&q=${quality || 75}`;
};
