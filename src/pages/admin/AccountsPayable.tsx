import { useState } from 'react';
import { Search, Edit, Trash2, Plus, DollarSign, Calendar, CreditCard, Eye } from 'lucide-react';
import AccountsPayableForm from '../../components/admin/AccountsPayableForm';
import AccountsPayableView from '../../components/admin/AccountsPayableView';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

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

const AccountsPayable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountsPayableItem | undefined>();
  const [viewingAccount, setViewingAccount] = useState<AccountsPayableItem | undefined>();
  const [deletingAccount, setDeletingAccount] = useState<AccountsPayableItem | undefined>();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<AccountsPayableItem[]>([
    {
      id: 1,
      description: 'Compra de Estoque - Fornecedor ABC',
      amount: 2500.0,
      dueDate: '2024-02-15',
      status: 'paid',
      paymentMethod: 'transfer',
      category: 'supplier',
      supplierName: 'Fornecedor ABC Ltda',
      notes: 'Compra de 50 peças de vestuário',
      paidDate: '2024-02-10',
      createdAt: '2024-02-01T10:30:00Z',
      updatedAt: '2024-02-10T14:45:00Z',
    },
    {
      id: 2,
      description: 'Aluguel da Loja',
      amount: 1200.0,
      dueDate: '2024-02-05',
      status: 'pending',
      paymentMethod: 'boleto',
      category: 'rent',
      supplierName: 'Imobiliária XYZ',
      recurrence: 'monthly',
      notes: 'Aluguel mensal da loja',
      createdAt: '2024-02-02T09:15:00Z',
      updatedAt: '2024-02-02T09:15:00Z',
    },
    {
      id: 3,
      description: 'Frete - Entrega de Mercadorias',
      amount: 150.0,
      dueDate: '2024-02-20',
      status: 'pending',
      paymentMethod: 'pix',
      category: 'logistics',
      supplierName: 'Transportadora Express',
      notes: 'Frete para entrega de pedidos',
      createdAt: '2024-02-03T11:00:00Z',
      updatedAt: '2024-02-03T11:00:00Z',
    },
    {
      id: 4,
      description: 'Marketing Digital - Instagram Ads',
      amount: 300.0,
      dueDate: '2024-02-25',
      status: 'overdue',
      paymentMethod: 'card',
      category: 'marketing',
      supplierName: 'Meta Platforms',
      notes: 'Campanha publicitária no Instagram',
      createdAt: '2024-02-04T13:45:00Z',
      updatedAt: '2024-02-04T13:45:00Z',
    },
    {
      id: 5,
      description: 'Sistema de Gestão - Mensalidade',
      amount: 89.9,
      dueDate: '2024-02-01',
      status: 'paid',
      paymentMethod: 'card',
      category: 'system',
      supplierName: 'Sistema ERP Pro',
      recurrence: 'monthly',
      notes: 'Mensalidade do sistema de gestão',
      paidDate: '2024-02-01',
      createdAt: '2024-02-05T12:20:00Z',
      updatedAt: '2024-02-01T10:00:00Z',
    },
  ]);

  const handleCreateAccount = async (data: AccountsPayableFormData) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newAccount: AccountsPayableItem = {
        id: Math.max(...accounts.map((a) => a.id)) + 1,
        description: data.description,
        amount: parseFloat(data.amount),
        dueDate: data.dueDate,
        status: 'pending',
        paymentMethod: data.paymentMethod,
        category: data.category,
        supplierName: data.supplierName || undefined,
        recurrence: data.recurrence,
        notes: data.notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setAccounts((prev) => [...prev, newAccount]);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccount = async (data: AccountsPayableFormData) => {
    if (!editingAccount) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedAccount: AccountsPayableItem = {
        ...editingAccount,
        description: data.description,
        amount: parseFloat(data.amount),
        dueDate: data.dueDate,
        paymentMethod: data.paymentMethod,
        category: data.category,
        supplierName: data.supplierName || undefined,
        recurrence: data.recurrence,
        notes: data.notes || undefined,
        updatedAt: new Date().toISOString(),
      };

      setAccounts((prev) =>
        prev.map((acc) => (acc.id === editingAccount.id ? updatedAccount : acc)),
      );
      setShowForm(false);
      setEditingAccount(undefined);
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = (account: AccountsPayableItem) => {
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

  const handleEdit = (account: AccountsPayableItem) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleView = (account: AccountsPayableItem) => {
    setViewingAccount(account);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
    setViewingAccount(undefined);
  };

  const handleEditFromView = () => {
    if (viewingAccount) {
      setEditingAccount(viewingAccount);
      setShowView(false);
      setShowForm(true);
    }
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

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.supplierName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredAccounts.reduce((sum, account) => sum + account.amount, 0);
  const pendingAmount = filteredAccounts
    .filter((account) => account.status === 'pending')
    .reduce((sum, account) => sum + account.amount, 0);
  const paidAmount = filteredAccounts
    .filter((account) => account.status === 'paid')
    .reduce((sum, account) => sum + account.amount, 0);

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Contas a Pagar</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie as obrigações financeiras da loja
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
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
              <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center'>
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
                <p className='text-sm font-medium text-slate-600'>Pago</p>
                <p className='text-2xl font-bold text-green-600'>R$ {paidAmount.toFixed(2)}</p>
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
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300'
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300'
            >
              <option value='all'>Todos os Status</option>
              <option value='pending'>Pendente</option>
              <option value='paid'>Pago</option>
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
                    Fornecedor
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
                    Categoria
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
                        <div className='w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
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
                        <div>
                          <span className='text-xs sm:text-sm font-medium text-slate-800 block'>
                            {account.description}
                          </span>
                          {account.recurrence && (
                            <span className='text-xs text-slate-500'>
                              {account.recurrence === 'monthly'
                                ? 'Mensal'
                                : account.recurrence === 'yearly'
                                  ? 'Anual'
                                  : 'Único'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {account.supplierName || '-'}
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
                          {getCategoryText(account.category)}
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
      {showForm && (
        <AccountsPayableForm
          account={editingAccount}
          onSubmit={editingAccount ? handleUpdateAccount : handleCreateAccount}
          onCancel={() => {
            setShowForm(false);
            setEditingAccount(undefined);
          }}
          isLoading={loading}
        />
      )}

      {/* View Modal */}
      {showView && viewingAccount && (
        <AccountsPayableView
          account={viewingAccount}
          onClose={handleCloseView}
          onEdit={handleEditFromView}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingAccount}
        title='Excluir Conta a Pagar'
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

export default AccountsPayable;
