import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DollarSign } from 'lucide-react';

interface AccountsPayableItem {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: 'money' | 'card' | 'pix' | 'boleto' | 'transfer';
  category:
    | 'supplier'
    | 'logistics'
    | 'marketing'
    | 'system'
    | 'taxes'
    | 'rent'
    | 'utilities'
    | 'other';
  supplierName?: string;
  recurrence?: 'monthly' | 'yearly' | 'once';
  notes?: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface AccountsPayableFormData {
  description: string;
  amount: string;
  dueDate: string;
  paymentMethod: 'money' | 'card' | 'pix' | 'boleto' | 'transfer';
  category:
    | 'supplier'
    | 'logistics'
    | 'marketing'
    | 'system'
    | 'taxes'
    | 'rent'
    | 'utilities'
    | 'other';
  supplierName: string;
  recurrence: 'monthly' | 'yearly' | 'once';
  notes: string;
}

interface AccountsPayableFormProps {
  account?: AccountsPayableItem;
  onSubmit: (data: AccountsPayableFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AccountsPayableForm = ({
  account,
  onSubmit,
  onCancel,
  isLoading = false,
}: AccountsPayableFormProps) => {
  const [formData, setFormData] = useState<AccountsPayableFormData>({
    description: '',
    amount: '',
    dueDate: '',
    paymentMethod: 'boleto',
    category: 'supplier',
    supplierName: '',
    recurrence: 'once',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (account) {
      setFormData({
        description: account.description,
        amount: account.amount.toString(),
        dueDate: account.dueDate,
        paymentMethod: account.paymentMethod,
        category: account.category,
        supplierName: account.supplierName || '',
        recurrence: account.recurrence || 'once',
        notes: account.notes || '',
      });
    }
  }, [account]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Data de vencimento é obrigatória';
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-white'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-3 mb-1'>
                <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                  <DollarSign className='w-4 h-4 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold'>
                    {account ? 'Editar Conta a Pagar' : 'Criar Nova Conta a Pagar'}
                  </h2>
                  <p className='text-slate-300 text-sm'>
                    {account
                      ? 'Atualize as informações da conta a pagar'
                      : 'Preencha as informações da nova conta a pagar'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onCancel}
              className='p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Description */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>Descrição *</label>
            <input
              name='description'
              type='text'
              placeholder='Ex: Compra de Estoque - Fornecedor ABC'
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                errors.description
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-red-500 focus:ring-red-500/20'
              }`}
            />
            {errors.description && (
              <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
            )}
          </div>

          {/* Amount and Due Date */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Valor (R$) *
              </label>
              <input
                name='amount'
                type='number'
                step='0.01'
                min='0'
                placeholder='0,00'
                value={formData.amount}
                onChange={handleInputChange}
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  errors.amount
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-red-500 focus:ring-red-500/20'
                }`}
              />
              {errors.amount && <p className='text-red-500 text-sm mt-1'>{errors.amount}</p>}
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Data de Vencimento *
              </label>
              <input
                name='dueDate'
                type='date'
                value={formData.dueDate}
                onChange={handleInputChange}
                className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                  errors.dueDate
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-red-500 focus:ring-red-500/20'
                }`}
              />
              {errors.dueDate && <p className='text-red-500 text-sm mt-1'>{errors.dueDate}</p>}
            </div>
          </div>

          {/* Payment Method and Category */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Forma de Pagamento *
              </label>
              <select
                name='paymentMethod'
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300'
              >
                <option value='boleto'>Boleto</option>
                <option value='pix'>PIX</option>
                <option value='transfer'>Transferência</option>
                <option value='card'>Cartão</option>
                <option value='money'>Dinheiro</option>
              </select>
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>Categoria *</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300'
              >
                <option value='supplier'>Fornecedor</option>
                <option value='logistics'>Logística</option>
                <option value='marketing'>Marketing</option>
                <option value='system'>Sistema</option>
                <option value='taxes'>Impostos</option>
                <option value='rent'>Aluguel</option>
                <option value='utilities'>Serviços</option>
                <option value='other'>Outros</option>
              </select>
            </div>
          </div>

          {/* Supplier Name and Recurrence */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Nome do Fornecedor
              </label>
              <input
                name='supplierName'
                type='text'
                placeholder='Nome do fornecedor (opcional)'
                value={formData.supplierName}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300'
              />
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>Recorrência</label>
              <select
                name='recurrence'
                value={formData.recurrence}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300'
              >
                <option value='once'>Único</option>
                <option value='monthly'>Mensal</option>
                <option value='yearly'>Anual</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>Observações</label>
            <textarea
              name='notes'
              rows={4}
              placeholder='Observações adicionais (opcional)'
              value={formData.notes}
              onChange={handleInputChange}
              className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300 resize-none'
            />
          </div>

          {/* Buttons */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                type='button'
                onClick={onCancel}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Cancelar
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Salvando...' : account ? 'Atualizar Conta' : 'Criar Conta'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountsPayableForm;
