import { useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCarousel } from "../../hooks/useCarousel";

const categories = [
  {
    name: "Body",
    image: "https://acdn-us.mitiendanube.com/stores/004/414/596/products/86c1af187bed52a509db2649e0144039-424f199920b186aca517177081243046-1024-1024.webp",
  },
  {
    name: "Calças",
    image: "https://acdn-us.mitiendanube.com/stores/004/414/596/products/imagem-whatsapp-2025-01-27-as-17-05-21_981ec453-811c39988cd9bd47c317380867063164-1024-1024.webp",
  },
  {
    name: "Blusas",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/340598723/img_2977-24c9s0rovs.jpeg",
  },
  {
    name: "Macaquinhos",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/338746166/img_1715-zdjy3qfnl6.jpeg",
  },
  {
    name: "Vestidos",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/335928056/3d0ae793-6d64-4785-9eea-7638f716b531-rc61dwiw7t.jpeg",
  },
  {
    name: "Jeans",
    image: "https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp",
  },
  {
    name: "Chinelos",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/246582579/f7c2f065-cd4d-4eb4-bb35-284c857de334-oxj4tjwkcp.jpeg",
  },
  {
    name: "Croppeds",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/210614200/whatsapp-image-2023-03-30-at-15-23-39-rhjycw.jpg",
  },
  {
    name: "Conjuntos",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/338700026/img_1646-vnkljmtjrp.jpeg",
  },
  {
    name: "Macacão",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/299448951/71601444-a299-4587-ad99-bf170e7f9760-9ikj2wsrqb.jpeg",
  },
  {
    name: "Shorts",
    image: "https://cdn.awsli.com.br/1538/1538522/produto/217419654/whatsapp-image-2023-05-17-at-13-40-07-65w1r2wpb9.jpeg",
  },
];

type CategoryCarouselProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

export default function CategoryCarousel({
  selectedCategory,
  onSelectCategory,
}: CategoryCarouselProps) {
  const firstItemRef = useRef<HTMLDivElement>(null);
  const { scrollRef, canScrollLeft, canScrollRight, scroll, checkScrollLimits } = useCarousel();

  const getScrollAmount = useCallback(() => {
    if (!firstItemRef.current) return 100;
    const itemWidth = firstItemRef.current.offsetWidth;
    const gap = 16;
    return itemWidth + gap;
  }, []);

  return (
    <div className="w-full flex items-center justify-between gap-2 mb-5 mt-3">
      <button
        className="md:block hidden z-10 bg-white shadow-md rounded-full p-1 transition hover:scale-110 disabled:opacity-30"
        onClick={() => scroll("left", getScrollAmount())}
        disabled={!canScrollLeft}
        aria-label="Rolar para a esquerda"
      >
        <ChevronLeft className="w-6 h-6 text-gray-500" />
      </button>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide no-scrollbar px-4 md:px-10 py-2 scroll-smooth snap-x snap-mandatory"
        tabIndex={0}
        role="list"
        aria-label="Categorias de produtos"
        onScroll={() => requestAnimationFrame(checkScrollLimits)}
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            ref={index === 0 ? firstItemRef : undefined}
            whileHover={{ scale: 1.08 }}
            className="flex flex-col items-center cursor-pointer flex-shrink-0 snap-start w-24"
            onClick={() =>{
              onSelectCategory(
                selectedCategory === category.name ? null : category.name
              )
            }

            }
            role="listitem"
            aria-selected={selectedCategory === category.name}
          >
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border shadow-md shadow-slate-600 transition-all ${
                selectedCategory === category.name
                  ? "border-sky-500 border-2"
                  : "border-gray-300"
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span
              className={`text-sm mt-1 text-center ${
                selectedCategory === category.name
                  ? "text-sky-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              {category.name}
            </span>
          </motion.div>
        ))}
      </div>

      <button
        className="md:block hidden z-10 bg-white shadow-md rounded-full p-1 transition hover:scale-110 disabled:opacity-30"
        onClick={() => scroll("right", getScrollAmount())}
        disabled={!canScrollRight}
        aria-label="Rolar para a direita"
      >
        <ChevronRight className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
}
