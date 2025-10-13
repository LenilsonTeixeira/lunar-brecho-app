import { Search } from 'lucide-react';

interface NoProductsFoundProps {
  searchQuery?: string;
  selectedCategory?: string | null;
}

const NoProductsFound = ({ searchQuery, selectedCategory }: NoProductsFoundProps) => {
  return (
    <div className='flex flex-col items-center justify-center w-full py-20 min-h-[50vh]'>
      <Search className='w-16 h-16 text-gray-400 mb-4' />
      <h3 className='text-xl font-medium text-gray-700 mb-2'>Nenhum produto encontrado</h3>
      <p className='text-gray-500 text-center'>
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
