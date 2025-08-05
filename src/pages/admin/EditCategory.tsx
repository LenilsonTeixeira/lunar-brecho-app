import { useState, useEffect } from 'react';
import { Tag, Palette, FileText, Image, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface Category {
  id: number;
  name: string;
  color: string;
  description: string;
  status: 'ativo' | 'inativo';
  priority: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockCategory: Category = {
    id: parseInt(categoryId || '1'),
    name: 'Vestidos',
    color: '#8B5CF6',
    description: 'Categoria para todos os tipos de vestidos, desde casuais até formais.',
    status: 'ativo',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
  };

  const [category] = useState<Category>(mockCategory);
  const [categoryName, setCategoryName] = useState(mockCategory.name);
  const [categoryColor, setCategoryColor] = useState(mockCategory.color);
  const [categoryDescription, setCategoryDescription] = useState(mockCategory.description);
  const [categoryStatus, setCategoryStatus] = useState<'ativo' | 'inativo'>(mockCategory.status);
  const [categoryPriority, setCategoryPriority] = useState(mockCategory.priority);
  const [categoryImage, setCategoryImage] = useState(mockCategory.image || '');

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados da categoria pelo categoryId
    console.log('Carregando categoria:', categoryId);
  }, [categoryId]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!categoryName.trim()) {
      alert('Por favor, preencha o nome da categoria.');
      return;
    }

    if (!categoryColor.trim()) {
      alert('Por favor, selecione uma cor para a categoria.');
      return;
    }

    if (categoryPriority < 1) {
      alert('Por favor, defina uma prioridade válida.');
      return;
    }

    // Simular atualização da categoria
    const updatedCategory = {
      ...category,
      name: categoryName,
      color: categoryColor,
      description: categoryDescription,
      status: categoryStatus,
      priority: categoryPriority,
      image: categoryImage,
    };

    console.log('Categoria atualizada:', updatedCategory);
    alert('Categoria atualizada com sucesso!');

    // Navegar de volta para a lista de categorias
    navigate('/admin/categorias');
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
            Editar Categoria #{category.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações da categoria abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='category-name'>
                  Nome da Categoria *
                </label>
                <input
                  id='category-name'
                  type='text'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder='Digite o nome da categoria'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='category-status'>
                  Status *
                </label>
                <select
                  id='category-status'
                  value={categoryStatus}
                  onChange={(e) => setCategoryStatus(e.target.value as 'ativo' | 'inativo')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='ativo'>Ativa</option>
                  <option value='inativo'>Inativa</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='category-priority'>
                  Prioridade *
                </label>
                <input
                  id='category-priority'
                  type='number'
                  min='1'
                  max='10'
                  value={categoryPriority}
                  onChange={(e) => setCategoryPriority(parseInt(e.target.value) || 1)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Cor da Categoria */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Palette className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Cor da Categoria</h3>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-semibold text-slate-700' htmlFor='category-color'>
                    Selecione a Cor *
                  </label>
                  <input
                    id='category-color'
                    type='color'
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                    className='w-16 h-12 rounded-lg border-2 border-slate-200 cursor-pointer'
                    required
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    className='text-sm font-semibold text-slate-700'
                    htmlFor='category-color-hex'
                  >
                    Código da Cor
                  </label>
                  <input
                    id='category-color-hex'
                    type='text'
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                    placeholder='#8B5CF6'
                    className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white font-mono'
                  />
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-sm text-slate-600'>Preview:</span>
                <div
                  className='w-12 h-12 rounded-lg border-2 border-slate-200'
                  style={{ backgroundColor: categoryColor }}
                ></div>
                <span className='text-sm font-mono text-slate-800'>{categoryColor}</span>
              </div>
            </div>
          </div>

          {/* Imagem da Categoria */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Image className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Imagem da Categoria</h3>
            </div>

            <div className='space-y-4'>
              {categoryImage && (
                <div className='flex justify-center'>
                  <img
                    src={categoryImage}
                    alt='Preview'
                    className='w-48 h-48 rounded-lg object-cover shadow-lg'
                  />
                </div>
              )}

              <div className='flex items-center gap-4'>
                <label className='flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors'>
                  <Image className='w-4 h-4' />
                  Escolher Imagem
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>

                {categoryImage && (
                  <button
                    type='button'
                    onClick={removeImage}
                    className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
                  >
                    Remover Imagem
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Descrição</h3>
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm font-semibold text-slate-700'
                htmlFor='category-description'
              >
                Descrição da Categoria
              </label>
              <textarea
                id='category-description'
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder='Descreva a categoria...'
                rows={4}
                className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Categoria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
