import { useState, useEffect } from 'react';
import { Tag, Image, ArrowLeft, X, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { categoryService } from '@/services/category/CategoryService';
import { CategoryResponse, ApiError } from '@/services/types';

const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryOrderDisplay, setCategoryOrderDisplay] = useState<number | ''>('');
  const [categoryStatus, setCategoryStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [categoryImage, setCategoryImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) {
        setError('ID da categoria não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const categoryData = await categoryService.getCategory(categoryId);
        setCategory(categoryData);
        setCategoryName(categoryData.name);
        setCategoryOrderDisplay(categoryData.orderDisplay ?? '');
        setCategoryStatus(categoryData.status || 'ACTIVE');
        setCategoryImage(categoryData.imageUrl || '');
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 404) {
            setError('Categoria não encontrada');
          } else if (err.status === 401) {
            setError('Não autorizado. Faça login novamente.');
            navigate('/admin/login');
          } else {
            setError(err.message || 'Erro ao carregar categoria');
          }
        } else {
          setError('Erro inesperado ao carregar categoria');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, navigate]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCategoryImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCategoryImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      setError('ID da categoria não fornecido');
      return;
    }

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!categoryName.trim()) {
      setError('Por favor, preencha o nome da categoria.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // 1. Update category first
      const updateData = {
        name: categoryName.trim(),
        orderDisplay: categoryOrderDisplay !== '' ? Number(categoryOrderDisplay) : undefined,
        status: categoryStatus,
      };

      await categoryService.updateCategory(categoryId, updateData);

      // 2. Upload new image if provided (synchronously after update)
      if (categoryImage && categoryImage.startsWith('data:')) {
        // Converter data URL para File
        const response = await fetch(categoryImage);
        const blob = await response.blob();
        const file = new File([blob], 'category-image.jpg', { type: 'image/jpeg' });
        await categoryService.uploadCategoryImage(categoryId, file);
      }

      navigate('/admin/categorias');
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError('Não autorizado. Faça login novamente.');
          navigate('/admin/login');
        } else if (err.status === 404) {
          setError('Categoria não encontrada');
        } else if (err.status === 400) {
          setError('Dados inválidos. Verifique os campos preenchidos.');
        } else {
          setError(err.message || 'Erro ao atualizar categoria');
        }
      } else {
        setError('Erro inesperado ao atualizar categoria');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='flex items-center gap-3'>
          <Loader2 className='w-6 h-6 animate-spin text-purple-600' />
          <span className='text-lg text-slate-600'>Carregando categoria...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <X className='w-8 h-8 text-red-600' />
            </div>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>Erro</h2>
            <p className='text-slate-600 mb-6'>{error}</p>
            <div className='flex gap-3'>
              <button
                onClick={() => navigate('/admin/categorias')}
                className='flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors'
              >
                Voltar
              </button>
              <button
                onClick={() => window.location.reload()}
                className='flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50 min-h-screen'>
      <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
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
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Editar Categoria {category?.externalId ? `#${category.externalId}` : ''}
          </h1>
          <p className='text-base text-slate-600'>Modifique as informações da categoria abaixo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
              <div className='flex items-center gap-2'>
                <X className='w-5 h-5 text-red-600' />
                <span className='text-red-800 font-medium'>Erro</span>
              </div>
              <p className='text-red-700 mt-1'>{error}</p>
            </div>
          )}
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='category-name'>
                  Nome da Categoria *
                </label>
                <input
                  id='category-name'
                  type='text'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder='Digite o nome da categoria'
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='category-status'>
                  Status *
                </label>
                <select
                  id='category-status'
                  value={categoryStatus}
                  onChange={(e) => setCategoryStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='ACTIVE'>Ativa</option>
                  <option value='INACTIVE'>Inativa</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='category-order-display'
                >
                  Ordem de Exibição
                </label>
                <input
                  id='category-order-display'
                  type='number'
                  min='0'
                  step='1'
                  value={categoryOrderDisplay}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCategoryOrderDisplay(value === '' ? '' : parseInt(value) || '');
                  }}
                  placeholder='Digite a ordem de exibição'
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
                <p className='text-xs text-slate-500'>
                  Números menores aparecem primeiro. Deixe vazio para ordem padrão.
                </p>
              </div>
            </div>
          </div>

          {/* Imagem da Categoria */}
          <div>
            <label className='text-sm font-medium text-slate-700 mb-3 block'>
              Imagem da Categoria
            </label>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {/* Imagem Principal */}
              <div className='relative group'>
                <label htmlFor='category-image' className='cursor-pointer block'>
                  <input
                    accept='image/*'
                    type='file'
                    id='category-image'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                  {categoryImage ? (
                    <div className='aspect-square rounded-lg overflow-hidden border-2 border-purple-400 shadow-lg group-hover:shadow-xl transition-all duration-300'>
                      <img
                        src={categoryImage}
                        alt='Imagem da Categoria'
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            'https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Erro+Imagem';
                        }}
                      />
                      <div className='absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center'>
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
                            <Image className='w-4 h-4 text-purple-600' />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='aspect-square border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center bg-purple-50 group-hover:border-purple-500 group-hover:bg-purple-100 transition-all duration-300'>
                      <div className='text-center'>
                        <div className='w-8 h-8 mx-auto mb-2 bg-purple-200 rounded-full flex items-center justify-center group-hover:bg-purple-300 transition-colors'>
                          <svg
                            className='w-4 h-4 text-purple-600 group-hover:text-purple-700'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                          </svg>
                        </div>
                        <p className='text-xs text-purple-600 group-hover:text-purple-700 font-medium'>
                          Imagem da Categoria
                        </p>
                      </div>
                    </div>
                  )}
                </label>
                {categoryImage && (
                  <button
                    type='button'
                    onClick={removeImage}
                    className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg'
                  >
                    <X className='w-3 h-3' />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Descrição removida */}

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={saving}
              className='w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
            >
              {saving ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Atualizando...
                </>
              ) : (
                'Atualizar Categoria'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
