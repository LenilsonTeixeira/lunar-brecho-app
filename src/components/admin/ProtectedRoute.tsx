import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useFeatureFlagsContext } from '@/contexts/FeatureFlagsContext';

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
    // Para sub-rotas, verifica a rota pai
    for (const [route, flag] of Object.entries(routeToFlagMap)) {
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
