import { useState, useEffect } from 'react';
import { Save, Eye, EyeOff, Globe, Bell } from 'lucide-react';

const Configuration = () => {
  const [configurations, setConfigurations] = useState({
    showBanner: true,
    bannerText: '🎉 Promoção especial! Frete grátis em compras acima de R$ 50',
    bannerColor: '#8b5cf6',
    siteName: 'Lunar Brechó',
    siteDescription: 'Seu brechó online de confiança',
    contactEmail: 'contato@lunarbrecho.com',
    contactPhone: '(34) 99999-9999',
    deliveryFee: 10.0,
    notifications: {
      newOrders: true,
      lowStock: true,
      salesReports: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('systemConfig');
    if (savedConfig) {
      setConfigurations(JSON.parse(savedConfig));
    }
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setConfigurations((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (notification: string, value: boolean) => {
    setConfigurations((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [notification]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('saving');

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Salvar no localStorage
      localStorage.setItem('systemConfig', JSON.stringify(configurations));
      localStorage.setItem('showBanner', JSON.stringify(configurations.showBanner));

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Configurações</h1>
          <p className='text-sm sm:text-base text-slate-600'>Gerencie as configurações da loja</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-8'>
          {/* Banner Configuration */}
          <div className='border-b border-slate-200 pb-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                <Bell className='w-5 h-5 text-purple-600' />
              </div>
              <h2 className='text-lg sm:text-xl font-semibold text-slate-800'>
                Configurações do Banner
              </h2>
            </div>

            <div className='space-y-4'>
              {/* Banner Toggle */}
              <div className='flex items-center justify-between p-4 bg-slate-50 rounded-lg'>
                <div className='flex items-center gap-3'>
                  {configurations.showBanner ? (
                    <Eye className='w-5 h-5 text-green-600' />
                  ) : (
                    <EyeOff className='w-5 h-5 text-slate-400' />
                  )}
                  <div>
                    <p className='font-medium text-slate-800'>Exibir Banner</p>
                    <p className='text-sm text-slate-600'>
                      Mostrar banner promocional na página inicial
                    </p>
                  </div>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={configurations.showBanner}
                    onChange={(e) => handleInputChange('showBanner', e.target.checked)}
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Banner Text */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Texto do Banner</label>
                <input
                  type='text'
                  value={configurations.bannerText}
                  onChange={(e) => handleInputChange('bannerText', e.target.value)}
                  placeholder='Digite o texto do banner'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Banner Color */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Cor do Banner</label>
                <div className='flex items-center gap-4'>
                  <input
                    type='color'
                    value={configurations.bannerColor}
                    onChange={(e) => handleInputChange('bannerColor', e.target.value)}
                    className='w-16 h-12 rounded-lg border border-slate-200 cursor-pointer'
                  />
                  <span className='text-xs text-slate-500'>Escolha a cor de fundo do banner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Site Configuration */}
          <div className='border-b border-slate-200 pb-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                <Globe className='w-5 h-5 text-blue-600' />
              </div>
              <h2 className='text-lg sm:text-xl font-semibold text-slate-800'>
                Configurações do Site
              </h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Nome do Site</label>
                <input
                  type='text'
                  value={configurations.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  placeholder='Nome do site'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Descrição do Site</label>
                <input
                  type='text'
                  value={configurations.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  placeholder='Descrição do site'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Email de Contato</label>
                <input
                  type='email'
                  value={configurations.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder='contato@exemplo.com'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Telefone de Contato</label>
                <input
                  type='tel'
                  value={configurations.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder='(00) 00000-0000'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700'>Taxa de Entrega (R$)</label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm'>
                    R$
                  </span>
                  <input
                    type='number'
                    step='0.01'
                    min='0'
                    value={configurations.deliveryFee}
                    onChange={(e) =>
                      handleInputChange('deliveryFee', parseFloat(e.target.value) || 0)
                    }
                    placeholder='0.00'
                    className='outline-none py-2 sm:py-3 pl-10 pr-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full'
                  />
                </div>
                <p className='text-xs text-slate-500'>
                  Valor padrão da taxa de entrega para pedidos
                </p>
              </div>
            </div>
          </div>

          {/* Notifications Configuration */}
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                <Bell className='w-5 h-5 text-green-600' />
              </div>
              <h2 className='text-lg sm:text-xl font-semibold text-slate-800'>Notificações</h2>
            </div>

            <div className='space-y-3'>
              {Object.entries(configurations.notifications).map(([key, value]) => (
                <div
                  key={key}
                  className='flex items-center justify-between p-4 bg-slate-50 rounded-lg'
                >
                  <div>
                    <p className='font-medium text-slate-800'>
                      {key === 'newOrders' && 'Novos Pedidos'}
                      {key === 'lowStock' && 'Estoque Baixo'}
                      {key === 'salesReports' && 'Relatórios de Vendas'}
                    </p>
                    <p className='text-sm text-slate-600'>
                      {key === 'newOrders' && 'Receber notificações quando houver novos pedidos'}
                      {key === 'lowStock' && 'Alertar quando produtos estiverem com estoque baixo'}
                      {key === 'salesReports' && 'Enviar relatórios de vendas por email'}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={value}
                      onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className='pt-6 border-t border-slate-200'>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className='w-4 h-4' />
                  Salvar Configurações
                </>
              )}
            </button>

            {/* Status Messages */}
            {saveStatus === 'success' && (
              <div className='mt-3 p-3 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-sm text-green-700 font-medium'>
                  ✓ Configurações salvas com sucesso!
                </p>
              </div>
            )}

            {saveStatus === 'error' && (
              <div className='mt-3 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-sm text-red-700 font-medium'>
                  ✗ Erro ao salvar configurações. Tente novamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
