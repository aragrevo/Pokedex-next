import {useEffect, useState} from 'react';

import {API_LIMIT, getPokemons} from '@services/pokemon-api';
import {Pagination} from '@components/ui';
import {PokemonCard} from './PokemonCard';

export function PokemonGrid({list, pages, viewPagination, setList}) {
  const [pokemonSearch, setPokemonSearch] = useState(list);
  const [show, setShow] = useState(viewPagination);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPokemonSearch(list);
    setShow(viewPagination);
  }, [viewPagination, list]);

  const onChangePage = async p => {
    const offset = (p - 1) * API_LIMIT;
    const resp = await getPokemons(offset);
    setPage(p);
    setPokemonSearch(resp);
    setList(resp);
  };

  return (
    <>
      <div className='grid grid-cols-12 gap-2 sm:gap-4'>
        {pokemonSearch.map(({name, _id, no}) => (
          <PokemonCard key={_id} name={name} id={_id} no={no} />
        ))}
      </div>
      {!show && <Pagination page={page} pages={pages} onChangePage={e => onChangePage(e)} />}
    </>
  );
}
