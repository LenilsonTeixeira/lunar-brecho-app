import { ProductResponse } from '../../services/types';
import Title from '../commom/Title';
import ProductItem from '../product/ProductItem';
import NoProductsFound from '../product/NoProductsFound';

type Props = {
  title: string;
  products: ProductResponse[];
  searchQuery?: string;
  selectedCategory?: string | null;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalElements?: number;
  loadPage?: (page: number) => Promise<void>;
};

const ProductSection = ({
  products,
  title,
  searchQuery,
  selectedCategory,
  isLoading = false,
  currentPage = 0,
  totalPages = 0,
  totalElements = 0,
  loadPage,
}: Props) => {
  // Filtra apenas produtos com status ACTIVE
  const activeProducts = products.filter((product) => product.status === 'ACTIVE');

  // Função para navegar para uma página específica
  const handlePageChange = (page: number) => {
    if (loadPage && page >= 0 && page < totalPages) {
      loadPage(page);
    }
  };

  if (activeProducts.length === 0) {
    return <NoProductsFound searchQuery={searchQuery} selectedCategory={selectedCategory} />;
  }

  return (
    <section className='flex flex-col items-start w-full mt-6'>
      <Title name={title} />

      {/* Loading indicator */}
      {isLoading && (
        <div className='w-full flex justify-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      )}

      {/* Products grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-3 sm:gap-4 mt-4'>
        {activeProducts.map((item) => (
          <div key={item.id}>
            <ProductItem product={item} />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className='w-full flex justify-center items-center gap-2 mt-6'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0 || isLoading}
            className='px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
          >
            Anterior
          </button>

          <span className='px-3 py-1 text-sm'>
            Página {currentPage + 1} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1 || isLoading}
            className='px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
          >
            Próxima
          </button>
        </div>
      )}

      {/* Total products info */}
      {totalElements > 0 && (
        <div className='w-full text-center text-sm text-gray-600 mt-2'>
          Mostrando {activeProducts.length} de {totalElements} produtos
        </div>
      )}
    </section>
  );
};

export default ProductSection;
