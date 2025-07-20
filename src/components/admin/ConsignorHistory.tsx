import { X, Package, TrendingUp, DollarSign, Eye, Edit } from 'lucide-react';

interface ProductHistory {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  commission: number;
  status: 'for_sale' | 'sold' | 'returned';
  consignorId: number;
  consignorName: string;
  createdAt: string;
  soldAt?: string;
  returnedAt?: string;
}

interface ConsignorHistoryProps {
  consignor: {
    id: number;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    paymentMethod: 'pix' | 'money' | 'bank_transfer';
    pixKey: string;
    bankAccount: {
      bank: string;
      agency: string;
      account: string;
      accountType: 'checking' | 'savings';
    };
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
    totalProducts?: number;
    productsForSale?: number;
    soldProducts?: number;
    totalCommission?: number;
  };
  onClose: () => void;
}

const ConsignorHistory = ({ consignor, onClose }: ConsignorHistoryProps) => {
  // Dados de exemplo do histórico
  const productHistory: ProductHistory[] = [
    {
      id: 1,
      name: 'Blusa de Seda Azul',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/340598723/img_2977-24c9s0rovs.jpeg',
      category: 'Blusas',
      price: 89.9,
      commission: 26.97,
      status: 'sold',
      consignorId: consignor.id,
      consignorName: consignor.name,
      createdAt: '2024-01-15T10:30:00Z',
      soldAt: '2024-01-20T14:45:00Z',
    },
    {
      id: 2,
      name: 'Calça Jeans Skinny',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp',
      category: 'Calças',
      price: 120.0,
      commission: 36.0,
      status: 'for_sale',
      consignorId: consignor.id,
      consignorName: consignor.name,
      createdAt: '2024-01-18T09:15:00Z',
    },
    {
      id: 3,
      name: 'Vestido Floral',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/335928056/3d0ae793-6d64-4785-9eea-7638f716b531-rc61dwiw7t.jpeg',
      category: 'Vestidos',
      price: 150.0,
      commission: 45.0,
      status: 'sold',
      consignorId: consignor.id,
      consignorName: consignor.name,
      createdAt: '2024-01-10T11:20:00Z',
      soldAt: '2024-01-25T16:30:00Z',
    },
    {
      id: 4,
      name: 'Body Lace Branco',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/86c1af187bed52a509db2649e0144039-424f199920b186aca517177081243046-1024-1024.webp',
      category: 'Body',
      price: 45.0,
      commission: 13.5,
      status: 'returned',
      consignorId: consignor.id,
      consignorName: consignor.name,
      createdAt: '2024-01-05T08:45:00Z',
      returnedAt: '2024-01-22T10:15:00Z',
    },
    {
      id: 5,
      name: 'Shorts Denim',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/217419654/whatsapp-image-2023-05-17-at-13-40-07-65w1r2wpb9.jpeg',
      category: 'Shorts',
      price: 65.0,
      commission: 19.5,
      status: 'for_sale',
      consignorId: consignor.id,
      consignorName: consignor.name,
      createdAt: '2024-01-12T13:30:00Z',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'for_sale':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'>
            À Venda
          </span>
        );
      case 'sold':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'>
            Vendido
          </span>
        );
      case 'returned':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'>
            Devolvido
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusDate = (product: ProductHistory) => {
    switch (product.status) {
      case 'sold':
        return product.soldAt ? `Vendido em ${formatDate(product.soldAt)}` : '';
      case 'returned':
        return product.returnedAt ? `Devolvido em ${formatDate(product.returnedAt)}` : '';
      default:
        return `Cadastrado em ${formatDate(product.createdAt)}`;
    }
  };

  const totalProducts = productHistory.length;
  const productsForSale = productHistory.filter((p) => p.status === 'for_sale').length;
  const soldProducts = productHistory.filter((p) => p.status === 'sold').length;
  const returnedProducts = productHistory.filter((p) => p.status === 'returned').length;
  const totalCommission = productHistory
    .filter((p) => p.status === 'sold')
    .reduce((sum, p) => sum + p.commission, 0);

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-200'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center'>
              <TrendingUp className='w-6 h-6 text-purple-600' />
            </div>
            <div>
              <h2 className='text-xl sm:text-2xl font-bold text-slate-800'>
                Histórico de Produtos
              </h2>
              <p className='text-sm text-slate-600'>
                {consignor.name} - #{consignor.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Estatísticas */}
        <div className='p-6 bg-gradient-to-br from-purple-50 to-pink-50'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <TrendingUp className='w-5 h-5 text-purple-600' />
            Resumo do Histórico
          </h3>

          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
              <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Package className='w-5 h-5 text-purple-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{totalProducts}</p>
              <p className='text-xs text-slate-600'>Total de Produtos</p>
            </div>

            <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Package className='w-5 h-5 text-green-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{productsForSale}</p>
              <p className='text-xs text-slate-600'>À Venda</p>
            </div>

            <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Package className='w-5 h-5 text-blue-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{soldProducts}</p>
              <p className='text-xs text-slate-600'>Vendidos</p>
            </div>

            <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
              <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Package className='w-5 h-5 text-red-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{returnedProducts}</p>
              <p className='text-xs text-slate-600'>Devolvidos</p>
            </div>

            <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <DollarSign className='w-5 h-5 text-green-600' />
              </div>
              <p className='text-lg font-bold text-green-600'>{formatCurrency(totalCommission)}</p>
              <p className='text-xs text-slate-600'>Comissão Total</p>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className='p-6'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4'>
            Produtos ({productHistory.length})
          </h3>

          <div className='space-y-4'>
            {productHistory.map((product) => (
              <div
                key={product.id}
                className='bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start gap-4'>
                  {/* Imagem do Produto */}
                  <div className='w-16 h-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Informações do Produto */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-4'>
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-medium text-slate-800 truncate'>
                          {product.name}
                        </h4>
                        <p className='text-xs text-slate-500 mt-1'>Categoria: {product.category}</p>
                        <div className='flex items-center gap-4 mt-2'>
                          <span className='text-sm font-medium text-slate-800'>
                            Preço: {formatCurrency(product.price)}
                          </span>
                          <span className='text-sm font-medium text-green-600'>
                            Comissão: {formatCurrency(product.commission)}
                          </span>
                        </div>
                        <p className='text-xs text-slate-500 mt-1'>{getStatusDate(product)}</p>
                      </div>

                      {/* Status e Ações */}
                      <div className='flex items-center gap-2'>
                        {getStatusBadge(product.status)}
                        <div className='flex items-center gap-1'>
                          <button
                            className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                            title='Visualizar'
                          >
                            <Eye className='w-4 h-4' />
                          </button>
                          <button
                            className='p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'
                            title='Editar'
                          >
                            <Edit className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {productHistory.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4'>
                <Package className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>Nenhum produto encontrado</h3>
              <p className='text-sm text-slate-600'>
                Este consignante ainda não possui produtos cadastrados.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-4 p-6 border-t border-slate-200'>
          <button
            onClick={onClose}
            className='px-6 py-3 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsignorHistory;
