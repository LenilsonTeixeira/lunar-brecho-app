import { X, Tag } from 'lucide-react';

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  productCount?: number;
  description?: string;
}

interface CategoryViewProps {
  category: CategoryItem;
  onClose: () => void;
  onEdit?: () => void;
}

const CategoryView = ({ category, onClose, onEdit }: CategoryViewProps) => {
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

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-white'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-3 mb-1'>
                <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                  <Tag className='w-4 h-4 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Categoria #{category.id}</h2>
                  <p className='text-slate-300 text-sm'>{category.name}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='p-4 space-y-4'>
          {/* Imagem da Categoria */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Imagem da Categoria</label>
            </div>
            <div className='flex justify-center'>
              <div className='w-48 h-48 rounded-lg overflow-hidden border-2 border-slate-200 shadow-lg bg-white'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>

          {/* Informações Básicas */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Nome da Categoria</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800'>{category.name}</span>
            </div>
          </div>

          {/* Descrição (se disponível) */}
          {category.description && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Descrição</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800'>{category.description}</p>
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Produtos na Categoria</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800'>{category.productCount || 0} produtos</span>
            </div>
          </div>

          {/* Datas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Data de Criação */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(category.createdAt)}</span>
              </div>
            </div>

            {/* Última Atualização */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(category.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={onClose}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Fechar
              </button>
              <button
                onClick={onEdit || onClose}
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

export default CategoryView;
