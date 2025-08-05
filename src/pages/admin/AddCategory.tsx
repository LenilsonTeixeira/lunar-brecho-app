import { useState } from 'react';
import { X, ArrowLeft, Image } from 'lucide-react';
import { useNavigate } from 'react-router';

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryImage, setCategoryImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCategoryImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCategoryImage('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implementar lógica de envio do formulário
    console.log('Categoria a ser adicionada:', {
      name: (event.target as HTMLFormElement).categoryName.value,
      image: categoryImage,
      color: (event.target as HTMLFormElement).categoryColor.value,
      description: (event.target as HTMLFormElement).categoryDescription.value,
    });
  };

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
            Adicionar Categoria
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações da categoria abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Imagem da Categoria */}
          <div>
            <label className='text-sm sm:text-base font-semibold text-slate-700 mb-3 block'>
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
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center'>
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

          {/* Category Name and Color - Side by side on larger screens */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='categoryName'
              >
                Nome da Categoria
              </label>
              <input
                id='categoryName'
                name='categoryName'
                type='text'
                placeholder='Digite o nome da categoria'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='category-color'
              >
                Cor da Categoria
              </label>
              <div className='flex items-center gap-4'>
                <input
                  id='category-color'
                  name='categoryColor'
                  type='color'
                  className='w-16 h-12 rounded-lg border border-slate-200 cursor-pointer'
                  defaultValue='#8b5cf6'
                />
                <span className='text-xs text-slate-500'>
                  Escolha uma cor para identificar a categoria
                </span>
              </div>
            </div>
          </div>

          {/* Category Description */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='category-description'
            >
              Descrição da Categoria
            </label>
            <textarea
              id='category-description'
              name='categoryDescription'
              rows={4}
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none bg-white'
              placeholder='Digite uma descrição para a categoria'
            ></textarea>
          </div>

          {/* Category Status */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='category-status'
            >
              Status da Categoria
            </label>
            <select
              id='category-status'
              name='categoryStatus'
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
            >
              <option value='active'>Ativa</option>
              <option value='inactive'>Inativa</option>
            </select>
          </div>

          {/* Category Priority */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='category-priority'
            >
              Prioridade de Exibição
            </label>
            <input
              id='category-priority'
              name='categoryPriority'
              type='number'
              min='1'
              max='100'
              placeholder='1'
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
            />
            <span className='text-xs text-slate-500'>
              Número de 1 a 100 para definir a ordem de exibição (1 = maior prioridade)
            </span>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Adicionar Categoria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
