import {useState} from 'react';
export function Pagination({pages, onChangePage}) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = async page => {
    setCurrentPage(page);
    onChangePage(page);
  };
  return (
    <nav
      className='flex flex-wrap items-center justify-center mt-8 shadow-md hover:shadow-lg focus:shadow-lg'
      role='toolbar'>
      {pages.map(page => (
        <button
          onClick={() => handlePagination(page)}
          key={page}
          type='button'
          className={`${
            page === currentPage ? 'bg-blue-800' : ''
          } first:rounded-l last:rounded-r inline-block px-3 md:px-5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out`}>
          {page}
        </button>
      ))}
    </nav>
  );
}
