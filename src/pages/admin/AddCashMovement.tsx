import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const AddCashMovement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'entry',
    amount: '',
    description: '',
    paymentMethod: 'money',
    category: 'sale',
    referenceType: '',
    referenceId: '',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Nova movimentação:', formData);
    // Navigate back to cash flow after adding movement
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
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Nova Movimentação</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Registre uma nova movimentação no caixa
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Movement Type */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm sm:text-base font-semibold text-slate-700'>
              Tipo de Movimentação *
            </label>
            <div className='grid grid-cols-2 gap-4'>
              <label className='relative cursor-pointer'>
                <input
                  type='radio'
                  name='type'
                  value='entry'
                  checked={formData.type === 'entry'}
                  onChange={handleInputChange}
                  className='sr-only'
                />
                <div
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    formData.type === 'entry'
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 hover:border-green-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        formData.type === 'entry' ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    >
                      <TrendingUp
                        className={`w-4 h-4 ${formData.type === 'entry' ? 'text-white' : 'text-slate-400'}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${formData.type === 'entry' ? 'text-green-800' : 'text-slate-700'}`}
                      >
                        Entrada
                      </p>
                      <p
                        className={`text-sm ${formData.type === 'entry' ? 'text-green-600' : 'text-slate-500'}`}
                      >
                        Dinheiro entrando no caixa
                      </p>
                    </div>
                  </div>
                </div>
              </label>
              <label className='relative cursor-pointer'>
                <input
                  type='radio'
                  name='type'
                  value='exit'
                  checked={formData.type === 'exit'}
                  onChange={handleInputChange}
                  className='sr-only'
                />
                <div
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    formData.type === 'exit'
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 hover:border-red-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        formData.type === 'exit' ? 'bg-red-500' : 'bg-slate-200'
                      }`}
                    >
                      <TrendingDown
                        className={`w-4 h-4 ${formData.type === 'exit' ? 'text-white' : 'text-slate-400'}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${formData.type === 'exit' ? 'text-red-800' : 'text-slate-700'}`}
                      >
                        Saída
                      </p>
                      <p
                        className={`text-sm ${formData.type === 'exit' ? 'text-red-600' : 'text-slate-500'}`}
                      >
                        Dinheiro saindo do caixa
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Amount and Description */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='amount'>
                Valor (R$) *
              </label>
              <input
                id='amount'
                name='amount'
                type='number'
                step='0.01'
                min='0'
                placeholder='0,00'
                value={formData.amount}
                onChange={handleInputChange}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white ${
                  formData.type === 'entry'
                    ? 'focus:border-green-500 focus:ring-green-500/20'
                    : 'focus:border-red-500 focus:ring-red-500/20'
                }`}
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='description'
              >
                Descrição *
              </label>
              <input
                id='description'
                name='description'
                type='text'
                placeholder='Ex: Venda #1234 - Blusa Feminina'
                value={formData.description}
                onChange={handleInputChange}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white ${
                  formData.type === 'entry'
                    ? 'focus:border-green-500 focus:ring-green-500/20'
                    : 'focus:border-red-500 focus:ring-red-500/20'
                }`}
                required
              />
            </div>
          </div>

          {/* Payment Method and Category */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='paymentMethod'
              >
                Forma de Pagamento *
              </label>
              <select
                id='paymentMethod'
                name='paymentMethod'
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white ${
                  formData.type === 'entry'
                    ? 'focus:border-green-500 focus:ring-green-500/20'
                    : 'focus:border-red-500 focus:ring-red-500/20'
                }`}
                required
              >
                <option value='money'>Dinheiro</option>
                <option value='card'>Cartão</option>
                <option value='pix'>PIX</option>
                <option value='boleto'>Boleto</option>
                <option value='transfer'>Transferência</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='category'
              >
                Categoria *
              </label>
              <select
                id='category'
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white ${
                  formData.type === 'entry'
                    ? 'focus:border-green-500 focus:ring-green-500/20'
                    : 'focus:border-red-500 focus:ring-red-500/20'
                }`}
                required
              >
                {formData.type === 'entry' ? (
                  <>
                    <option value='sale'>Venda</option>
                    <option value='refund'>Estorno</option>
                    <option value='adjustment'>Ajuste</option>
                    <option value='other'>Outros</option>
                  </>
                ) : (
                  <>
                    <option value='supplier'>Fornecedor</option>
                    <option value='withdrawal'>Retirada</option>
                    <option value='fee'>Taxa</option>
                    <option value='adjustment'>Ajuste</option>
                    <option value='other'>Outros</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Reference (Optional) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='referenceType'
              >
                Tipo de Referência
              </label>
              <select
                id='referenceType'
                name='referenceType'
                value={formData.referenceType}
                onChange={handleInputChange}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white ${
                  formData.type === 'entry'
                    ? 'focus:border-green-500 focus:ring-green-500/20'
                    : 'focus:border-red-500 focus:ring-red-500/20'
                }`}
              >
                <option value=''>Nenhuma referência</option>
                <option value='accounts_receivable'>Conta a Receber</option>
                <option value='accounts_payable'>Conta a Pagar</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='referenceId'
              >
                ID da Referência
              </label>
              <input
                id='referenceId'
                name='referenceId'
                type='number'
                placeholder='ID da conta (opcional)'
                value={formData.referenceId}
                onChange={handleInputChange}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white ${
                  formData.type === 'entry'
                    ? 'focus:border-green-500 focus:ring-green-500/20'
                    : 'focus:border-red-500 focus:ring-red-500/20'
                }`}
              />
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
              placeholder='Observações adicionais (opcional)'
              value={formData.notes}
              onChange={handleInputChange}
              className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:ring-2 transition-all duration-300 bg-white resize-none ${
                formData.type === 'entry'
                  ? 'focus:border-green-500 focus:ring-green-500/20'
                  : 'focus:border-red-500 focus:ring-red-500/20'
              }`}
            />
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              <div className='flex items-center justify-center gap-2'>
                {formData.type === 'entry' ? (
                  <TrendingUp className='w-4 h-4' />
                ) : (
                  <TrendingDown className='w-4 h-4' />
                )}
                {formData.type === 'entry' ? 'Registrar Entrada' : 'Registrar Saída'}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCashMovement;
