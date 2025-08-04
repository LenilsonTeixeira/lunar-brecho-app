import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import SupplierForm from '../../components/admin/SupplierForm';
import SupplierView from '../../components/admin/SupplierView';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

interface SupplierItem {
  id: number;
  name: string;
  type: 'individual' | 'company';
  document: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  productCount?: number;
}

interface SupplierFormData {
  name: string;
  type: 'individual' | 'company';
  document: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  website: string;
  notes: string;
  status: 'active' | 'inactive';
}

const Supplier = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierItem | undefined>();
  const [viewingSupplier, setViewingSupplier] = useState<SupplierItem | undefined>();
  const [deletingSupplier, setDeletingSupplier] = useState<SupplierItem | undefined>();
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([
    {
      id: 1,
      name: 'Maria Silva',
      type: 'individual',
      document: '123.456.789-00',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      contactPerson: 'Maria Silva',
      website: '',
      notes: 'Fornecedora de roupas usadas em bom estado',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      productCount: 45,
    },
    {
      id: 2,
      name: 'Brechó do João',
      type: 'company',
      document: '12.345.678/0001-90',
      email: 'contato@brechodojao.com.br',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      contactPerson: 'João Santos',
      website: 'www.brechodojao.com.br',
      notes: 'Brechó parceiro com produtos de qualidade',
      status: 'active',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-18T16:20:00Z',
      productCount: 78,
    },
    {
      id: 3,
      name: 'Ana Costa',
      type: 'individual',
      document: '987.654.321-00',
      email: 'ana.costa@email.com',
      phone: '(11) 77777-7777',
      address: 'Rua Augusta, 500',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01212-000',
      contactPerson: 'Ana Costa',
      website: '',
      notes: 'Fornecedora de acessórios e bolsas',
      status: 'active',
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-19T13:30:00Z',
      productCount: 32,
    },
    {
      id: 4,
      name: 'Moda Sustentável Ltda',
      type: 'company',
      document: '98.765.432/0001-10',
      email: 'vendas@modasustentavel.com.br',
      phone: '(11) 66666-6666',
      address: 'Rua Oscar Freire, 200',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-000',
      contactPerson: 'Carlos Oliveira',
      website: 'www.modasustentavel.com.br',
      notes: 'Empresa especializada em roupas sustentáveis',
      status: 'active',
      createdAt: '2024-01-08T08:45:00Z',
      updatedAt: '2024-01-17T15:10:00Z',
      productCount: 56,
    },
    {
      id: 5,
      name: 'Pedro Mendes',
      type: 'individual',
      document: '111.222.333-44',
      email: 'pedro.mendes@email.com',
      phone: '(11) 55555-5555',
      address: 'Rua 13 de Maio, 300',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01327-000',
      contactPerson: 'Pedro Mendes',
      website: '',
      notes: 'Fornecedor de calçados usados',
      status: 'inactive',
      createdAt: '2024-01-05T12:20:00Z',
      updatedAt: '2024-01-16T10:55:00Z',
      productCount: 18,
    },
    {
      id: 6,
      name: 'Fashion Outlet',
      type: 'company',
      document: '11.222.333/0001-44',
      email: 'compras@fashionoutlet.com.br',
      phone: '(11) 44444-4444',
      address: 'Rua 25 de Março, 100',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01021-000',
      contactPerson: 'Fernanda Lima',
      website: 'www.fashionoutlet.com.br',
      notes: 'Outlet de roupas com preços competitivos',
      status: 'active',
      createdAt: '2024-01-03T14:30:00Z',
      updatedAt: '2024-01-15T11:25:00Z',
      productCount: 89,
    },
    {
      id: 7,
      name: 'Lucia Ferreira',
      type: 'individual',
      document: '555.666.777-88',
      email: 'lucia.ferreira@email.com',
      phone: '(11) 33333-3333',
      address: 'Rua Teodoro Sampaio, 150',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05406-000',
      contactPerson: 'Lucia Ferreira',
      website: '',
      notes: 'Fornecedora de vestidos de festa',
      status: 'active',
      createdAt: '2024-01-01T16:00:00Z',
      updatedAt: '2024-01-14T09:40:00Z',
      productCount: 23,
    },
    {
      id: 8,
      name: 'Vintage Collection',
      type: 'company',
      document: '55.666.777/0001-88',
      email: 'contato@vintagecollection.com.br',
      phone: '(11) 22222-2222',
      address: 'Rua Harmonia, 400',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05435-000',
      contactPerson: 'Roberto Silva',
      website: 'www.vintagecollection.com.br',
      notes: 'Especializada em peças vintage',
      status: 'active',
      createdAt: '2024-01-07T13:45:00Z',
      updatedAt: '2024-01-13T17:15:00Z',
      productCount: 67,
    },
  ]);

  const handleCreateSupplier = async (data: SupplierFormData) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newSupplier: SupplierItem = {
        id: Math.max(...suppliers.map((s) => s.id)) + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        productCount: 0,
      };

      setSuppliers((prev) => [...prev, newSupplier]);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSupplier = async (data: SupplierFormData) => {
    if (!editingSupplier) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedSupplier: SupplierItem = {
        ...editingSupplier,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      setSuppliers((prev) =>
        prev.map((sup) => (sup.id === editingSupplier.id ? updatedSupplier : sup)),
      );
      setShowForm(false);
      setEditingSupplier(undefined);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = (supplier: SupplierItem) => {
    setDeletingSupplier(supplier);
  };

  const confirmDelete = async () => {
    if (!deletingSupplier) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuppliers((prev) => prev.filter((sup) => sup.id !== deletingSupplier.id));
      setDeletingSupplier(undefined);
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier: SupplierItem) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleView = (supplier: SupplierItem) => {
    setViewingSupplier(supplier);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
    setViewingSupplier(undefined);
  };

  const handleEditFromView = () => {
    if (viewingSupplier) {
      setEditingSupplier(viewingSupplier);
      setShowView(false);
      setShowForm(true);
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.document.includes(searchTerm) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Fornecedores</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie os fornecedores da sua loja
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/fornecedores/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Novo Fornecedor
            </button>
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
                placeholder='Buscar fornecedores...'
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

        {/* Suppliers Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[600px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[80px]'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Nome/Razão Social
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[150px]'>
                    Documento
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Contato
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {loading ? (
                  <tr>
                    <td colSpan={5} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
                        <p className='font-medium'>Carregando fornecedores...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                    >
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          #{supplier.id}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {supplier.name}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm text-slate-600'>
                          {supplier.document}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex flex-col'>
                          <span className='text-xs sm:text-sm text-slate-600'>
                            {supplier.email}
                          </span>
                          <span className='text-xs text-slate-500'>{supplier.phone}</span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2 justify-center'>
                          <button
                            onClick={() => handleView(supplier)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEdit(supplier)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteSupplier(supplier)}
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
                    <td colSpan={5} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center'>
                          <Building2 className='w-8 h-8 text-slate-400' />
                        </div>
                        <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                          Nenhum fornecedor encontrado
                        </h3>
                        <p className='text-sm sm:text-base text-slate-600'>
                          Tente ajustar os filtros ou criar um novo fornecedor.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredSuppliers.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredSuppliers.length} de {suppliers.length} fornecedores
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <SupplierForm
          supplier={editingSupplier}
          onSubmit={editingSupplier ? handleUpdateSupplier : handleCreateSupplier}
          onCancel={() => {
            setShowForm(false);
            setEditingSupplier(undefined);
          }}
          isLoading={loading}
        />
      )}

      {/* View Modal */}
      {showView && viewingSupplier && (
        <SupplierView
          supplier={viewingSupplier}
          onClose={handleCloseView}
          onEdit={handleEditFromView}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingSupplier}
        title='Excluir Fornecedor'
        message={`Tem certeza que deseja excluir o fornecedor "${deletingSupplier?.name}"? Esta ação não pode ser desfeita.`}
        confirmText='Excluir'
        cancelText='Cancelar'
        onConfirm={confirmDelete}
        onCancel={() => setDeletingSupplier(undefined)}
        type='danger'
      />
    </div>
  );
};

export default Supplier;
