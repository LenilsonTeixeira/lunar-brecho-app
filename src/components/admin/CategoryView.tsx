import { X, Calendar, Image as ImageIcon, Tag } from 'lucide-react';

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
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-800'>Detalhes da Categoria</h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-slate-600' />
            </button>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* Imagem da Categoria */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <ImageIcon className='w-5 h-5 text-slate-600' />
              <h3 className='text-sm font-semibold text-slate-700'>Imagem da Categoria</h3>
            </div>
            <div className='flex justify-center'>
              <div className='w-64 h-64 rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg bg-white'>
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
              <Tag className='w-4 h-4 text-slate-600' />
              <label className='text-sm font-semibold text-slate-700'>Nome da Categoria</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800 font-medium'>{category.name}</span>
            </div>
          </div>

          {/* Descrição (se disponível) */}
          {category.description && (
            <div>
              <label className='text-sm font-semibold text-slate-700 mb-2 block'>Descrição</label>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800'>{category.description}</p>
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <div>
            <label className='text-sm font-semibold text-slate-700 mb-2 block'>
              Produtos na Categoria
            </label>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800 font-medium'>
                {category.productCount || 0} produtos
              </span>
            </div>
          </div>

          {/* Datas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Data de Criação */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(category.createdAt)}</span>
              </div>
            </div>

            {/* Última Atualização */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(category.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='flex gap-4 pt-4 border-t border-slate-200'>
            <button
              onClick={onClose}
              className='flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Fechar
            </button>
            <button
              onClick={onEdit || onClose}
              className='flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300'
            >
              Editar Categoria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
