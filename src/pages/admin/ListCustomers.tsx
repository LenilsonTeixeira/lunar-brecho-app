import { useEffect, useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { customerService, ApiError, CustomerResponse, CustomerListResponse } from '@/services';

const ListCustomers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    loadCustomers();
  }, [currentPage]);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: CustomerListResponse = await customerService.getCustomers(currentPage, 10);
      setCustomers(res.content);
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
      if (err instanceof ApiError) setError(err.message);
      else setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = customers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm) ||
      (user.addresses &&
        user.addresses.some((a) =>
          `${a.street || ''} ${a.number || ''} ${a.neighborhood || ''} ${a.city || ''}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        ));

    return matchesSearch;
  });

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Clientes</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie o cadastro de clientes da sua loja
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/clientes/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Adicionar Cliente
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
                placeholder='Buscar clientes...'
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

        {/* Error */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
            <p className='text-sm text-red-700'>{error}</p>
          </div>
        )}

        {/* Users Table */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Cliente
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Telefone
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Endereço
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {loading && (
                  <tr>
                    <td colSpan={4} className='py-12 text-center text-slate-500'>
                      Carregando...
                    </td>
                  </tr>
                )}
                {!loading &&
                  filteredUsers.length > 0 &&
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div>
                            <p className='text-xs sm:text-sm font-medium text-slate-800'>
                              {user.name}
                            </p>
                            <p className='text-xs text-slate-500'>ID: {user.externalId}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 text-xs sm:text-sm text-slate-700'>{user.phone}</td>
                      <td className='px-6 py-4'>
                        <p className='text-xs sm:text-sm text-slate-700 max-w-xs truncate'>
                          {user.addresses && user.addresses[0]
                            ? `${user.addresses[0].street || ''}, ${user.addresses[0].number || ''} - ${user.addresses[0].neighborhood || ''}, ${user.addresses[0].city || ''}`
                            : '—'}
                        </p>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2'>
                          <button
                            onClick={() => navigate(`/admin/clientes/visualizar/${user.id}`)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/clientes/editar/${user.id}`)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                            title='Excluir'
                          >
                            <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {!loading && filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className='py-12 text-center text-slate-500'>
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Search className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                Nenhum cliente encontrado
              </h3>
              <p className='text-sm sm:text-base text-slate-600'>
                Tente ajustar os filtros ou adicionar um novo cliente.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Página {currentPage + 1} de {totalPages} ({totalElements} clientes)
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Anterior
              </button>
              <span className='px-2 sm:px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-lg'>
                {currentPage + 1}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage >= totalPages - 1}
                className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCustomers;
