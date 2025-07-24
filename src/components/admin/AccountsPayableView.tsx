import { X, Calendar, DollarSign, Tag, Building2, Repeat } from 'lucide-react';

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

interface AccountsPayableViewProps {
  account: AccountsPayableItem;
  onClose: () => void;
  onEdit?: () => void;
}

const AccountsPayableView = ({ account, onClose, onEdit }: AccountsPayableViewProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'supplier':
        return 'Fornecedor';
      case 'logistics':
        return 'Logística';
      case 'marketing':
        return 'Marketing';
      case 'system':
        return 'Sistema';
      case 'taxes':
        return 'Impostos';
      case 'rent':
        return 'Aluguel';
      case 'utilities':
        return 'Serviços';
      case 'other':
        return 'Outros';
      default:
        return 'Desconhecido';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'money':
        return 'Dinheiro';
      case 'card':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      case 'boleto':
        return 'Boleto';
      case 'transfer':
        return 'Transferência';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-800'>Detalhes da Conta a Pagar</h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-slate-600' />
            </button>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* Status */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>Status</label>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(account.status)}`}
              >
                {getStatusText(account.status)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>Descrição</label>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800 font-medium'>{account.description}</span>
            </div>
          </div>

          {/* Amount and Due Date */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <DollarSign className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Valor</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 font-bold text-lg'>
                  R$ {account.amount.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Data de Vencimento</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method and Category */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                Forma de Pagamento
              </label>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>
                  {getPaymentMethodText(account.paymentMethod)}
                </span>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Tag className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Categoria</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{getCategoryText(account.category)}</span>
              </div>
            </div>
          </div>

          {/* Supplier Name and Recurrence */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Building2 className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Fornecedor</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{account.supplierName || 'Não informado'}</span>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Repeat className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Recorrência</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>
                  {account.recurrence === 'monthly'
                    ? 'Mensal'
                    : account.recurrence === 'yearly'
                      ? 'Anual'
                      : 'Único'}
                </span>
              </div>
            </div>
          </div>

          {/* Paid Date (if paid) */}
          {account.status === 'paid' && account.paidDate && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Data do Pagamento</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.paidDate)}</span>
              </div>
            </div>
          )}

          {/* Notes */}
          {account.notes && (
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>Observações</label>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800'>{account.notes}</p>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Created Date */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.createdAt)}</span>
              </div>
            </div>

            {/* Updated Date */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-4 pt-4 border-t border-slate-200'>
            <button
              onClick={onClose}
              className='flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Fechar
            </button>
            <button
              onClick={onEdit || onClose}
              className='flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-300'
            >
              Editar Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPayableView;
