import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  color?: string;
  description?: string;
  orderDisplay?: number;
  image: string;
}

interface CategoryFormData {
  name: string;
  color: string;
  description: string;
  orderDisplay: number | '';
  image: File | null;
  previewImage: string;
}

interface CategoryFormProps {
  category?: CategoryItem;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CategoryForm = ({ category, onSubmit, onCancel, isLoading = false }: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    color: '#8B5CF6',
    description: '',
    orderDisplay: '',
    image: null,
    previewImage: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        color: category.color || '#8B5CF6',
        description: category.description || '',
        orderDisplay: category.orderDisplay ?? '',
        image: null,
        previewImage: category.image,
      });
    }
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!category && !formData.image && !formData.previewImage) {
      newErrors.image = 'Imagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof CategoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('image', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('previewImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleInputChange('image', null);
    handleInputChange('previewImage', '');
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-800'>
              {category ? 'Editar Categoria' : 'Criar Nova Categoria'}
            </h2>
            <button
              onClick={onCancel}
              className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-slate-600' />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Imagem da Categoria */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-3 block'>
              Imagem da Categoria {!category && '*'}
            </label>

            <div className='flex justify-center'>
              <label htmlFor='category-image' className='cursor-pointer group'>
                <input
                  accept='image/*'
                  type='file'
                  id='category-image'
                  className='hidden'
                  onChange={handleImageChange}
                  required={!category}
                />
                {formData.previewImage ? (
                  <div className='relative group'>
                    <div className='w-48 h-48 rounded-xl overflow-hidden border-2 border-purple-400 shadow-lg bg-white'>
                      <img
                        src={formData.previewImage}
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
                  </div>
                ) : (
                  <div className='w-48 h-48 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors duration-300'>
                    <div className='w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3'>
                      <svg
                        className='w-6 h-6 text-slate-400'
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
                    <p className='text-sm text-slate-500 text-center'>
                      Clique para selecionar uma imagem
                    </p>
                  </div>
                )}
              </label>
            </div>
            {errors.image && <p className='text-red-500 text-sm mt-1'>{errors.image}</p>}
          </div>

          {/* Nome da Categoria */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>
              Nome da Categoria *
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
              }`}
              placeholder='Digite o nome da categoria'
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
          </div>

          {/* Cor da Categoria (Opcional) */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>
              Cor da Categoria
            </label>
            <div className='flex items-center gap-4'>
              <input
                type='color'
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className='w-16 h-12 rounded-lg border border-slate-200 cursor-pointer'
              />
              <span className='text-sm text-slate-500'>
                Escolha uma cor para identificar a categoria
              </span>
            </div>
          </div>

          {/* Ordem de Exibição */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>
              Ordem de Exibição
            </label>
            <input
              type='number'
              value={formData.orderDisplay}
              onChange={(e) =>
                handleInputChange(
                  'orderDisplay',
                  e.target.value === '' ? '' : parseInt(e.target.value) || '',
                )
              }
              className={`w-full py-3 px-4 rounded-lg border transition-all duration-300 ${
                errors.orderDisplay
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
              }`}
              placeholder='Digite a ordem de exibição (menor número aparece primeiro)'
              min='0'
              step='1'
            />
            <p className='text-xs text-slate-500 mt-1'>
              Números menores aparecem primeiro. Deixe vazio para ordem padrão.
            </p>
            {errors.orderDisplay && (
              <p className='text-red-500 text-sm mt-1'>{errors.orderDisplay}</p>
            )}
          </div>

          {/* Botões */}
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <button
              type='button'
              onClick={onCancel}
              className='w-full sm:flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Salvando...' : category ? 'Atualizar Categoria' : 'Criar Categoria'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
