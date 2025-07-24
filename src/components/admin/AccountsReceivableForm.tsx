import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AccountsReceivableItem {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'received' | 'overdue' | 'cancelled';
  paymentMethod: 'money' | 'card' | 'pix' | 'boleto';
  category: 'sale' | 'adjustment' | 'commission' | 'refund' | 'other';
  customerName?: string;
  orderId?: number;
  notes?: string;
  receivedDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface AccountsReceivableFormData {
  description: string;
  amount: string;
  dueDate: string;
  paymentMethod: 'money' | 'card' | 'pix' | 'boleto';
  category: 'sale' | 'adjustment' | 'commission' | 'refund' | 'other';
  customerName: string;
  orderId: string;
  notes: string;
}

interface AccountsReceivableFormProps {
  account?: AccountsReceivableItem;
  onSubmit: (data: AccountsReceivableFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AccountsReceivableForm = ({
  account,
  onSubmit,
  onCancel,
  isLoading = false,
}: AccountsReceivableFormProps) => {
  const [formData, setFormData] = useState<AccountsReceivableFormData>({
    description: '',
    amount: '',
    dueDate: '',
    paymentMethod: 'pix',
    category: 'sale',
    customerName: '',
    orderId: '',
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
        customerName: account.customerName || '',
        orderId: account.orderId?.toString() || '',
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
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-800'>
              {account ? 'Editar Conta a Receber' : 'Criar Nova Conta a Receber'}
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
          {/* Description */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>Descrição *</label>
            <input
              name='description'
              type='text'
              placeholder='Ex: Venda #1234 - Blusa Feminina'
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                errors.description
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-green-500 focus:ring-green-500/20'
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
                    : 'border-slate-200 focus:border-green-500 focus:ring-green-500/20'
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
                    : 'border-slate-200 focus:border-green-500 focus:ring-green-500/20'
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
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300'
              >
                <option value='pix'>PIX</option>
                <option value='card'>Cartão</option>
                <option value='boleto'>Boleto</option>
                <option value='money'>Dinheiro</option>
              </select>
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>Categoria *</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300'
              >
                <option value='sale'>Venda</option>
                <option value='adjustment'>Ajuste</option>
                <option value='commission'>Comissão</option>
                <option value='refund'>Reembolso</option>
                <option value='other'>Outros</option>
              </select>
            </div>
          </div>

          {/* Customer Name and Order ID */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Nome do Cliente
              </label>
              <input
                name='customerName'
                type='text'
                placeholder='Nome do cliente (opcional)'
                value={formData.customerName}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300'
              />
            </div>

            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                ID do Pedido
              </label>
              <input
                name='orderId'
                type='number'
                placeholder='ID do pedido (opcional)'
                value={formData.orderId}
                onChange={handleInputChange}
                className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300'
              />
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
              className='w-full py-3 px-4 rounded-lg border border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all duration-300 resize-none'
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-4 pt-4'>
            <button
              type='button'
              onClick={onCancel}
              className='flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Salvando...' : account ? 'Atualizar Conta' : 'Criar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountsReceivableForm;
