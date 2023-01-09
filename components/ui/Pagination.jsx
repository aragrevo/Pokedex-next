import {useState} from 'react';
export function Pagination({page, pages, onChangePage}) {
  const [currentPage, setCurrentPage] = useState(page);

  const handlePagination = async p => {
    setCurrentPage(p);
    onChangePage(p);
  };
  return (
    <nav
      className='flex flex-wrap items-center justify-center mt-8 shadow-md hover:shadow-lg focus:shadow-lg'
      role='toolbar'>
      {pages.map(p => (
        <button
          onClick={() => handlePagination(p)}
          key={p}
          type='button'
          className={`${
            p === currentPage ? 'bg-blue-800' : 'bg-blue-600'
          } first:rounded-l last:rounded-r inline-block px-3 md:px-5 py-2.5  text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out`}>
          {p}
        </button>
      ))}
    </nav>
  );
}
