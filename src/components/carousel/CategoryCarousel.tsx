import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCarousel } from '../../hooks/useCarousel';
import { useCategories } from '../../hooks/useCategories';

type CategoryCarouselProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

const CategoryCarousel = ({ selectedCategory, onSelectCategory }: CategoryCarouselProps) => {
  const firstItemRef = useRef<HTMLDivElement>(null);
  const { scrollRef, canScrollLeft, canScrollRight, scroll, checkScrollLimits } = useCarousel();
  const { categories, loading, error } = useCategories();

  const getScrollAmount = useCallback(() => {
    if (!firstItemRef.current) return 100;
    const itemWidth = firstItemRef.current.offsetWidth;
    const gap = 16;
    return itemWidth + gap;
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className='w-full flex items-center justify-center gap-2 mb-5 mt-3'>
        <div className='flex space-x-4 px-4 md:px-10 py-2'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className='flex flex-col items-center flex-shrink-0 w-24'>
              <div className='w-24 h-24 rounded-full bg-gray-200 animate-pulse'></div>
              <div className='w-16 h-4 bg-gray-200 rounded mt-1 animate-pulse'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='w-full flex items-center justify-center gap-2 mb-5 mt-3'>
        <div className='text-center py-4'>
          <p className='text-red-500 text-sm'>Erro ao carregar categorias: {error}</p>
        </div>
      </div>
    );
  }

  // Filter only active categories and sort by orderDisplay
  const activeCategories = categories
    .filter((category) => category.status === 'ACTIVE')
    .sort((a, b) => {
      // If both have orderDisplay, sort by it (lower number first)
      if (
        a.orderDisplay !== undefined &&
        a.orderDisplay !== null &&
        b.orderDisplay !== undefined &&
        b.orderDisplay !== null
      ) {
        return a.orderDisplay - b.orderDisplay;
      }
      // If only a has orderDisplay, it comes first
      if (a.orderDisplay !== undefined && a.orderDisplay !== null) {
        return -1;
      }
      // If only b has orderDisplay, it comes first
      if (b.orderDisplay !== undefined && b.orderDisplay !== null) {
        return 1;
      }
      // If neither has orderDisplay, maintain original order
      return 0;
    });

  return (
    <div className='w-full flex items-center justify-between gap-2 mb-5 mt-3'>
      <button
        className='hidden sm:block z-10 bg-white shadow-md rounded-full p-1 transition hover:scale-110 disabled:opacity-30'
        onClick={() => scroll('left', getScrollAmount())}
        disabled={!canScrollLeft}
        aria-label='Rolar para a esquerda'
      >
        <ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 text-gray-500' />
      </button>

      <div
        ref={scrollRef}
        className='flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide no-scrollbar px-2 sm:px-4 md:px-10 py-2 scroll-smooth snap-x snap-mandatory'
        tabIndex={0}
        role='list'
        aria-label='Categorias de produtos'
        onScroll={() => requestAnimationFrame(checkScrollLimits)}
      >
        {activeCategories.map((category, index) => (
          <motion.div
            key={category.id}
            ref={index === 0 ? firstItemRef : undefined}
            whileHover={{ scale: 1.08 }}
            className='flex flex-col items-center cursor-pointer flex-shrink-0 snap-start w-20 sm:w-24'
            onClick={() => {
              onSelectCategory(selectedCategory === category.name ? null : category.name);
            }}
            role='listitem'
            aria-selected={selectedCategory === category.name}
          >
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border shadow-md shadow-slate-600 transition-all ${
                selectedCategory === category.name ? 'border-sky-500 border-2' : 'border-gray-300'
              }`}
            >
              <img
                src={category.imageUrl || category.thumbnailUrl}
                alt={category.name}
                className='w-full h-full object-cover'
                loading='lazy'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://via.placeholder.com/96x96/8b5cf6/ffffff?text=' +
                    encodeURIComponent(category.name);
                }}
              />
            </div>
            <span
              className={`text-xs sm:text-sm mt-1 text-center ${
                selectedCategory === category.name ? 'text-sky-500 font-bold' : 'text-gray-700'
              }`}
            >
              {category.name}
            </span>
          </motion.div>
        ))}
      </div>

      <button
        className='hidden sm:block z-10 bg-white shadow-md rounded-full p-1 transition hover:scale-110 disabled:opacity-30'
        onClick={() => scroll('right', getScrollAmount())}
        disabled={!canScrollRight}
        aria-label='Rolar para a direita'
      >
        <ChevronRight className='w-5 h-5 sm:w-6 sm:h-6 text-gray-500' />
      </button>
    </div>
  );
};

export default CategoryCarousel;
