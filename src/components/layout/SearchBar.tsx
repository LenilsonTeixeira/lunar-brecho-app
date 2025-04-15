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
    <form onSubmit={handleSearch} className='w-full mt-8 flex justify-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          type='text'
          className='flex-1 outline-none bg-inherit text-sm'
          placeholder='O que você procura hoje?'
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <button type='submit'>
          <Search className='w-5 h-5 text-gray-500' />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
