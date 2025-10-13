import { Search } from 'lucide-react';

interface NoProductsFoundProps {
  searchQuery?: string;
  selectedCategory?: string | null;
}

const NoProductsFound = ({ searchQuery, selectedCategory }: NoProductsFoundProps) => {
  return (
    <div className='flex flex-col items-center justify-center w-full py-12 sm:py-20 min-h-[40vh] px-4'>
      <Search className='w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4' />
      <h3 className='text-lg sm:text-xl font-medium text-gray-700 mb-2 text-center'>
        Nenhum produto encontrado
      </h3>
      <p className='text-sm sm:text-base text-gray-500 text-center max-w-md'>
        {searchQuery
          ? `Não encontramos produtos com o termo "${searchQuery}"`
          : selectedCategory
            ? `Não encontramos produtos na categoria "${selectedCategory}"`
            : 'Não encontramos produtos disponíveis no momento'}
      </p>
    </div>
  );
};

export default NoProductsFound;
