import { ArrowLeft, Tag, Palette, FileText, Image } from 'lucide-react';
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

const ViewCategory = () => {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-300 text-slate-950';
      case 'inativo':
        return 'bg-red-300 text-slate-950';
      default:
        return 'bg-slate-300 text-slate-950';
    }
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
            Categoria #{mockCategory.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos da categoria</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Status da Categoria */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status da Categoria</h3>
            </div>
            <div className='flex items-center justify-between'>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(mockCategory.status)}`}
              >
                {mockCategory.status === 'ativo' ? 'Ativa' : 'Inativa'}
              </span>
            </div>
          </div>

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
                  <span className='text-slate-800'>{mockCategory.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cor da Categoria */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Palette className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Cor da Categoria</h3>
            </div>
            <div className='flex items-center gap-4'>
              <div
                className='w-12 h-12 rounded-lg border-2 border-slate-200 shadow-lg'
                style={{ backgroundColor: mockCategory.color }}
              ></div>
              <div className='p-3 bg-white rounded-lg border border-slate-200'>
                <span className='text-slate-800 font-mono'>{mockCategory.color}</span>
              </div>
            </div>
          </div>

          {/* Imagem da Categoria */}
          {mockCategory.image && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <Image className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Imagem da Categoria</h3>
              </div>
              <div className='flex justify-center'>
                <div className='relative group'>
                  <div className='aspect-square rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300'>
                    <img
                      src={mockCategory.image}
                      alt={mockCategory.name}
                      className='w-48 h-48 object-cover'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg'>
                          <Image className='w-4 h-4 text-purple-600' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Descrição */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Descrição</h3>
            </div>
            <div className='p-3 bg-white rounded-lg border border-slate-200'>
              <span className='text-slate-800'>{mockCategory.description}</span>
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Criação
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockCategory.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockCategory.updatedAt)}</span>
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
                onClick={() => navigate(`/admin/categorias/editar/${mockCategory.id}`)}
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
