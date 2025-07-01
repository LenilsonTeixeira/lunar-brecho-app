import { useState } from 'react';
import { X } from 'lucide-react';

const AddCategory = () => {
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCategoryImage(null);
    setPreviewImage('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implementar lógica de envio do formulário
    console.log('Categoria a ser adicionada:', {
      name: (event.target as HTMLFormElement).categoryName.value,
      image: categoryImage,
    });
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
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
          {/* Category Image */}
          <div>
            <label className='text-sm sm:text-base font-semibold text-slate-700 mb-3 block'>
              Imagem da Categoria
            </label>

            <div className='flex justify-center'>
              <label htmlFor='category-image' className='cursor-pointer group'>
                <input
                  accept='image/*'
                  type='file'
                  id='category-image'
                  className='hidden'
                  onChange={handleImageChange}
                  required
                />
                {previewImage ? (
                  <div className='relative group'>
                    <div className='w-56 h-56 rounded-xl overflow-hidden border-2 border-purple-400 shadow-lg bg-white'>
                      <img
                        src={previewImage}
                        alt='Preview da categoria'
                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                      {/* Overlay com ações */}
                      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center'>
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2'>
                          <button
                            type='button'
                            onClick={removeImage}
                            className='p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg'
                            aria-label='Remover imagem'
                          >
                            <X className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Indicador de sucesso */}
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg'>
                      <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className='w-48 h-48 border-2 border-dashed border-purple-400 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 group-hover:border-purple-500 group-hover:from-purple-100 group-hover:to-pink-100 transition-all duration-300 shadow-sm group-hover:shadow-md'>
                    <div className='text-center'>
                      <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 shadow-inner'>
                        <svg
                          className='w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <p className='text-sm font-semibold text-purple-700 group-hover:text-purple-800 transition-colors duration-300'>
                        Adicionar Imagem
                      </p>
                      <p className='text-xs text-purple-500 mt-1 group-hover:text-purple-600 transition-colors duration-300'>
                        Clique para selecionar
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Category Name */}
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

          {/* Category Color (Optional) */}
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
