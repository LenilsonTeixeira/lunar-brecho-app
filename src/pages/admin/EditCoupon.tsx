import { useState, useEffect } from 'react';
import { ArrowLeft, Tag, Percent, Calendar, Users, DollarSign } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Coupon, CouponType } from '../../types/coupon';

const EditCoupon = () => {
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

  const [coupon] = useState<Coupon>(mockCoupon);
  const [formData, setFormData] = useState({
    code: mockCoupon.code,
    type: mockCoupon.type,
    value: mockCoupon.value,
    minOrderValue: mockCoupon.minOrderValue || 0,
    startDate: mockCoupon.startDate.toISOString().split('T')[0],
    expirationDate: mockCoupon.expirationDate.toISOString().split('T')[0],
    maxUsage: mockCoupon.maxUsage,
    maxUsagePerUser: mockCoupon.maxUsagePerUser || 1,
    isActive: mockCoupon.isActive,
  });

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados do cupom pelo couponId
    console.log('Carregando cupom:', couponId);
  }, [couponId]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!formData.code.trim()) {
      alert('Por favor, preencha o código do cupom.');
      return;
    }

    if (formData.value <= 0) {
      alert('Por favor, defina um valor válido para o desconto.');
      return;
    }

    if (formData.maxUsage <= 0) {
      alert('Por favor, defina um uso máximo válido.');
      return;
    }

    // Simular atualização do cupom
    const updatedCoupon = {
      ...coupon,
      ...formData,
      updatedAt: new Date(),
    };

    console.log('Cupom atualizado:', updatedCoupon);
    alert('Cupom atualizado com sucesso!');

    // Navegar de volta para a lista de cupons
    navigate('/admin/cupons');
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
            Editar Cupom #{coupon.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações do cupom abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='coupon-code'>
                  Código do Cupom *
                </label>
                <input
                  id='coupon-code'
                  type='text'
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                  placeholder='Ex: BLACK10'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='coupon-type'>
                  Tipo de Desconto *
                </label>
                <select
                  id='coupon-type'
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as CouponType)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='PERCENTAGE'>Percentual (%)</option>
                  <option value='FIXED'>Valor Fixo (R$)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Valor e Limites */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Percent className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Valor e Limites</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='coupon-value'>
                  Valor do Desconto *
                </label>
                <div className='relative'>
                  {formData.type === 'PERCENTAGE' && (
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm sm:text-base'>
                      %
                    </span>
                  )}
                  {formData.type === 'FIXED' && (
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm sm:text-base'>
                      R$
                    </span>
                  )}
                  <input
                    id='coupon-value'
                    type='number'
                    min='0'
                    step={formData.type === 'PERCENTAGE' ? '1' : '0.01'}
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                    className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full ${
                      formData.type === 'PERCENTAGE' ? 'pl-8' : 'pl-10'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='min-order-value'>
                  Valor Mínimo do Pedido
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm sm:text-base'>
                    R$
                  </span>
                  <input
                    id='min-order-value'
                    type='number'
                    min='0'
                    step='0.01'
                    value={formData.minOrderValue}
                    onChange={(e) =>
                      handleInputChange('minOrderValue', parseFloat(e.target.value) || 0)
                    }
                    placeholder='0,00'
                    className='outline-none py-2 sm:py-3 pl-10 pr-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Calendar className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Período de Validade</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='start-date'>
                  Data de Início *
                </label>
                <input
                  id='start-date'
                  type='date'
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='expiration-date'>
                  Data de Expiração *
                </label>
                <input
                  id='expiration-date'
                  type='date'
                  value={formData.expirationDate}
                  onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Limites de Uso */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Users className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Limites de Uso</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='max-usage'>
                  Uso Máximo Total *
                </label>
                <input
                  id='max-usage'
                  type='number'
                  min='1'
                  value={formData.maxUsage}
                  onChange={(e) => handleInputChange('maxUsage', parseInt(e.target.value) || 1)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
                <span className='text-xs text-slate-500'>Usos atuais: {coupon.currentUsage}</span>
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm font-semibold text-slate-700'
                  htmlFor='max-usage-per-user'
                >
                  Uso Máximo por Usuário
                </label>
                <input
                  id='max-usage-per-user'
                  type='number'
                  min='1'
                  value={formData.maxUsagePerUser}
                  onChange={(e) =>
                    handleInputChange('maxUsagePerUser', parseInt(e.target.value) || 1)
                  }
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <DollarSign className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status</h3>
            </div>

            <div className='flex items-center gap-3'>
              <input
                id='coupon-active'
                type='checkbox'
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className='w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500'
              />
              <label htmlFor='coupon-active' className='text-sm font-semibold text-slate-700'>
                Cupom Ativo
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Cupom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoupon;
