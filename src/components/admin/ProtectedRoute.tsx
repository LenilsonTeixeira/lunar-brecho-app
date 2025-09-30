import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useFeatureFlagsContext } from '@/contexts/FeatureFlagsContext';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackPath?: string;
}

const ProtectedRoute = ({
  children,
  fallbackPath = '/admin/feature-flags',
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isFeatureEnabled } = useFeatureFlagsContext();
  const { isAuthenticated, isLoading } = useAuth();

  // Se ainda está carregando, mostra loading
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to='/admin/login' replace />;
  }

  // Mapeamento de rotas para feature flags
  const routeToFlagMap: Record<string, keyof import('@/hooks/useFeatureFlags').FeatureFlags> = {
    '/admin': 'dashboard',
    '/admin/produtos': 'products',
    '/admin/categorias': 'categories',
    '/admin/consignantes': 'consignors',
    '/admin/fornecedores': 'suppliers',
    '/admin/clientes': 'customers',
    '/admin/pedidos': 'orders',
    '/admin/cupons': 'coupons',
    '/admin/contas-receber': 'accountsReceivable',
    '/admin/contas-pagar': 'accountsPayable',
    '/admin/fluxo-caixa': 'cashFlow',
    '/admin/simulacao-lucro': 'profitSimulation',
    '/admin/usuarios': 'users',
    '/admin/notificacoes': 'notifications',
    '/admin/configuracoes': 'configurations',
  };

  // Verifica se a rota atual está habilitada
  const flagName = routeToFlagMap[location.pathname];
  let isEnabled = false;

  if (flagName) {
    isEnabled = isFeatureEnabled(flagName);
  } else {
    // Para sub-rotas, verifica a rota pai mais específica
    // Ordena as rotas por comprimento (mais específicas primeiro)
    const sortedRoutes = Object.entries(routeToFlagMap).sort(([a], [b]) => b.length - a.length);

    for (const [route, flag] of sortedRoutes) {
      if (location.pathname.startsWith(route) && location.pathname !== route) {
        isEnabled = isFeatureEnabled(flag);
        break;
      }
    }
  }

  if (!isEnabled) {
    // Redireciona para o fallback (feature-flags por padrão)
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
