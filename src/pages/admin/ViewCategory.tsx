import { ArrowLeft, Tag, Palette, FileText, Image, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { categoryService, ApiError } from '@/services';

interface Category {
  id: string;
  externalId: string;
  name: string;
  color?: string;
  description?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
}

const ViewCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) {
        setError('ID da categoria não fornecido');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const categoryData = await categoryService.getCategory(categoryId);
        setCategory(categoryData);
      } catch (err) {
        console.error('Erro ao buscar categoria:', err);
        if (err instanceof ApiError) {
          switch (err.status) {
            case 404:
              setError('Categoria não encontrada');
              break;
            case 401:
              setError('Não autorizado. Faça login novamente.');
              break;
            default:
              setError('Erro ao carregar categoria. Tente novamente.');
          }
        } else {
          setError('Erro de conexão. Verifique sua internet.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='w-8 h-8 text-purple-600 animate-spin' />
          <p className='text-slate-600'>Carregando categoria...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <AlertCircle className='w-12 h-12 text-red-500' />
            <h2 className='text-xl font-semibold text-slate-800'>Erro</h2>
            <p className='text-slate-600'>{error}</p>
            <div className='flex gap-3 mt-4'>
              <button
                onClick={() => navigate('/admin/categorias')}
                className='px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all duration-300'
              >
                Voltar
              </button>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300'
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <AlertCircle className='w-12 h-12 text-slate-400' />
            <h2 className='text-xl font-semibold text-slate-800'>Categoria não encontrada</h2>
            <p className='text-slate-600'>A categoria solicitada não existe ou foi removida.</p>
            <button
              onClick={() => navigate('/admin/categorias')}
              className='px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 mt-4'
            >
              Voltar às Categorias
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/categorias')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Categoria #{category.externalId}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos da categoria</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome da Categoria
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{category.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cor da Categoria */}
          {category.color && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <Palette className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Cor da Categoria</h3>
              </div>
              <div className='flex items-center gap-4'>
                <div
                  className='w-12 h-12 rounded-lg border-2 border-slate-200 shadow-lg'
                  style={{ backgroundColor: category.color }}
                ></div>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800 font-mono'>{category.color}</span>
                </div>
              </div>
            </div>
          )}

          {/* Imagem da Categoria */}
          {category.imageUrl && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <Image className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Imagem da Categoria</h3>
              </div>
              <div className='flex justify-center'>
                <div className='relative group'>
                  <div className='w-48 h-48 rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-white'>
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-slate-100">
                            <div class="text-center">
                              <svg class="w-12 h-12 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <p class="text-sm text-slate-500">Imagem não disponível</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Descrição */}
          {category.description && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <FileText className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Descrição</h3>
              </div>
              <div className='p-3 bg-white rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{category.description}</span>
              </div>
            </div>
          )}

          {/* Informações Adicionais */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  ID da Categoria
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800 font-mono text-sm'>{category.id}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  ID Externo
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800 font-mono text-sm'>{category.externalId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/categorias')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/categorias/editar/${category.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Categoria
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
