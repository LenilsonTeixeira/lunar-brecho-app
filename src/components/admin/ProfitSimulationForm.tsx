import { useState } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { ProfitSimulationData, ProductType } from '../../types/profit';

interface ProfitSimulationFormProps {
  onSubmit: (data: ProfitSimulationData) => void;
  isLoading?: boolean;
}

interface FormErrors {
  baseSalePrice?: string;
  discountPercentage?: string;
  acquisitionCost?: string;
  sellerCommission?: string;
  platformFee?: string;
  otherCosts?: string;
}

const ProfitSimulationForm = ({ onSubmit, isLoading = false }: ProfitSimulationFormProps) => {
  const [formData, setFormData] = useState<ProfitSimulationData>({
    productType: 'DIRECT',
    baseSalePrice: 0,
    discountPercentage: 0,
    acquisitionCost: 0,
    sellerCommission: 0,
    platformFee: 0,
    otherCosts: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do preço de venda base
    if (!formData.baseSalePrice || formData.baseSalePrice <= 0) {
      newErrors.baseSalePrice = 'Preço de venda deve ser maior que zero';
    }

    // Validação do desconto
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
      newErrors.discountPercentage = 'Desconto deve estar entre 0% e 100%';
    }

    // Validação específica para produtos diretos
    if (formData.productType === 'DIRECT') {
      if (!formData.acquisitionCost || formData.acquisitionCost < 0) {
        newErrors.acquisitionCost = 'Custo de aquisição é obrigatório para produtos diretos';
      }
    }

    // Validação específica para produtos consignados
    if (formData.productType === 'CONSIGNED') {
      if (
        !formData.sellerCommission ||
        formData.sellerCommission < 0 ||
        formData.sellerCommission > 100
      ) {
        newErrors.sellerCommission = 'Comissão deve estar entre 0% e 100%';
      }
    }

    // Validação da taxa da plataforma
    if (formData.platformFee < 0 || formData.platformFee > 100) {
      newErrors.platformFee = 'Taxa da plataforma deve estar entre 0% e 100%';
    }

    // Validação de outros custos
    if (formData.otherCosts < 0) {
      newErrors.otherCosts = 'Outros custos não podem ser negativos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ProfitSimulationData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value,
    }));

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleProductTypeChange = (type: ProductType) => {
    setFormData((prev) => ({
      ...prev,
      productType: type,
      // Resetar campos específicos quando mudar o tipo
      acquisitionCost: type === 'DIRECT' ? prev.acquisitionCost : 0,
      sellerCommission: type === 'CONSIGNED' ? prev.sellerCommission : 0,
    }));
  };

  return (
    <div className='bg-white rounded-xl shadow-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-slate-800 mb-2'>Simulação de Lucro</h2>
        <p className='text-sm text-slate-600'>
          Calcule o lucro esperado considerando custos e comissões
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Tipo do Produto */}
        <div>
          <label className='text-sm font-medium text-slate-700 mb-2 block'>Tipo do Produto *</label>
          <div className='grid grid-cols-2 gap-3'>
            <button
              type='button'
              onClick={() => handleProductTypeChange('DIRECT')}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                formData.productType === 'DIRECT'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className='text-sm font-medium'>Produto Direto</div>
              <div className='text-xs text-slate-500'>Comprado pela loja</div>
            </button>
            <button
              type='button'
              onClick={() => handleProductTypeChange('CONSIGNED')}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                formData.productType === 'CONSIGNED'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className='text-sm font-medium'>Produto Consignado</div>
              <div className='text-xs text-slate-500'>De terceiros</div>
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Preço de Venda Base */}
          <div>
            <label className='text-sm font-medium text-slate-700 mb-2 block'>
              Preço de Venda Base (R$) *
            </label>
            <input
              type='number'
              step='0.01'
              min='0'
              value={formData.baseSalePrice}
              onChange={(e) => handleInputChange('baseSalePrice', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                errors.baseSalePrice
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-200 focus:border-purple-500'
              }`}
              placeholder='0,00'
            />
            {errors.baseSalePrice && (
              <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                <AlertCircle className='w-3 h-3' />
                {errors.baseSalePrice}
              </p>
            )}
          </div>

          {/* Desconto Aplicado */}
          <div>
            <label className='text-sm font-medium text-slate-700 mb-2 block'>
              Desconto Aplicado (%)
            </label>
            <input
              type='number'
              step='0.01'
              min='0'
              max='100'
              value={formData.discountPercentage}
              onChange={(e) => handleInputChange('discountPercentage', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                errors.discountPercentage
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-200 focus:border-purple-500'
              }`}
              placeholder='0'
            />
            {errors.discountPercentage && (
              <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                <AlertCircle className='w-3 h-3' />
                {errors.discountPercentage}
              </p>
            )}
          </div>

          {/* Custo de Aquisição (apenas para produtos diretos) */}
          {formData.productType === 'DIRECT' && (
            <div>
              <label className='text-sm font-medium text-slate-700 mb-2 block'>
                Custo de Aquisição (R$) *
              </label>
              <input
                type='number'
                step='0.01'
                min='0'
                value={formData.acquisitionCost}
                onChange={(e) => handleInputChange('acquisitionCost', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                  errors.acquisitionCost
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-slate-200 focus:border-purple-500'
                }`}
                placeholder='0,00'
              />
              {errors.acquisitionCost && (
                <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3' />
                  {errors.acquisitionCost}
                </p>
              )}
            </div>
          )}

          {/* Comissão do Vendedor (apenas para produtos consignados) */}
          {formData.productType === 'CONSIGNED' && (
            <div>
              <label className='text-sm font-medium text-slate-700 mb-2 block'>
                Comissão do Vendedor (%) *
              </label>
              <input
                type='number'
                step='0.01'
                min='0'
                max='100'
                value={formData.sellerCommission}
                onChange={(e) => handleInputChange('sellerCommission', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                  errors.sellerCommission
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-slate-200 focus:border-purple-500'
                }`}
                placeholder='0'
              />
              {errors.sellerCommission && (
                <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3' />
                  {errors.sellerCommission}
                </p>
              )}
            </div>
          )}

          {/* Taxa da Plataforma */}
          <div>
            <label className='text-sm font-medium text-slate-700 mb-2 block'>
              Taxa da Plataforma (%)
            </label>
            <input
              type='number'
              step='0.01'
              min='0'
              max='100'
              value={formData.platformFee}
              onChange={(e) => handleInputChange('platformFee', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                errors.platformFee
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-200 focus:border-purple-500'
              }`}
              placeholder='0'
            />
            {errors.platformFee && (
              <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                <AlertCircle className='w-3 h-3' />
                {errors.platformFee}
              </p>
            )}
          </div>

          {/* Outros Custos */}
          <div>
            <label className='text-sm font-medium text-slate-700 mb-2 block'>
              Outros Custos (R$)
            </label>
            <input
              type='number'
              step='0.01'
              min='0'
              value={formData.otherCosts}
              onChange={(e) => handleInputChange('otherCosts', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 ${
                errors.otherCosts
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-slate-200 focus:border-purple-500'
              }`}
              placeholder='0,00'
            />
            {errors.otherCosts && (
              <p className='text-red-600 text-xs mt-1 flex items-center gap-1'>
                <AlertCircle className='w-3 h-3' />
                {errors.otherCosts}
              </p>
            )}
          </div>
        </div>

        {/* Botão de Simular */}
        <div className='pt-4'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-102 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
          >
            {isLoading ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Simulando...
              </>
            ) : (
              <>
                <Calculator className='w-4 h-4' />
                Simular Lucro
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfitSimulationForm;
