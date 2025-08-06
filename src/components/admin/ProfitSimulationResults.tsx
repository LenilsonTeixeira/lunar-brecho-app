import { TrendingUp, DollarSign, Percent, Users, Calculator } from 'lucide-react';
import { ProfitSimulationResult } from '../../types/profit';

interface ProfitSimulationResultsProps {
  result: ProfitSimulationResult;
}

const ProfitSimulationResults = ({ result }: ProfitSimulationResultsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center'>
            <Calculator className='w-5 h-5 text-white' />
          </div>
          <div>
            <h2 className='text-xl font-bold text-slate-800'>Resultados da Simulação</h2>
            <p className='text-sm text-slate-600'>Análise detalhada do lucro esperado</p>
          </div>
        </div>
      </div>

      {/* Cards Principais */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Preço Final */}
        <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-slate-600'>Preço Final</h3>
            <DollarSign className='w-4 h-4 text-blue-500' />
          </div>
          <div className='text-2xl font-bold text-slate-800'>
            {formatCurrency(result.finalPrice)}
          </div>
          <div className='text-xs text-slate-500 mt-1'>
            Com desconto de {formatCurrency(result.summary.discountAmount)}
          </div>
        </div>

        {/* Lucro Bruto */}
        <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-slate-600'>Lucro Bruto</h3>
            <TrendingUp className='w-4 h-4 text-green-500' />
          </div>
          <div className='text-2xl font-bold text-green-600'>
            {formatCurrency(result.grossProfit)}
          </div>
          <div className='text-xs text-slate-500 mt-1'>Antes dos custos</div>
        </div>

        {/* Lucro Líquido */}
        <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-slate-600'>Lucro Líquido</h3>
            <TrendingUp className='w-4 h-4 text-purple-500' />
          </div>
          <div className='text-2xl font-bold text-purple-600'>
            {formatCurrency(result.netProfit)}
          </div>
          <div className='text-xs text-slate-500 mt-1'>Após todos os custos</div>
        </div>

        {/* Margem de Lucro */}
        <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-slate-600'>Margem de Lucro</h3>
            <Percent className='w-4 h-4 text-orange-500' />
          </div>
          <div className='text-2xl font-bold text-orange-600'>
            {formatPercentage(result.profitMargin)}
          </div>
          <div className='text-xs text-slate-500 mt-1'>Sobre o preço final</div>
        </div>
      </div>

      {/* Detalhamento dos Custos */}
      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Detalhamento dos Custos</h3>
        <div className='space-y-3'>
          <div className='flex justify-between items-center py-2 border-b border-slate-100'>
            <span className='text-sm text-slate-600'>Custo de Aquisição</span>
            <span className='font-medium text-slate-800'>
              {formatCurrency(result.costBreakdown.acquisitionCost)}
            </span>
          </div>

          <div className='flex justify-between items-center py-2 border-b border-slate-100'>
            <span className='text-sm text-slate-600'>Taxa da Plataforma</span>
            <span className='font-medium text-slate-800'>
              {formatCurrency(result.costBreakdown.platformFee)}
            </span>
          </div>

          <div className='flex justify-between items-center py-2 border-b border-slate-100'>
            <span className='text-sm text-slate-600'>Outros Custos</span>
            <span className='font-medium text-slate-800'>
              {formatCurrency(result.costBreakdown.otherCosts)}
            </span>
          </div>

          {result.costBreakdown.sellerCommission && (
            <div className='flex justify-between items-center py-2 border-b border-slate-100'>
              <span className='text-sm text-slate-600'>Comissão do Vendedor</span>
              <span className='font-medium text-slate-800'>
                {formatCurrency(result.costBreakdown.sellerCommission)}
              </span>
            </div>
          )}

          <div className='flex justify-between items-center py-3 bg-slate-50 rounded-lg px-3'>
            <span className='text-sm font-semibold text-slate-700'>Total de Custos</span>
            <span className='font-bold text-slate-800'>
              {formatCurrency(result.costBreakdown.totalCosts)}
            </span>
          </div>
        </div>
      </div>

      {/* Valor Repassado ao Vendedor (apenas para consignados) */}
      {result.sellerAmount && (
        <div className='bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center'>
              <Users className='w-4 h-4 text-indigo-600' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-slate-800'>Valor Repassado ao Vendedor</h3>
              <p className='text-sm text-slate-600'>Comissão calculada sobre o preço final</p>
            </div>
          </div>
          <div className='text-3xl font-bold text-indigo-600'>
            {formatCurrency(result.sellerAmount)}
          </div>
        </div>
      )}

      {/* Resumo da Simulação */}
      <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200'>
        <h3 className='text-lg font-semibold text-slate-800 mb-3'>Resumo da Simulação</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div>
            <span className='text-slate-600'>Preço Original:</span>
            <div className='font-semibold text-slate-800'>
              {formatCurrency(result.summary.originalPrice)}
            </div>
          </div>
          <div>
            <span className='text-slate-600'>Desconto Aplicado:</span>
            <div className='font-semibold text-red-600'>
              -{formatCurrency(result.summary.discountAmount)}
            </div>
          </div>
          <div>
            <span className='text-slate-600'>Tipo de Lucro:</span>
            <div className='font-semibold text-slate-800 capitalize'>
              {result.summary.profitType === 'gross' ? 'Bruto' : 'Líquido'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitSimulationResults;
