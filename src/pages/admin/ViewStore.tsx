import { ArrowLeft, Store, Mail, Phone, MapPin, Globe, Facebook, Instagram } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { storeService } from '@/services/store/StoreService';
import { ApiError, StoreResponse } from '@/services/types';

const ViewStore = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [store, setStore] = useState<StoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      if (!storeId) {
        setError('ID da loja não fornecido');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const storeData = await storeService.getStore(storeId);
        setStore(storeData);
      } catch (err) {
        console.error('Erro ao buscar loja:', err);
        if (err instanceof ApiError) {
          switch (err.status) {
            case 404:
              setError('Loja não encontrada');
              break;
            case 401:
              setError('Não autorizado. Faça login novamente.');
              break;
            default:
              setError('Erro ao carregar loja. Tente novamente.');
          }
        } else {
          setError('Erro de conexão. Verifique sua internet.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  if (isLoading) {
    return (
      <div className='py-6 flex items-center justify-center bg-slate-50 min-h-screen'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-slate-600 font-medium'>Carregando loja...</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className='py-6 flex flex-col justify-between bg-slate-50'>
        <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
            <p className='text-red-800'>{error || 'Loja não encontrada'}</p>
            <button
              onClick={() => navigate('/admin/lojas')}
              className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              Voltar para Lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/lojas')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>{store.name}</h1>
          <p className='text-base text-slate-600'>Detalhes da loja</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Store className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <p className='text-sm font-medium text-slate-600 mb-1'>Nome</p>
                <p className='text-base text-slate-900'>{store.name}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-slate-600 mb-1'>Slug</p>
                <p className='text-base text-slate-900 font-mono'>{store.slug}</p>
              </div>
              {store.description && (
                <div className='md:col-span-2'>
                  <p className='text-sm font-medium text-slate-600 mb-1'>Descrição</p>
                  <p className='text-base text-slate-900'>{store.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contato */}
          {(store.email || store.phone || store.website) && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Contato</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {store.email && (
                  <div className='flex items-center gap-3'>
                    <Mail className='w-5 h-5 text-purple-600' />
                    <div>
                      <p className='text-sm font-medium text-slate-600'>Email</p>
                      <p className='text-base text-slate-900'>{store.email}</p>
                    </div>
                  </div>
                )}
                {store.phone && (
                  <div className='flex items-center gap-3'>
                    <Phone className='w-5 h-5 text-purple-600' />
                    <div>
                      <p className='text-sm font-medium text-slate-600'>Telefone</p>
                      <p className='text-base text-slate-900'>{store.phone}</p>
                    </div>
                  </div>
                )}
                {store.website && (
                  <div className='flex items-center gap-3'>
                    <Globe className='w-5 h-5 text-purple-600' />
                    <div>
                      <p className='text-sm font-medium text-slate-600'>Website</p>
                      <a
                        href={store.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-base text-purple-600 hover:text-purple-700 underline'
                      >
                        {store.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Endereço */}
          {(store.address || store.city || store.state || store.zip) && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereço</h3>
              </div>
              <div className='space-y-2'>
                {store.address && <p className='text-base text-slate-900'>{store.address}</p>}
                <div className='flex gap-2 text-base text-slate-900'>
                  {store.city && <span>{store.city}</span>}
                  {store.state && <span>- {store.state}</span>}
                  {store.zip && <span>- {store.zip}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Redes Sociais */}
          {(store.facebook || store.instagram) && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Redes Sociais</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {store.facebook && (
                  <div className='flex items-center gap-3'>
                    <Facebook className='w-5 h-5 text-purple-600' />
                    <a
                      href={store.facebook}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-base text-purple-600 hover:text-purple-700 underline'
                    >
                      {store.facebook}
                    </a>
                  </div>
                )}
                {store.instagram && (
                  <div className='flex items-center gap-3'>
                    <Instagram className='w-5 h-5 text-purple-600' />
                    <a
                      href={store.instagram}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-base text-purple-600 hover:text-purple-700 underline'
                    >
                      {store.instagram}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Configurações */}
          {store.config && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Configurações</h3>
              <div>
                <p className='text-sm font-medium text-slate-600 mb-1'>Chave PIX</p>
                <p className='text-base text-slate-900 font-mono'>{store.config.pixKey}</p>
              </div>
            </div>
          )}

          {/* Informações do Sistema */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Informações do Sistema</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-slate-600 mb-1'>Criado em</p>
                <p className='text-base text-slate-900'>{formatDate(store.createdAt)}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-slate-600 mb-1'>Atualizado em</p>
                <p className='text-base text-slate-900'>{formatDate(store.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/lojas')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-base text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/lojas/editar/${store.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-base text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Loja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStore;
