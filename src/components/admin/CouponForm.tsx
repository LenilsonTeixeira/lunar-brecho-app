import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Coupon, CreateCouponData, CouponType } from '../../types/coupon';

interface CouponFormProps {
  coupon?: Coupon;
  onSubmit: (data: CreateCouponData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CouponForm = ({ coupon, onSubmit, onCancel, isLoading = false }: CouponFormProps) => {
  const [formData, setFormData] = useState<CreateCouponData>({
    code: '',
    type: 'PERCENTAGE',
    value: 0,
    minOrderValue: undefined,
    startDate: new Date(),
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    maxUsage: 100,
    maxUsagePerUser: undefined,
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        minOrderValue: coupon.minOrderValue,
        startDate: new Date(coupon.startDate),
        expirationDate: new Date(coupon.expirationDate),
        maxUsage: coupon.maxUsage,
        maxUsagePerUser: coupon.maxUsagePerUser,
        isActive: coupon.isActive,
      });
    }
  }, [coupon]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Código é obrigatório';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Código deve ter pelo menos 3 caracteres';
    }

    if (formData.value <= 0) {
      newErrors.value = 'Valor deve ser maior que zero';
    }

    if (formData.type === 'PERCENTAGE' && formData.value > 100) {
      newErrors.value = 'Percentual não pode ser maior que 100%';
    }

    if (formData.minOrderValue !== undefined && formData.minOrderValue < 0) {
      newErrors.minOrderValue = 'Valor mínimo não pode ser negativo';
    }

    if (formData.startDate >= formData.expirationDate) {
      newErrors.expirationDate = 'Data de expiração deve ser posterior à data de início';
    }

    if (formData.maxUsage <= 0) {
      newErrors.maxUsage = 'Quantidade máxima deve ser maior que zero';
    }

    if (formData.maxUsagePerUser !== undefined && formData.maxUsagePerUser <= 0) {
      newErrors.maxUsagePerUser = 'Quantidade por usuário deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CreateCouponData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-800'>
              {coupon ? 'Editar Cupom' : 'Criar Novo Cupom'}
            </h2>
            <button
              onClick={onCancel}
              className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-slate-600' />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Código do Cupom */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>
              Código do Cupom *
            </label>
            <input
              type='text'
              value={formData.code}
              onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
              className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                errors.code
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
              }`}
              placeholder='Ex: BLACK10'
              disabled={!!coupon}
            />
            {errors.code && <p className='text-red-500 text-sm mt-1'>{errors.code}</p>}
          </div>

          {/* Tipo e Valor */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Tipo de Desconto *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as CouponType)}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300'
              >
                <option value='PERCENTAGE'>Percentual (%)</option>
                <option value='FIXED'>Valor Fixo (R$)</option>
              </select>
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Valor do Desconto *
              </label>
              <input
                type='number'
                value={formData.value}
                onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  errors.value
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
                }`}
                placeholder={formData.type === 'PERCENTAGE' ? '10' : '50.00'}
                step={formData.type === 'PERCENTAGE' ? '1' : '0.01'}
                min='0'
                max={formData.type === 'PERCENTAGE' ? '100' : undefined}
              />
              {errors.value && <p className='text-red-500 text-sm mt-1'>{errors.value}</p>}
            </div>
          </div>

          {/* Valor Mínimo */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>
              Valor Mínimo do Pedido (Opcional)
            </label>
            <input
              type='number'
              value={formData.minOrderValue || ''}
              onChange={(e) =>
                handleInputChange(
                  'minOrderValue',
                  e.target.value ? parseFloat(e.target.value) : undefined,
                )
              }
              className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                errors.minOrderValue
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
              }`}
              placeholder='Ex: 100.00'
              step='0.01'
              min='0'
            />
            {errors.minOrderValue && (
              <p className='text-red-500 text-sm mt-1'>{errors.minOrderValue}</p>
            )}
          </div>

          {/* Datas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Data de Início *
              </label>
              <input
                type='date'
                value={formatDateForInput(formData.startDate)}
                onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Data de Expiração *
              </label>
              <input
                type='date'
                value={formatDateForInput(formData.expirationDate)}
                onChange={(e) => handleInputChange('expirationDate', new Date(e.target.value))}
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  errors.expirationDate
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
                }`}
              />
              {errors.expirationDate && (
                <p className='text-red-500 text-sm mt-1'>{errors.expirationDate}</p>
              )}
            </div>
          </div>

          {/* Limites de Uso */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Quantidade Máxima de Uso *
              </label>
              <input
                type='number'
                value={formData.maxUsage}
                onChange={(e) => handleInputChange('maxUsage', parseInt(e.target.value) || 0)}
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  errors.maxUsage
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
                }`}
                placeholder='100'
                min='1'
              />
              {errors.maxUsage && <p className='text-red-500 text-sm mt-1'>{errors.maxUsage}</p>}
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Máximo por Usuário (Opcional)
              </label>
              <input
                type='number'
                value={formData.maxUsagePerUser || ''}
                onChange={(e) =>
                  handleInputChange(
                    'maxUsagePerUser',
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  errors.maxUsagePerUser
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
                }`}
                placeholder='1'
                min='1'
              />
              {errors.maxUsagePerUser && (
                <p className='text-red-500 text-sm mt-1'>{errors.maxUsagePerUser}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className='flex items-center space-x-3 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className='w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500'
              />
              <span className='text-sm font-semibold text-slate-700'>Cupom Ativo</span>
            </label>
          </div>

          {/* Botões */}
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <button
              type='button'
              onClick={onCancel}
              className='w-full sm:flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Salvando...' : coupon ? 'Atualizar Cupom' : 'Criar Cupom'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
