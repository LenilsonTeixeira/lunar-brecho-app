import { X, Package } from 'lucide-react';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  color?: string;
  type: 'novo' | 'bazar';
  price: number;
  offerPrice: number;
  totalQuantity: number;
  status: 'ativo' | 'inativo' | 'fora_de_estoque';
  sizes: Array<{
    size: string;
    quantity: number;
  }>;
  mainImage: string;
  description?: string;
  observations?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductViewProps {
  product: ProductItem;
  onClose: () => void;
  onEdit: () => void;
}

const ProductView = ({ product, onClose, onEdit }: ProductViewProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
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

  const getTypeLabel = (type: string) => {
    return type === 'novo' ? 'Novo' : 'Bazar';
  };

  const getStatusColor = (status: string) => {
    if (status === 'ativo') return 'text-green-600';
    if (status === 'fora_de_estoque') return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'ativo') return 'Ativo';
    if (status === 'fora_de_estoque') return 'Fora de Estoque';
    return 'Inativo';
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
                  <Package className='w-4 h-4 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Produto #{product.id}</h2>
                  <p className='text-slate-300 text-sm'>{product.name}</p>
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
          {/* Imagem do Produto */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Imagem do Produto</label>
            </div>
            <div className='flex justify-center'>
              <div className='w-48 h-48 rounded-lg overflow-hidden border-2 border-slate-200 shadow-lg bg-white'>
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>

          {/* Primeira linha - Nome e Categoria */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nome do Produto */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Nome do Produto</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{product.name}</span>
              </div>
            </div>

            {/* Categoria */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Categoria</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{product.category}</span>
              </div>
            </div>
          </div>

          {/* Segunda linha - Marca e Tipo */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Marca */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Marca</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{product.brand}</span>
              </div>
            </div>

            {/* Tipo */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Tipo</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{getTypeLabel(product.type)}</span>
              </div>
            </div>
          </div>

          {/* Terceira linha - Cor */}
          {product.color && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <label className='text-sm font-semibold text-slate-700'>Cor</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{product.color}</span>
                </div>
              </div>
            </div>
          )}

          {/* Terceira linha - Preços */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Preço Original */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Preço Original</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-500'>{formatPrice(product.price)}</span>
              </div>
            </div>

            {/* Preço com Desconto */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Preço com Desconto</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatPrice(product.offerPrice)}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Status</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className={`${getStatusColor(product.status)}`}>
                {getStatusLabel(product.status)}
              </span>
            </div>
          </div>

          {/* Estoque por Tamanho */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Estoque por Tamanho</label>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {product.sizes.map((sizeItem, index) => (
                <div key={index} className='relative group'>
                  <div className='p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-md'>
                    <div className='flex flex-col items-center gap-3'>
                      {/* Badge do Tamanho */}
                      <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg'>
                        <span className='text-white font-bold text-sm'>{sizeItem.size}</span>
                      </div>

                      {/* Quantidade */}
                      <div className='text-center'>
                        <div className='flex items-center justify-center gap-2'>
                          <span className='text-2xl font-bold text-slate-800'>
                            {sizeItem.quantity}
                          </span>
                          <span className='text-sm text-slate-600'>unidades</span>
                        </div>
                        <p className='text-xs text-slate-500 mt-1'>em estoque</p>
                      </div>
                    </div>

                    {/* Indicador de Status */}
                    <div
                      className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                        sizeItem.quantity > 0
                          ? 'bg-green-500 shadow-lg shadow-green-500/50'
                          : 'bg-red-500 shadow-lg shadow-red-500/50'
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total em Estoque */}
            <div className='mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg'>
                    <Package className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <p className='text-slate-800'>Total em Estoque</p>
                    <p className='text-sm text-slate-600'>Todas as unidades</p>
                  </div>
                </div>
                <div className='text-right'>
                  <span className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    {product.totalQuantity}
                  </span>
                  <p className='text-sm text-slate-600'>unidades</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição (se disponível) */}
          {product.description && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Descrição</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800'>{product.description}</p>
              </div>
            </div>
          )}

          {/* Observações (se disponível) */}
          {product.observations && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Observações</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800 whitespace-pre-wrap'>{product.observations}</p>
              </div>
            </div>
          )}

          {/* Datas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Data de Criação */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(product.createdAt)}</span>
              </div>
            </div>

            {/* Última Atualização */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(product.updatedAt)}</span>
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
                onClick={onEdit}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Produto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
