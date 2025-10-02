import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * Hook para polling de produtos
 * - Faz polling APENAS na rota Home ("/")
 * - Para o polling quando o usuário troca de rota
 */
export const useProductPolling = (
  refreshProducts: () => Promise<void>,
  intervalMs: number = 60000, // 60 segundos por padrão
) => {
  const location = useLocation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHomeRoute = location.pathname === '/';

  useEffect(() => {
    // Só ativa polling se estiver na rota Home
    if (!isHomeRoute) {
      // Limpa polling se sair da Home
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Inicia o polling
    intervalRef.current = setInterval(() => {
      refreshProducts();
    }, intervalMs);

    // Cleanup quando desmontar ou trocar de rota
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHomeRoute, refreshProducts, intervalMs]);
};
