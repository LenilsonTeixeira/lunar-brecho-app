import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

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

const AccountsReceivable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deletingAccount, setDeletingAccount] = useState<AccountsReceivableItem | undefined>();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<AccountsReceivableItem[]>([
    {
      id: 1,
      description: 'Venda #1234 - Blusa Feminina',
      amount: 89.9,
      dueDate: '2024-02-15',
      status: 'received',
      paymentMethod: 'card',
      category: 'sale',
      customerName: 'Maria Silva',
      orderId: 1234,
      notes: 'Venda realizada via cartão de crédito',
      receivedDate: '2024-02-10',
      createdAt: '2024-02-01T10:30:00Z',
      updatedAt: '2024-02-10T14:45:00Z',
    },
    {
      id: 2,
      description: 'Venda #1235 - Calça Jeans',
      amount: 129.9,
      dueDate: '2024-02-20',
      status: 'pending',
      paymentMethod: 'boleto',
      category: 'sale',
      customerName: 'João Santos',
      orderId: 1235,
      notes: 'Aguardando pagamento do boleto',
      createdAt: '2024-02-02T09:15:00Z',
      updatedAt: '2024-02-02T09:15:00Z',
    },
  ]);

  const handleDeleteAccount = (account: AccountsReceivableItem) => {
    setDeletingAccount(account);
  };

  const confirmDelete = async () => {
    if (!deletingAccount) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAccounts((prev) => prev.filter((acc) => acc.id !== deletingAccount.id));
      setDeletingAccount(undefined);
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (account: AccountsReceivableItem) => {
    navigate(`/admin/contas-receber/editar/${account.id}`);
  };

  const handleView = (account: AccountsReceivableItem) => {
    navigate(`/admin/contas-receber/visualizar/${account.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
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

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredAccounts.reduce((sum, account) => sum + account.amount, 0);
  const pendingAmount = filteredAccounts
    .filter((account) => account.status === 'pending')
    .reduce((sum, account) => sum + account.amount, 0);
  const receivedAmount = filteredAccounts
    .filter((account) => account.status === 'received')
    .reduce((sum, account) => sum + account.amount, 0);

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
                Contas a Receber
              </h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie as entradas financeiras previstas e recebidas
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/contas-receber/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Nova Conta
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Total</p>
                <p className='text-2xl font-bold text-slate-800'>R$ {totalAmount.toFixed(2)}</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                <DollarSign className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Pendente</p>
                <p className='text-2xl font-bold text-yellow-600'>R$ {pendingAmount.toFixed(2)}</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center'>
                <Calendar className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Recebido</p>
                <p className='text-2xl font-bold text-green-600'>R$ {receivedAmount.toFixed(2)}</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center'>
                <CreditCard className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar contas...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300'
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300'
            >
              <option value='all'>Todos os Status</option>
              <option value='pending'>Pendente</option>
              <option value='received'>Recebido</option>
              <option value='overdue'>Atrasado</option>
              <option value='cancelled'>Cancelado</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[800px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Descrição
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Cliente
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Valor
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Vencimento
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Forma
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {loading ? (
                  <tr>
                    <td colSpan={8} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin'></div>
                        <p className='font-medium'>Carregando contas...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className='hover:bg-slate-50 transition-colors duration-200'
                    >
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          #{account.id}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {account.description}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {account.customerName || '-'}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <span className='text-xs sm:text-sm font-bold text-slate-800'>
                          R$ {account.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {new Date(account.dueDate).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(account.status)}`}
                        >
                          {getStatusText(account.status)}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {account.paymentMethod === 'money'
                            ? 'Dinheiro'
                            : account.paymentMethod === 'card'
                              ? 'Cartão'
                              : account.paymentMethod === 'pix'
                                ? 'PIX'
                                : 'Boleto'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2 justify-center'>
                          <button
                            onClick={() => handleView(account)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEdit(account)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteAccount(account)}
                            className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                            title='Excluir'
                          >
                            <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center'>
                          <DollarSign className='w-8 h-8 text-slate-400' />
                        </div>
                        <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                          Nenhuma conta encontrada
                        </h3>
                        <p className='text-sm sm:text-base text-slate-600'>
                          Tente ajustar os filtros ou criar uma nova conta.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredAccounts.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredAccounts.length} de {accounts.length} contas
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {/* showForm state was removed */}
      {/* AccountsReceivableForm component was removed */}

      {/* View Modal */}
      {/* showView state was removed */}
      {/* AccountsReceivableView component was removed */}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingAccount}
        title='Excluir Conta a Receber'
        message={`Tem certeza que deseja excluir a conta "${deletingAccount?.description}"? Esta ação não pode ser desfeita.`}
        confirmText='Excluir'
        cancelText='Cancelar'
        onConfirm={confirmDelete}
        onCancel={() => setDeletingAccount(undefined)}
        type='danger'
      />
    </div>
  );
};

export default AccountsReceivable;
