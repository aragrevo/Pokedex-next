import {getPokemonBy} from '@services/pokemon-api';

export function SearchInput({list, onSearch}) {
  const handleSearch = async e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const query = data.get('default-search').trim().toLowerCase();
    if (!query) {
      onSearch(false, list);
      return;
    }
    let found = list.filter(pokemon => pokemon.name === query);
    if (found.length === 0) {
      const pokemon = await getPokemonBy(query);
      if (pokemon) found = [pokemon];
    }
    onSearch(true, found);
  };

  return (
    <form noValidate className='col-span-full sm:col-span-4' onSubmit={handleSearch}>
      <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          name='default-search'
          className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none'
          placeholder='Search Pokemon'
          required
        />
        <button
          type='submit'
          className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'>
          Search
        </button>
      </div>
    </form>
  );
}
