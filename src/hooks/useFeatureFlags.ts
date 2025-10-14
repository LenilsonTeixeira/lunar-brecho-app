import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';

// Definição das feature flags disponíveis
export interface FeatureFlags {
  // Visão Geral
  dashboard: boolean;

  // Gestão de Estoque
  products: boolean;
  categories: boolean;

  // Parceiros
  consignors: boolean;
  suppliers: boolean;

  // Vendas & Marketing
  customers: boolean;
  orders: boolean;
  coupons: boolean;

  // Financeiro
  accountsReceivable: boolean;
  accountsPayable: boolean;
  cashFlow: boolean;
  profitSimulation: boolean;

  // Sistema
  users: boolean;
  notifications: boolean;
  configurations: boolean;
}

// Configuração padrão das feature flags
const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  // Visão Geral - Dashboard desabilitado
  dashboard: false,

  // Produtos, categorias, clientes e pedidos habilitados por padrão
  products: true,
  categories: true,
  customers: true,
  orders: true,

  // Demais features desabilitadas
  consignors: false,
  suppliers: false,
  coupons: false,
  accountsReceivable: false,
  accountsPayable: false,
  cashFlow: false,
  profitSimulation: false,
  users: false,
  notifications: false,
  configurations: false,
};

// Usar a constante centralizada para a chave do localStorage

export const useFeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(DEFAULT_FEATURE_FLAGS);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega as feature flags do localStorage na inicialização
  useEffect(() => {
    try {
      const storedFlags = localStorage.getItem(STORAGE_KEYS.FEATURE_FLAGS);
      if (storedFlags) {
        const parsedFlags = JSON.parse(storedFlags);
        setFeatureFlags({ ...DEFAULT_FEATURE_FLAGS, ...parsedFlags });
      }
    } catch (error) {
      console.warn('Erro ao carregar feature flags do localStorage:', error);
      setFeatureFlags(DEFAULT_FEATURE_FLAGS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salva as feature flags no localStorage sempre que mudarem
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEYS.FEATURE_FLAGS, JSON.stringify(featureFlags));
      } catch (error) {
        console.warn('Erro ao salvar feature flags no localStorage:', error);
      }
    }
  }, [featureFlags, isLoading]);

  // Função para atualizar uma feature flag específica
  const updateFeatureFlag = (flagName: keyof FeatureFlags, value: boolean) => {
    setFeatureFlags((prev) => ({
      ...prev,
      [flagName]: value,
    }));
  };

  // Função para atualizar múltiplas feature flags
  const updateFeatureFlags = (flags: Partial<FeatureFlags>) => {
    setFeatureFlags((prev) => ({
      ...prev,
      ...flags,
    }));
  };

  // Função para resetar todas as feature flags para o padrão
  const resetFeatureFlags = () => {
    setFeatureFlags(DEFAULT_FEATURE_FLAGS);
  };

  // Função para verificar se uma feature flag está habilitada
  const isFeatureEnabled = (flagName: keyof FeatureFlags): boolean => {
    return featureFlags[flagName];
  };

  // Função para verificar se múltiplas feature flags estão habilitadas
  const areFeaturesEnabled = (flagNames: (keyof FeatureFlags)[]): boolean => {
    return flagNames.every((flagName) => featureFlags[flagName]);
  };

  return {
    featureFlags,
    isLoading,
    updateFeatureFlag,
    updateFeatureFlags,
    resetFeatureFlags,
    isFeatureEnabled,
    areFeaturesEnabled,
  };
};

// Hook para verificar se uma rota específica está habilitada
export const useRouteAccess = () => {
  const { isFeatureEnabled } = useFeatureFlags();

  const isRouteEnabled = (path: string): boolean => {
    // Mapeamento de rotas para feature flags
    const routeToFlagMap: Record<string, keyof FeatureFlags> = {
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

    // Verifica se a rota está mapeada e se a feature flag está habilitada
    const flagName = routeToFlagMap[path];
    if (flagName) {
      return isFeatureEnabled(flagName);
    }

    // Para sub-rotas, verifica a rota pai
    for (const [route, flag] of Object.entries(routeToFlagMap)) {
      if (path.startsWith(route) && path !== route) {
        return isFeatureEnabled(flag);
      }
    }

    // Se não encontrou mapeamento, assume que está desabilitado
    return false;
  };

  return { isRouteEnabled };
};
