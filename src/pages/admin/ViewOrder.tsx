import { ArrowLeft, Package, User, MapPin, CreditCard, Store, Truck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Order } from '../../types/order';

const ViewOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockOrder: Order = {
    id: parseInt(orderId || '1'),
    orderNumber: `#${orderId}`,
    customer: 'Maria Silva Santos',
    customerPhone: '(34) 99668-3137',
    products: [
      {
        id: 1,
        name: 'Vestido Floral Vintage',
        code: 'VD001',
        size: 'M',
        quantity: 1,
        price: 59.9,
      },
      {
        id: 2,
        name: 'Blusa Básica Algodão',
        code: 'BL002',
        size: 'P',
        quantity: 2,
        price: 35.0,
      },
    ],
    total: 129.9,
    status: 'pendente',
    orderDate: '2024-01-22',
    paymentMethod: 'PIX',
    deliveryAddress: 'Rua das Flores, 123 - Centro, Uberlândia/MG',
    deliveryType: 'delivery',
    address: {
      cep: '38400-000',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'Uberlândia',
      state: 'MG',
    },
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-300 text-slate-950';
      case 'aprovado':
        return 'bg-blue-300 text-slate-950';
      case 'enviado':
        return 'bg-purple-300 text-slate-950';
      case 'entregue':
        return 'bg-green-300 text-slate-950';
      case 'cancelado':
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
              onClick={() => navigate('/admin/pedidos')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Pedido {mockOrder.orderNumber}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do pedido</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Status do Pedido */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Package className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status do Pedido</h3>
            </div>
            <div className='flex items-center justify-between'>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(mockOrder.status)}`}
              >
                {mockOrder.status.charAt(0).toUpperCase() + mockOrder.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações do Cliente</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome do Cliente
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockOrder.customer}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockOrder.customerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tipo de Entrega */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Truck className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Tipo de Entrega</h3>
            </div>
            <div className='p-3 bg-white rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3'>
                {mockOrder.deliveryType === 'delivery' ? (
                  <>
                    <Truck className='w-4 h-4 text-purple-600' />
                    <span className='text-slate-800'>Entrega em Domicílio</span>
                  </>
                ) : (
                  <>
                    <Store className='w-4 h-4 text-purple-600' />
                    <span className='text-slate-800'>Retirada na Loja</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Endereço de Entrega - Apenas se for delivery */}
          {mockOrder.deliveryType === 'delivery' && mockOrder.address && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereço de Entrega</h3>
              </div>
              <div className='p-3 bg-white rounded-lg border border-slate-200'>
                <div className='space-y-1'>
                  <p className='text-slate-800'>
                    {mockOrder.address.street}, {mockOrder.address.number}
                  </p>
                  <p className='text-slate-600'>
                    {mockOrder.address.neighborhood} - {mockOrder.address.city}/
                    {mockOrder.address.state}
                  </p>
                  <p className='text-slate-600 font-mono'>CEP: {mockOrder.address.cep}</p>
                  {mockOrder.address.complement && (
                    <p className='text-slate-600'>Complemento: {mockOrder.address.complement}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Produtos */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Package className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Produtos do Pedido</h3>
            </div>
            <div className='space-y-3'>
              {mockOrder.products.map((product, index) => (
                <div key={index} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center'>
                        <span className='text-xs text-purple-600'>{index + 1}</span>
                      </div>
                      <div>
                        <p className='text-slate-800 font-medium'>{product.name}</p>
                        <p className='text-sm text-slate-600'>
                          Código: {product.code} | Tamanho: {product.size} | Qtd: {product.quantity}{' '}
                          | Unit: {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-slate-800 font-semibold'>
                        {formatPrice(product.quantity * product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-slate-800'>Total do Pedido</span>
                <span className='text-xl font-bold text-purple-600'>
                  {formatPrice(mockOrder.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento e Data */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <CreditCard className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Pagamento</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Forma de Pagamento
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockOrder.paymentMethod}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data do Pedido
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockOrder.orderDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Retirada - Apenas se for pickup */}
          {mockOrder.deliveryType === 'pickup' && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <Store className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Informações de Retirada</h3>
              </div>
              <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
                <div className='space-y-2'>
                  <p className='text-sm text-blue-700'>
                    O cliente deve apresentar documento de identificação e comprovante de pagamento
                    na retirada.
                  </p>
                  <div className='text-xs text-blue-600 space-y-1'>
                    <p>
                      <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
                    </p>
                    <p>
                      <strong>Prazo:</strong> 7 dias após a confirmação do pedido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/pedidos')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/pedidos/editar/${mockOrder.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
