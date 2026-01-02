import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Plus, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { storeService } from '@/services/store/StoreService';
import { ApiError, StoreResponse } from '@/services/types';

const ListStore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await storeService.getStores();
      setStores(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Erro ao carregar lojas:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao carregar lojas: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (store.email && store.email.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const handleViewStore = (store: StoreResponse) => {
    navigate(`/admin/lojas/visualizar/${store.id}`);
  };

  const handleEditStore = (store: StoreResponse) => {
    navigate(`/admin/lojas/editar/${store.id}`);
  };

  const handleDeleteStore = async (store: StoreResponse) => {
    if (window.confirm(`Tem certeza que deseja excluir a loja "${store.name}"?`)) {
      setLoading(true);
      setError(null);
      try {
        await storeService.deleteStore(store.id);
        await loadStores();
      } catch (error) {
        console.error('Erro ao excluir loja:', error);
        if (error instanceof ApiError) {
          setError(`Erro ao excluir loja: ${error.message}`);
        } else {
          setError('Erro de conexão. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900 mb-2'>Lojas</h1>
              <p className='text-base text-slate-600'>Gerencie as lojas do sistema</p>
            </div>
            <button
              onClick={() => navigate('/admin/lojas/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Adicionar Loja
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg className='h-5 w-5 text-red-400' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-800'>{error}</p>
              </div>
              <div className='ml-auto pl-3'>
                <button onClick={() => setError(null)} className='text-red-400 hover:text-red-600'>
                  <span className='sr-only'>Fechar</span>
                  <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar lojas...'
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

        {/* Stores Table */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Loja</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Slug</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Contato
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Criado em
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
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
                        <p className='font-medium'>Carregando lojas...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <tr
                      key={store.id}
                      className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          {store.logo ? (
                            <img
                              src={store.logo}
                              alt={store.name}
                              className='w-12 h-12 rounded-lg object-cover'
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className='w-12 h-12 rounded-lg bg-purple-100 border-2 border-purple-300 flex items-center justify-center'>
                              <FolderOpen className='w-6 h-6 text-purple-400' />
                            </div>
                          )}
                          <div>
                            <p className='text-sm font-medium text-slate-900'>{store.name}</p>
                            {store.description && (
                              <p className='text-xs text-slate-500 truncate max-w-xs'>
                                {store.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm text-slate-900 font-mono'>{store.slug}</span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='space-y-1'>
                          {store.email && <p className='text-sm text-slate-900'>{store.email}</p>}
                          {store.phone && <p className='text-xs text-slate-600'>{store.phone}</p>}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm text-slate-900'>
                          {formatDate(store.createdAt)}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2'>
                          <button
                            onClick={() => handleViewStore(store)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEditStore(store)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteStore(store)}
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
                          <FolderOpen className='w-8 h-8 text-slate-400' />
                        </div>
                        <h3 className='text-lg font-semibold text-slate-800 mb-2'>
                          Nenhuma loja encontrada
                        </h3>
                        <p className='text-base text-slate-600'>
                          Tente ajustar os filtros ou criar uma nova loja.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredStores.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredStores.length} de {stores.length} lojas
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListStore;
