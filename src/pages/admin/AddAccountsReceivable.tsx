import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const AddAccountsReceivable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    dueDate: '',
    paymentMethod: 'card',
    category: 'sale',
    customerName: '',
    orderId: '',
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
    console.log('Conta a receber a ser adicionada:', formData);
    // Navigate back to accounts receivable after adding
    navigate('/admin/contas-receber');
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <Link
              to='/admin/contas-receber'
              className='flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm font-medium'>Voltar</span>
            </Link>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Adicionar Conta a Receber
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações da conta a receber abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Description */}
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
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
              required
            />
          </div>

          {/* Amount and Due Date */}
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
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='dueDate'
              >
                Data de Vencimento *
              </label>
              <input
                id='dueDate'
                name='dueDate'
                type='date'
                value={formData.dueDate}
                onChange={handleInputChange}
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
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
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
                required
              >
                <option value='card'>Cartão</option>
                <option value='pix'>PIX</option>
                <option value='boleto'>Boleto</option>
                <option value='money'>Dinheiro</option>
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
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
                required
              >
                <option value='sale'>Venda</option>
                <option value='adjustment'>Ajuste</option>
                <option value='commission'>Comissão</option>
                <option value='refund'>Estorno</option>
                <option value='other'>Outros</option>
              </select>
            </div>
          </div>

          {/* Customer Name and Order ID */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='customerName'
              >
                Nome do Cliente
              </label>
              <input
                id='customerName'
                name='customerName'
                type='text'
                placeholder='Nome do cliente (opcional)'
                value={formData.customerName}
                onChange={handleInputChange}
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='orderId'
              >
                Número do Pedido
              </label>
              <input
                id='orderId'
                name='orderId'
                type='number'
                placeholder='Número do pedido (opcional)'
                value={formData.orderId}
                onChange={handleInputChange}
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white'
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
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-white resize-none'
            />
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Adicionar Conta a Receber
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountsReceivable;
