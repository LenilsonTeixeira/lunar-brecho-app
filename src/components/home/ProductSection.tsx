import { ProductResponse } from '../../services/types';
import Title from '../commom/Title';
import ProductItem from '../product/ProductItem';
import NoProductsFound from '../product/NoProductsFound';
import { useEffect, useRef, useCallback } from 'react';

type Props = {
  title: string;
  products: ProductResponse[];
  searchQuery?: string;
  selectedCategory?: string | null;
  loadMoreProducts?: () => Promise<void>;
  isLoadingMore?: boolean;
  hasMore?: boolean;
};

const ProductSection = ({
  products,
  title,
  searchQuery,
  selectedCategory,
  loadMoreProducts,
  isLoadingMore = false,
  hasMore = false,
}: Props) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Filtra apenas produtos com status ACTIVE
  const activeProducts = products.filter((product) => product.status === 'ACTIVE');

  // Callback para o último elemento da lista
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && loadMoreProducts) {
          loadMoreProducts();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoadingMore, hasMore, loadMoreProducts],
  );

  // Cleanup do observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (activeProducts.length === 0) {
    return <NoProductsFound searchQuery={searchQuery} selectedCategory={selectedCategory} />;
  }

  return (
    <section className='flex flex-col items-start w-full mt-6'>
      <Title name={title} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-3 sm:gap-4 mt-4'>
        {activeProducts.map((item, index) => (
          <div key={item.id} ref={index === activeProducts.length - 1 ? lastProductRef : null}>
            <ProductItem product={item} />
          </div>
        ))}
      </div>
      {isLoadingMore && (
        <div className='w-full flex justify-center py-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
