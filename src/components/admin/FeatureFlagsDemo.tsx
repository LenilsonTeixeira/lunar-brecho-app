import { useFeatureFlagsContext } from '@/contexts/FeatureFlagsContext';

// Mapeamento de tradução para as feature flags
const FEATURE_FLAGS_TRANSLATIONS: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'Produtos',
  categories: 'Categorias',
  consignors: 'Consignantes',
  suppliers: 'Fornecedores',
  customers: 'Clientes',
  orders: 'Pedidos',
  coupons: 'Cupons',
  accountsReceivable: 'Contas a Receber',
  accountsPayable: 'Contas a Pagar',
  cashFlow: 'Fluxo de Caixa',
  profitSimulation: 'Simulação de Lucro',
  users: 'Usuários',
  notifications: 'Notificações',
  configurations: 'Configurações',
};

const FeatureFlagsDemo = () => {
  const { featureFlags, updateFeatureFlag, resetFeatureFlags, isFeatureEnabled } =
    useFeatureFlagsContext();

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Sistema de Feature Flags</h2>

      <div className='mb-6'>
        <p className='text-gray-600 mb-4'>
          Este componente demonstra o sistema de feature flags implementado. Apenas as rotas de{' '}
          <strong>Produtos</strong> e <strong>Categorias</strong> estão habilitadas por padrão. O{' '}
          <strong>Dashboard</strong> está desabilitado por padrão.
        </p>

        <div className='flex gap-2 mb-4'>
          <button
            onClick={resetFeatureFlags}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            Resetar para Padrão
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Object.entries(featureFlags).map(([key, value]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border-2 transition-all ${
              value ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className='flex items-center justify-between mb-2'>
              <h3 className='font-semibold text-gray-800'>
                {FEATURE_FLAGS_TRANSLATIONS[key] || key}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {value ? 'Habilitado' : 'Desabilitado'}
              </span>
            </div>

            <button
              onClick={() => updateFeatureFlag(key as keyof typeof featureFlags, !value)}
              className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                value
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {value ? 'Desabilitar' : 'Habilitar'}
            </button>
          </div>
        ))}
      </div>

      <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-semibold text-blue-800 mb-2'>Status das Rotas:</h3>
        <div className='space-y-1 text-sm'>
          <div className='flex justify-between'>
            <span>Dashboard:</span>
            <span className={isFeatureEnabled('dashboard') ? 'text-green-600' : 'text-red-600'}>
              {isFeatureEnabled('dashboard') ? 'Acessível' : 'Bloqueado'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>Produtos:</span>
            <span className={isFeatureEnabled('products') ? 'text-green-600' : 'text-red-600'}>
              {isFeatureEnabled('products') ? 'Acessível' : 'Bloqueado'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>Categorias:</span>
            <span className={isFeatureEnabled('categories') ? 'text-green-600' : 'text-red-600'}>
              {isFeatureEnabled('categories') ? 'Acessível' : 'Bloqueado'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>Clientes:</span>
            <span className={isFeatureEnabled('customers') ? 'text-green-600' : 'text-red-600'}>
              {isFeatureEnabled('customers') ? 'Acessível' : 'Bloqueado'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagsDemo;
