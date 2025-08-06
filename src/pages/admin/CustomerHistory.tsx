import { ArrowLeft, ShoppingBag, TrendingUp, DollarSign, Eye, Edit } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface PurchaseHistory {
  id: number;
  orderNumber: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  deliveryType: 'pickup' | 'delivery';
  customerId: number;
  customerName: string;
  orderDate: string;
  deliveryDate?: string;
  products: PurchaseProduct[];
}

interface PurchaseProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  totalPurchases?: number;
  totalSpent?: number;
  lastPurchase?: string;
}

const CustomerHistory = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockCustomer: Customer = {
    id: parseInt(customerId || '1'),
    name: 'Maria Silva Santos',
    phone: '(11) 99999-1234',
    address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
    totalPurchases: 8,
    totalSpent: 2450.75,
    lastPurchase: '2024-01-25T16:30:00Z',
  };

  // Dados de exemplo do histórico de compras
  const purchaseHistory: PurchaseHistory[] = [
    {
      id: 1,
      orderNumber: 'PED-2024-001',
      total: 289.9,
      status: 'delivered',
      paymentMethod: 'PIX',
      deliveryType: 'delivery',
      customerId: mockCustomer.id,
      customerName: mockCustomer.name,
      orderDate: '2024-01-25T10:30:00Z',
      deliveryDate: '2024-01-27T14:45:00Z',
      products: [
        {
          id: 1,
          name: 'Blusa de Seda Azul',
          image: 'https://cdn.awsli.com.br/1538/1538522/produto/340598723/img_2977-24c9s0rovs.jpeg',
          price: 89.9,
          quantity: 1,
          total: 89.9,
        },
        {
          id: 2,
          name: 'Calça Jeans Skinny',
          image:
            'https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp',
          price: 200.0,
          quantity: 1,
          total: 200.0,
        },
      ],
    },
    {
      id: 2,
      orderNumber: 'PED-2024-002',
      total: 450.0,
      status: 'delivered',
      paymentMethod: 'Cartão de Crédito',
      deliveryType: 'pickup',
      customerId: mockCustomer.id,
      customerName: mockCustomer.name,
      orderDate: '2024-01-20T15:20:00Z',
      deliveryDate: '2024-01-22T10:15:00Z',
      products: [
        {
          id: 3,
          name: 'Vestido Floral',
          image:
            'https://cdn.awsli.com.br/1538/1538522/produto/335928056/3d0ae793-6d64-4785-9eea-7638f716b531-rc61dwiw7t.jpeg',
          price: 450.0,
          quantity: 1,
          total: 450.0,
        },
      ],
    },
    {
      id: 3,
      orderNumber: 'PED-2024-003',
      total: 180.0,
      status: 'shipped',
      paymentMethod: 'PIX',
      deliveryType: 'delivery',
      customerId: mockCustomer.id,
      customerName: mockCustomer.name,
      orderDate: '2024-01-28T09:45:00Z',
      products: [
        {
          id: 4,
          name: 'Body Lace Branco',
          image:
            'https://acdn-us.mitiendanube.com/stores/004/414/596/products/86c1af187bed52a509db2649e0144039-424f199920b186aca517177081243046-1024-1024.webp',
          price: 45.0,
          quantity: 2,
          total: 90.0,
        },
        {
          id: 5,
          name: 'Shorts Denim',
          image:
            'https://cdn.awsli.com.br/1538/1538522/produto/217419654/whatsapp-image-2023-05-17-at-13-40-07-65w1r2wpb9.jpeg',
          price: 90.0,
          quantity: 1,
          total: 90.0,
        },
      ],
    },
    {
      id: 4,
      orderNumber: 'PED-2024-004',
      total: 320.0,
      status: 'confirmed',
      paymentMethod: 'Dinheiro',
      deliveryType: 'pickup',
      customerId: mockCustomer.id,
      customerName: mockCustomer.name,
      orderDate: '2024-01-30T11:15:00Z',
      products: [
        {
          id: 6,
          name: 'Conjunto Esportivo',
          image: 'https://cdn.awsli.com.br/1538/1538522/produto/340598723/img_2977-24c9s0rovs.jpeg',
          price: 320.0,
          quantity: 1,
          total: 320.0,
        },
      ],
    },
    {
      id: 5,
      orderNumber: 'PED-2024-005',
      total: 150.0,
      status: 'pending',
      paymentMethod: 'PIX',
      deliveryType: 'delivery',
      customerId: mockCustomer.id,
      customerName: mockCustomer.name,
      orderDate: '2024-02-01T14:30:00Z',
      products: [
        {
          id: 7,
          name: 'Blusa Básica Branca',
          image:
            'https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp',
          price: 75.0,
          quantity: 2,
          total: 150.0,
        },
      ],
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
      case 'pending':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800'>
            Pendente
          </span>
        );
      case 'confirmed':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'>
            Confirmado
          </span>
        );
      case 'shipped':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800'>
            Enviado
          </span>
        );
      case 'delivered':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'>
            Entregue
          </span>
        );
      case 'cancelled':
        return (
          <span className='inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'>
            Cancelado
          </span>
        );
      default:
        return null;
    }
  };

  const getDeliveryTypeLabel = (type: string) => {
    return type === 'pickup' ? 'Retirada' : 'Entrega';
  };

  const totalPurchases = purchaseHistory.length;
  const totalSpent = purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);
  const pendingPurchases = purchaseHistory.filter((p) => p.status === 'pending').length;
  const deliveredPurchases = purchaseHistory.filter((p) => p.status === 'delivered').length;
  const averageTicket = totalPurchases > 0 ? totalSpent / totalPurchases : 0;

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate(`/admin/clientes/visualizar/${customerId}`)}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Histórico de Compras
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            {mockCustomer.name} - #{mockCustomer.id}
          </p>
        </div>

        {/* Estatísticas */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <TrendingUp className='w-5 h-5 text-purple-600' />
            Resumo do Histórico
          </h3>

          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            <div className='bg-slate-50 rounded-lg p-4 text-center'>
              <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <ShoppingBag className='w-5 h-5 text-purple-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{totalPurchases}</p>
              <p className='text-xs text-slate-600'>Total de Compras</p>
            </div>

            <div className='bg-slate-50 rounded-lg p-4 text-center'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <DollarSign className='w-5 h-5 text-green-600' />
              </div>
              <p className='text-lg font-bold text-green-600'>{formatCurrency(totalSpent)}</p>
              <p className='text-xs text-slate-600'>Total Gasto</p>
            </div>

            <div className='bg-slate-50 rounded-lg p-4 text-center'>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <DollarSign className='w-5 h-5 text-blue-600' />
              </div>
              <p className='text-lg font-bold text-blue-600'>{formatCurrency(averageTicket)}</p>
              <p className='text-xs text-slate-600'>Ticket Médio</p>
            </div>

            <div className='bg-slate-50 rounded-lg p-4 text-center'>
              <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <ShoppingBag className='w-5 h-5 text-yellow-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{pendingPurchases}</p>
              <p className='text-xs text-slate-600'>Pendentes</p>
            </div>

            <div className='bg-slate-50 rounded-lg p-4 text-center'>
              <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                <ShoppingBag className='w-5 h-5 text-green-600' />
              </div>
              <p className='text-2xl font-bold text-slate-800'>{deliveredPurchases}</p>
              <p className='text-xs text-slate-600'>Entregues</p>
            </div>
          </div>
        </div>

        {/* Lista de Compras */}
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4'>
            Compras ({purchaseHistory.length})
          </h3>

          <div className='space-y-4'>
            {purchaseHistory.map((purchase) => (
              <div
                key={purchase.id}
                className='bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start justify-between gap-4 mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h4 className='text-sm font-medium text-slate-800'>
                        Pedido #{purchase.orderNumber}
                      </h4>
                      {getStatusBadge(purchase.status)}
                    </div>
                    <div className='flex items-center gap-4 text-xs text-slate-500'>
                      <span>Data: {formatDate(purchase.orderDate)}</span>
                      <span>Método: {purchase.paymentMethod}</span>
                      <span>Entrega: {getDeliveryTypeLabel(purchase.deliveryType)}</span>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-lg font-bold text-slate-800'>
                      {formatCurrency(purchase.total)}
                    </p>
                    <p className='text-xs text-slate-500'>
                      {purchase.products.length} {purchase.products.length === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                </div>

                {/* Produtos */}
                <div className='space-y-2'>
                  {purchase.products.map((product) => (
                    <div
                      key={product.id}
                      className='flex items-center gap-3 bg-white rounded-lg p-2'
                    >
                      <div className='w-12 h-12 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h5 className='text-sm font-medium text-slate-800 truncate'>
                          {product.name}
                        </h5>
                        <p className='text-xs text-slate-500'>
                          Qtd: {product.quantity} | {formatCurrency(product.price)} cada
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-medium text-slate-800'>
                          {formatCurrency(product.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ações */}
                <div className='flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-200'>
                  <button
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Visualizar Pedido'
                  >
                    <Eye className='w-4 h-4' />
                  </button>
                  <button
                    className='p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'
                    title='Editar Pedido'
                  >
                    <Edit className='w-4 h-4' />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {purchaseHistory.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4'>
                <ShoppingBag className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>Nenhuma compra encontrada</h3>
              <p className='text-sm text-slate-600'>
                Este cliente ainda não realizou nenhuma compra.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
