import { ArrowLeft, Tag, Percent, Calendar, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Coupon } from '../../types/coupon';

const ViewCoupon = () => {
  const navigate = useNavigate();
  const { couponId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockCoupon: Coupon = {
    id: couponId || '1',
    code: 'BLACK10',
    type: 'PERCENTAGE',
    value: 10,
    minOrderValue: 50,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 100,
    maxUsagePerUser: 1,
    currentUsage: 25,
    isActive: true,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-03-20T14:45:00Z'),
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (isActive: boolean, expirationDate: Date) => {
    if (!isActive) return 'bg-red-300 text-slate-950';
    if (new Date() > expirationDate) return 'bg-orange-300 text-slate-950';
    return 'bg-green-300 text-slate-950';
  };

  const getStatusText = (isActive: boolean, expirationDate: Date) => {
    if (!isActive) return 'Inativo';
    if (new Date() > expirationDate) return 'Expirado';
    return 'Ativo';
  };

  const formatValue = (coupon: Coupon): string => {
    if (coupon.type === 'PERCENTAGE') {
      return `${coupon.value}%`;
    }
    return `R$ ${coupon.value.toFixed(2).replace('.', ',')}`;
  };

  const getUsagePercentage = (): number => {
    return Math.round((mockCoupon.currentUsage / mockCoupon.maxUsage) * 100);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/cupons')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Cupom #{mockCoupon.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do cupom</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Status do Cupom */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status do Cupom</h3>
            </div>
            <div className='flex items-center justify-between'>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(
                  mockCoupon.isActive,
                  mockCoupon.expirationDate,
                )}`}
              >
                {getStatusText(mockCoupon.isActive, mockCoupon.expirationDate)}
              </span>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Código do Cupom
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded text-sm'>
                    {mockCoupon.code}
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Tipo de Desconto
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      mockCoupon.type === 'PERCENTAGE'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {mockCoupon.type === 'PERCENTAGE' ? 'Percentual (%)' : 'Valor Fixo (R$)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Valor e Limites */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Percent className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Valor e Limites</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Valor do Desconto
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='font-semibold text-slate-800'>{formatValue(mockCoupon)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Valor Mínimo do Pedido
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {mockCoupon.minOrderValue
                      ? `R$ ${mockCoupon.minOrderValue.toFixed(2).replace('.', ',')}`
                      : 'Sem valor mínimo'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Período de Validade */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Calendar className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Período de Validade</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Início
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockCoupon.startDate)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Expiração
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockCoupon.expirationDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Limites de Uso */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Users className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Limites de Uso</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Uso Máximo Total
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between'>
                    <span className='text-slate-800'>{mockCoupon.maxUsage}</span>
                    <span className='text-xs text-slate-500'>
                      {mockCoupon.currentUsage} usos atuais
                    </span>
                  </div>
                  <div className='mt-2 w-full bg-slate-200 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full ${getUsageColor(getUsagePercentage())} bg-current`}
                      style={{ width: `${getUsagePercentage()}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs ${getUsageColor(getUsagePercentage())}`}>
                    {getUsagePercentage()}% utilizado
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Uso Máximo por Usuário
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {mockCoupon.maxUsagePerUser || 'Ilimitado'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Criação
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockCoupon.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockCoupon.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/cupons')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/cupons/editar/${mockCoupon.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Cupom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCoupon;
