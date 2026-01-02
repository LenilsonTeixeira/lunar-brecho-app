import { useState } from 'react';
import { X, ArrowLeft, Image } from 'lucide-react';
import { useNavigate } from 'react-router';
import { categoryService } from '@/services/category/CategoryService';
import { ApiError } from '@/services/types';

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryImage, setCategoryImage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
    setSelectedFile(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = event.target as HTMLFormElement;

      // Definir status automaticamente: INACTIVE se não houver imagem, ACTIVE se houver
      const hasImage = selectedFile !== null;
      const status: 'ACTIVE' | 'INACTIVE' = hasImage ? 'ACTIVE' : 'INACTIVE';

      const orderDisplayInput = formData.querySelector(
        '[name="categoryOrderDisplay"]',
      ) as HTMLInputElement;
      const orderDisplayValue = orderDisplayInput?.value
        ? parseInt(orderDisplayInput.value)
        : undefined;

      const categoryData = {
        name: formData.categoryName.value,
        orderDisplay: orderDisplayValue,
        status: status,
      };

      // Criar a categoria
      const response = await categoryService.createCategory(categoryData);

      // Upload da imagem se foi selecionada
      if (selectedFile) {
        await categoryService.uploadCategoryImage(response.id, selectedFile);
      }

      // Redirecionar para a lista de categorias
      navigate('/admin/categorias');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao criar categoria: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Adicionar Categoria</h1>
          <p className='text-base text-slate-600'>Preencha as informações da categoria abaixo</p>
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

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
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

          {/* Category Name */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-slate-700' htmlFor='categoryName'>
              Nome da Categoria
            </label>
            <input
              id='categoryName'
              name='categoryName'
              type='text'
              placeholder='Digite o nome da categoria'
              className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
              required
            />
          </div>

          {/* Order Display */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-slate-700' htmlFor='category-order-display'>
              Ordem de Exibição
            </label>
            <input
              id='category-order-display'
              name='categoryOrderDisplay'
              type='number'
              min='0'
              step='1'
              placeholder='Digite a ordem de exibição'
              className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
            />
            <p className='text-xs text-slate-500'>
              Números menores aparecem primeiro. Deixe vazio para ordem padrão.
            </p>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Criando Categoria...
                </div>
              ) : (
                'Adicionar Categoria'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
