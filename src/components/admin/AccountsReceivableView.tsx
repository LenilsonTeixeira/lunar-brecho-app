import { X, DollarSign } from 'lucide-react';

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

interface AccountsReceivableViewProps {
  account: AccountsReceivableItem;
  onClose: () => void;
  onEdit?: () => void;
}

const AccountsReceivableView = ({ account, onClose, onEdit }: AccountsReceivableViewProps) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'received':
        return 'Recebido';
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
      case 'sale':
        return 'Venda';
      case 'adjustment':
        return 'Ajuste';
      case 'commission':
        return 'Comissão';
      case 'refund':
        return 'Reembolso';
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
      default:
        return 'Desconhecido';
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
                  <h2 className='text-xl font-bold'>Conta a Receber #{account.id}</h2>
                  <p className='text-slate-300 text-sm'>{account.description}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='p-4 space-y-4'>
          {/* Status */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Status</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800'>{getStatusText(account.status)}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Descrição</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800'>{account.description}</span>
            </div>
          </div>

          {/* Amount and Due Date */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Valor</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 text-lg'>R$ {account.amount.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data de Vencimento</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method and Category */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Forma de Pagamento</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>
                  {getPaymentMethodText(account.paymentMethod)}
                </span>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Categoria</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{getCategoryText(account.category)}</span>
              </div>
            </div>
          </div>

          {/* Customer Name and Order ID */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Cliente</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{account.customerName || 'Não informado'}</span>
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>ID do Pedido</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{account.orderId || 'Não informado'}</span>
              </div>
            </div>
          </div>

          {/* Received Date (if received) */}
          {account.status === 'received' && account.receivedDate && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data do Recebimento</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.receivedDate)}</span>
              </div>
            </div>
          )}

          {/* Notes */}
          {account.notes && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Observações</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800'>{account.notes}</p>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Created Date */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.createdAt)}</span>
              </div>
            </div>

            {/* Updated Date */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(account.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={onClose}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Fechar
              </button>
              <button
                onClick={onEdit || onClose}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsReceivableView;
