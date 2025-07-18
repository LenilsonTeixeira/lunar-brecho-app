import { useState } from 'react';
import { ArrowLeft, Unlock, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const OpenCashBox = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    openingAmount: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Abertura de caixa:', formData);
    // Navigate back to cash flow after opening
    navigate('/admin/fluxo-caixa');
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <Link
              to='/admin/fluxo-caixa'
              className='flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm font-medium'>Voltar</span>
            </Link>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Abrir Caixa</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Registre a abertura do caixa para o dia de hoje
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Opening Amount */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='openingAmount'
            >
              Valor de Abertura (R$) *
            </label>
            <div className='relative'>
              <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
              <input
                id='openingAmount'
                name='openingAmount'
                type='number'
                step='0.01'
                min='0'
                placeholder='0,00'
                value={formData.openingAmount}
                onChange={handleInputChange}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white'
                required
              />
            </div>
            <p className='text-xs text-slate-500'>
              Informe o valor em dinheiro disponível para abertura do caixa
            </p>
          </div>

          {/* Current Date Display */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                <Unlock className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-blue-800'>Data de Abertura</p>
                <p className='text-sm text-blue-600'>
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='notes'>
              Observações
            </label>
            <textarea
              id='notes'
              name='notes'
              rows={4}
              placeholder='Observações sobre a abertura do caixa (opcional)'
              value={formData.notes}
              onChange={handleInputChange}
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white resize-none'
            />
          </div>

          {/* Important Information */}
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <div className='flex items-start gap-3'>
              <div className='w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                <span className='text-yellow-600 text-sm font-bold'>!</span>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-yellow-800 mb-1'>
                  Informações Importantes
                </h3>
                <ul className='text-sm text-yellow-700 space-y-1'>
                  <li>• Apenas um caixa pode estar aberto por vez</li>
                  <li>• O valor de abertura será o saldo inicial do dia</li>
                  <li>• Todas as movimentações serão registradas automaticamente</li>
                  <li>• O caixa deve ser fechado ao final do expediente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              <div className='flex items-center justify-center gap-2'>
                <Unlock className='w-4 h-4' />
                Abrir Caixa
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpenCashBox;
