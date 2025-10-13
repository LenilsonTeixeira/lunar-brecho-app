import { Calculator, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { ProfitSimulationData } from '../../types/profit';
import { useProfitSimulation } from '../../hooks/useProfitSimulation';
import ProfitSimulationForm from '../../components/admin/ProfitSimulationForm';
import ProfitSimulationResults from '../../components/admin/ProfitSimulationResults';

const ProfitSimulation = () => {
  const { result, loading, error, simulateProfit, clearResult } = useProfitSimulation();

  const handleSimulate = async (data: ProfitSimulationData) => {
    try {
      await simulateProfit(data);
    } catch (error) {
      console.error('Erro ao simular lucro:', error);
    }
  };

  const handleNewSimulation = () => {
    clearResult();
  };

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
                Simulação de Lucro
              </h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Calcule o lucro esperado por produto e por vendedor
              </p>
            </div>
            {result && (
              <button
                onClick={handleNewSimulation}
                className='flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                <RefreshCw className='w-4 h-4' />
                Nova Simulação
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <div className='flex items-center gap-2'>
              <AlertCircle className='w-5 h-5 text-red-600' />
              <p className='text-red-800 text-sm'>{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {result && !error && (
          <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5 text-green-600' />
              <p className='text-green-800 text-sm'>Simulação realizada com sucesso!</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Form Section */}
          <div className={`${result ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <ProfitSimulationForm onSubmit={handleSimulate} isLoading={loading} />
          </div>

          {/* Results Section */}
          {result && (
            <div className='lg:col-span-1'>
              <ProfitSimulationResults result={result} />
            </div>
          )}
        </div>

        {/* Info Cards */}
        {!result && (
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Calculator className='w-4 h-4 text-blue-600' />
                </div>
                <h3 className='font-semibold text-slate-800'>Produtos Diretos</h3>
              </div>
              <p className='text-sm text-slate-600'>
                Produtos comprados pela loja. O lucro é calculado considerando o custo de aquisição.
              </p>
            </div>

            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <Calculator className='w-4 h-4 text-purple-600' />
                </div>
                <h3 className='font-semibold text-slate-800'>Produtos Consignados</h3>
              </div>
              <p className='text-sm text-slate-600'>
                Produtos de terceiros. O lucro considera a comissão do vendedor.
              </p>
            </div>

            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                  <Calculator className='w-4 h-4 text-green-600' />
                </div>
                <h3 className='font-semibold text-slate-800'>Cálculo Automático</h3>
              </div>
              <p className='text-sm text-slate-600'>
                Descontos, taxas e custos são calculados automaticamente para você.
              </p>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!result && (
          <div className='mt-8 bg-purple-200 rounded-xl p-6 shadow-lg'>
            <h3 className='text-lg font-semibold text-slate-800 mb-3'>
              Como funciona a simulação?
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600'>
              <div>
                <h4 className='font-medium text-slate-700 mb-2'>Para Produtos Diretos:</h4>
                <ul className='space-y-1'>
                  <li>• Preço final = Preço base - Desconto</li>
                  <li>• Lucro bruto = Preço final - Custo de aquisição</li>
                  <li>• Lucro líquido = Lucro bruto - Taxa da plataforma - Outros custos</li>
                </ul>
              </div>
              <div>
                <h4 className='font-medium text-slate-700 mb-2'>Para Produtos Consignados:</h4>
                <ul className='space-y-1'>
                  <li>• Preço final = Preço base - Desconto</li>
                  <li>• Valor ao vendedor = Preço final × Comissão</li>
                  <li>
                    • Lucro líquido = Preço final - Valor ao vendedor - Taxa da plataforma - Outros
                    custos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitSimulation;
