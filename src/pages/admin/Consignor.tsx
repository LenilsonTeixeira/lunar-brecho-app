import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import ConsignorView from '../../components/admin/ConsignorView';
import ConsignorForm from '../../components/admin/ConsignorForm';
import ConsignorHistory from '../../components/admin/ConsignorHistory';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

interface ConsignorItem {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'money' | 'bank_transfer';
  pixKey: string;
  bankAccount: {
    bank: string;
    agency: string;
    account: string;
    accountType: 'checking' | 'savings';
  };
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  totalProducts?: number;
  productsForSale?: number;
  soldProducts?: number;
  totalCommission?: number;
}

interface ConsignorFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'money' | 'bank_transfer';
  pixKey: string;
  bankAccount: {
    bank: string;
    agency: string;
    account: string;
    accountType: 'checking' | 'savings';
  };
  status: 'active' | 'inactive';
}

const Consignor = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingConsignor, setEditingConsignor] = useState<ConsignorItem | undefined>();
  const [viewingConsignor, setViewingConsignor] = useState<ConsignorItem | undefined>();
  const [historyConsignor, setHistoryConsignor] = useState<ConsignorItem | undefined>();
  const [deletingConsignor, setDeletingConsignor] = useState<ConsignorItem | undefined>();
  const [loading, setLoading] = useState(false);
  const [consignors, setConsignors] = useState<ConsignorItem[]>([
    {
      id: 1,
      name: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      paymentMethod: 'pix',
      pixKey: 'maria.silva@email.com',
      bankAccount: {
        bank: 'Banco do Brasil',
        agency: '1234',
        account: '12345-6',
        accountType: 'checking',
      },
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      totalProducts: 45,
      productsForSale: 32,
      soldProducts: 13,
      totalCommission: 1250.0,
    },
    {
      id: 2,
      name: 'João Carlos Oliveira',
      cpf: '987.654.321-00',
      email: 'joao.oliveira@email.com',
      phone: '(11) 88888-8888',
      paymentMethod: 'pix',
      pixKey: 'joao.oliveira@email.com',
      bankAccount: {
        bank: 'Itaú',
        agency: '5678',
        account: '98765-4',
        accountType: 'savings',
      },
      status: 'active',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-18T16:20:00Z',
      totalProducts: 78,
      productsForSale: 45,
      soldProducts: 33,
      totalCommission: 2890.5,
    },
    {
      id: 3,
      name: 'Ana Paula Costa',
      cpf: '111.222.333-44',
      email: 'ana.costa@email.com',
      phone: '(11) 77777-7777',
      paymentMethod: 'bank_transfer',
      pixKey: '111.222.333-44',
      bankAccount: {
        bank: 'Bradesco',
        agency: '9012',
        account: '54321-0',
        accountType: 'checking',
      },
      status: 'active',
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-19T13:30:00Z',
      totalProducts: 32,
      productsForSale: 18,
      soldProducts: 14,
      totalCommission: 890.75,
    },
    {
      id: 4,
      name: 'Pedro Mendes Ferreira',
      cpf: '555.666.777-88',
      email: 'pedro.mendes@email.com',
      phone: '(11) 66666-6666',
      paymentMethod: 'money',
      pixKey: 'pedro.mendes@email.com',
      bankAccount: {
        bank: 'Santander',
        agency: '3456',
        account: '67890-1',
        accountType: 'savings',
      },
      status: 'inactive',
      createdAt: '2024-01-08T08:45:00Z',
      updatedAt: '2024-01-17T15:10:00Z',
      totalProducts: 18,
      productsForSale: 5,
      soldProducts: 13,
      totalCommission: 650.25,
    },
    {
      id: 5,
      name: 'Lucia Ferreira Silva',
      cpf: '999.888.777-66',
      email: 'lucia.ferreira@email.com',
      phone: '(11) 55555-5555',
      paymentMethod: 'pix',
      pixKey: '999.888.777-66',
      bankAccount: {
        bank: 'Caixa Econômica',
        agency: '7890',
        account: '23456-7',
        accountType: 'checking',
      },
      status: 'active',
      createdAt: '2024-01-05T12:20:00Z',
      updatedAt: '2024-01-16T10:55:00Z',
      totalProducts: 56,
      productsForSale: 28,
      soldProducts: 28,
      totalCommission: 2100.0,
    },
    {
      id: 6,
      name: 'Carlos Eduardo Lima',
      cpf: '444.333.222-11',
      email: 'carlos.lima@email.com',
      phone: '(11) 44444-4444',
      paymentMethod: 'pix',
      pixKey: 'carlos.lima@email.com',
      bankAccount: {
        bank: 'Nubank',
        agency: '0001',
        account: '12345678-9',
        accountType: 'checking',
      },
      status: 'active',
      createdAt: '2024-01-03T14:30:00Z',
      updatedAt: '2024-01-15T11:25:00Z',
      totalProducts: 89,
      productsForSale: 52,
      soldProducts: 37,
      totalCommission: 3450.8,
    },
    {
      id: 7,
      name: 'Fernanda Santos Costa',
      cpf: '777.888.999-00',
      email: 'fernanda.santos@email.com',
      phone: '(11) 33333-3333',
      paymentMethod: 'pix',
      pixKey: '777.888.999-00',
      bankAccount: {
        bank: 'Inter',
        agency: '0001',
        account: '87654321-0',
        accountType: 'checking',
      },
      status: 'active',
      createdAt: '2024-01-01T16:00:00Z',
      updatedAt: '2024-01-14T09:40:00Z',
      totalProducts: 23,
      productsForSale: 15,
      soldProducts: 8,
      totalCommission: 420.5,
    },
    {
      id: 8,
      name: 'Roberto Silva Mendes',
      cpf: '222.333.444-55',
      email: 'roberto.silva@email.com',
      phone: '(11) 22222-2222',
      paymentMethod: 'pix',
      pixKey: 'roberto.silva@email.com',
      bankAccount: {
        bank: 'Banco do Brasil',
        agency: '5678',
        account: '98765-4',
        accountType: 'savings',
      },
      status: 'active',
      createdAt: '2024-01-07T13:45:00Z',
      updatedAt: '2024-01-13T17:15:00Z',
      totalProducts: 67,
      productsForSale: 38,
      soldProducts: 29,
      totalCommission: 1780.3,
    },
  ]);

  const handleCreateConsignor = async (data: ConsignorFormData) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newConsignor: ConsignorItem = {
        id: Math.max(...consignors.map((c) => c.id)) + 1,
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        paymentMethod: data.paymentMethod,
        pixKey: data.pixKey,
        bankAccount: data.bankAccount,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalProducts: 0,
        productsForSale: 0,
        soldProducts: 0,
        totalCommission: 0,
      };

      setConsignors((prev) => [...prev, newConsignor]);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar consignante:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConsignor = async (data: ConsignorFormData) => {
    if (!editingConsignor) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedConsignor: ConsignorItem = {
        ...editingConsignor,
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        paymentMethod: data.paymentMethod,
        pixKey: data.pixKey,
        bankAccount: data.bankAccount,
        status: data.status,
        updatedAt: new Date().toISOString(),
      };

      setConsignors((prev) =>
        prev.map((cons) => (cons.id === editingConsignor.id ? updatedConsignor : cons)),
      );
      setShowForm(false);
      setEditingConsignor(undefined);
    } catch (error) {
      console.error('Erro ao atualizar consignante:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConsignor = (consignor: ConsignorItem) => {
    setDeletingConsignor(consignor);
  };

  const confirmDelete = async () => {
    if (!deletingConsignor) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setConsignors((prev) => prev.filter((cons) => cons.id !== deletingConsignor.id));
      setDeletingConsignor(undefined);
    } catch (error) {
      console.error('Erro ao excluir consignante:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (consignor: ConsignorItem) => {
    setEditingConsignor(consignor);
    setShowForm(true);
  };

  const handleView = (consignor: ConsignorItem) => {
    setViewingConsignor(consignor);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
    setViewingConsignor(undefined);
  };

  const handleEditFromView = () => {
    if (viewingConsignor) {
      setEditingConsignor(viewingConsignor);
      setShowView(false);
      setShowForm(true);
    }
  };

  const handleViewHistory = (consignor: ConsignorItem) => {
    setHistoryConsignor(consignor);
    setShowHistory(true);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
    setHistoryConsignor(undefined);
  };

  const filteredConsignors = consignors.filter(
    (consignor) =>
      consignor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consignor.cpf.includes(searchTerm) ||
      consignor.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Consignantes</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie os consignantes e suas informações bancárias
              </p>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-3'>
              <button
                onClick={() => navigate('/admin/consignantes/adicionar')}
                className='w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                <Plus className='w-4 h-4' />
                Novo Consignante
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar por nome, CPF ou email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setSearchTerm('')}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Consignors Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[700px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[80px]'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Nome
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[160px]'>
                    CPF
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[180px]'>
                    Contato
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Produtos
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700 min-w-[160px]'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {loading ? (
                  <tr>
                    <td colSpan={6} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
                        <p className='font-medium'>Carregando consignantes...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredConsignors.length > 0 ? (
                  filteredConsignors.map((consignor) => (
                    <tr
                      key={consignor.id}
                      className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                    >
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm text-slate-800'>#{consignor.id}</span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm text-slate-800'>{consignor.name}</span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm text-slate-800'>{consignor.cpf}</span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col'>
                          <span className='text-xs sm:text-sm text-slate-800'>
                            {consignor.email}
                          </span>
                          <span className='text-xs text-slate-500'>{consignor.phone}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='flex flex-col items-center gap-1'>
                          <span className='text-xs sm:text-sm text-slate-800'>
                            {consignor.totalProducts || 0}
                          </span>
                          <div className='flex gap-1 text-xs text-slate-500'>
                            <span className='bg-green-100 text-green-700 px-1 rounded'>
                              {consignor.productsForSale || 0} à venda
                            </span>
                            <span className='bg-blue-100 text-blue-700 px-1 rounded'>
                              {consignor.soldProducts || 0} vendidos
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2 justify-center'>
                          <button
                            onClick={() => handleViewHistory(consignor)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Histórico'
                          >
                            <TrendingUp className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleView(consignor)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEdit(consignor)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteConsignor(consignor)}
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
                    <td colSpan={6} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center'>
                          <Plus className='w-8 h-8 text-slate-400' />
                        </div>
                        <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                          Nenhum consignante encontrado
                        </h3>
                        <p className='text-sm sm:text-base text-slate-600'>
                          Tente ajustar os filtros ou criar um novo consignante.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredConsignors.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredConsignors.length} de {consignors.length} consignantes
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <ConsignorForm
          consignor={editingConsignor}
          onSubmit={editingConsignor ? handleUpdateConsignor : handleCreateConsignor}
          onCancel={() => {
            setShowForm(false);
            setEditingConsignor(undefined);
          }}
          isLoading={loading}
        />
      )}

      {/* View Modal */}
      {showView && viewingConsignor && (
        <ConsignorView
          consignor={viewingConsignor}
          onClose={handleCloseView}
          onEdit={handleEditFromView}
        />
      )}

      {/* History Modal */}
      {showHistory && historyConsignor && (
        <ConsignorHistory consignor={historyConsignor} onClose={handleCloseHistory} />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingConsignor}
        title='Excluir Consignante'
        message={`Tem certeza que deseja excluir o consignante "${deletingConsignor?.name}"? Esta ação não pode ser desfeita.`}
        confirmText='Excluir'
        cancelText='Cancelar'
        onConfirm={confirmDelete}
        onCancel={() => setDeletingConsignor(undefined)}
        type='danger'
      />
    </div>
  );
};

export default Consignor;
