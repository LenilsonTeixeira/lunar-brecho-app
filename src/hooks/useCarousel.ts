import { useRef, useState, useEffect, useCallback } from "react";

export const useCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Função modificada para ser mais robusta
  const checkScrollLimits = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Usa um valor ligeiramente maior para isAtStart para evitar inconsistências com o hover
    // O problema é que o hover pode fazer com que o cálculo seja muito sensível
    const isAtStart = scrollLeft <= 15; // Aumentei o limite para maior tolerância
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 15;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right", scrollAmount: number) => {
      if (!scrollRef.current) return;
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Verificamos os limites após a animação terminar
      setTimeout(checkScrollLimits, 300);
    },
    [checkScrollLimits]
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Importante: em vez de usar IntersectionObserver para o primeiro item,
    // que é sensível ao hover, usamos um timer para verificar regularmente
    // durante a navegação
    const initialCheckTimer = setTimeout(checkScrollLimits, 100);
    
    // Verificação adicional após as imagens carregarem
    const loadCheckTimer = setTimeout(checkScrollLimits, 1000);
    
    // Lida com o evento de scroll com debounce para melhor desempenho
    let scrollTimer: number | null = null;
    
    const handleScroll = () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(checkScrollLimits, 50) as unknown as number;
    };
    
    // Lida com o evento de redimensionamento
    let resizeTimer: number | null = null;
    
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(checkScrollLimits, 100) as unknown as number;
    };

    // Adiciona ouvintes de eventos
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Verificamos especificamente após eventos de mouse que podem causar o problema
    container.addEventListener("mouseleave", checkScrollLimits);
    
    return () => {
      clearTimeout(initialCheckTimer);
      clearTimeout(loadCheckTimer);
      if (scrollTimer) window.clearTimeout(scrollTimer);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseleave", checkScrollLimits);
    };
  }, [checkScrollLimits]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    checkScrollLimits,
  };
};