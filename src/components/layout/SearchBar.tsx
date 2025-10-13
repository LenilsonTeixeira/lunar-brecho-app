import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

const SearchBar = ({ onSearch, searchQuery }: SearchBarProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  return (
    <form onSubmit={handleSearch} className='w-full flex justify-center px-4 sm:px-6'>
      <div className='inline-flex items-center justify-center border border-gray-300 hover:border-gray-400 focus-within:border-sky-500 px-4 py-3 my-4 rounded-full w-full max-w-md sm:max-w-lg transition-colors duration-200 bg-white shadow-sm'>
        <input
          type='text'
          className='flex-1 outline-none bg-transparent text-sm placeholder:text-gray-500 text-gray-900'
          placeholder='O que você procura hoje?'
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <button
          type='submit'
          className='ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200'
          aria-label='Buscar produtos'
        >
          <Search className='w-5 h-5 text-gray-500 hover:text-sky-500 transition-colors duration-200' />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
