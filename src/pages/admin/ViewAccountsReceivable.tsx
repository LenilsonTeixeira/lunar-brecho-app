import { ArrowLeft, DollarSign, Calendar, User, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface AccountsReceivableItem {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  customer: string;
  customerPhone: string;
  paymentMethod: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ViewAccountsReceivable = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockAccount: AccountsReceivableItem = {
    id: parseInt(accountId || '1'),
    description: 'Venda de Vestido Floral - Maria Silva',
    amount: 129.9,
    dueDate: '2024-02-15',
    status: 'pending',
    customer: 'Maria Silva Santos',
    customerPhone: '(34) 99668-3137',
    paymentMethod: 'PIX',
    notes: 'Venda realizada em 15/01/2024. Cliente solicitou pagamento em 2x.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-300 text-slate-950';
      case 'paid':
        return 'bg-green-300 text-slate-950';
      case 'overdue':
        return 'bg-red-300 text-slate-950';
      default:
        return 'bg-slate-300 text-slate-950';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'paid':
        return 'Pago';
      case 'overdue':
        return 'Vencido';
      default:
        return status;
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/contas-receber')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Conta a Receber #{mockAccount.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Detalhes completos da conta a receber
          </p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Status da Conta */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <DollarSign className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status da Conta</h3>
            </div>
            <div className='flex items-center justify-between'>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(mockAccount.status)}`}
              >
                {getStatusLabel(mockAccount.status)}
              </span>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Descrição</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockAccount.description}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Valor</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800 font-semibold'>
                    {formatPrice(mockAccount.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações do Cliente</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome do Cliente
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockAccount.customer}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockAccount.customerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <DollarSign className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Pagamento</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Método de Pagamento
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockAccount.paymentMethod}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Vencimento
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-800'>{formatDate(mockAccount.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          {mockAccount.notes && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <FileText className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Observações</h3>
              </div>
              <div className='p-3 bg-white rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{mockAccount.notes}</span>
              </div>
            </div>
          )}

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Criação
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockAccount.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockAccount.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/contas-receber')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/contas-receber/editar/${mockAccount.id}`)}
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

export default ViewAccountsReceivable;
