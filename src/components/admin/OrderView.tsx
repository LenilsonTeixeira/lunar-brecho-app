import { X, User, Package, MapPin, CreditCard, Store, Truck, Calendar, Phone } from 'lucide-react';
import { Order } from '../../types/order';

interface OrderViewProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
}

const OrderView = ({ order, onClose, onEdit }: OrderViewProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'aprovado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'enviado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'entregue':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente':
        return '⏳';
      case 'aprovado':
        return '✅';
      case 'enviado':
        return '📦';
      case 'entregue':
        return '🎉';
      case 'cancelado':
        return '❌';
      default:
        return '📋';
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center'>
                <Package className='w-5 h-5 text-white' />
              </div>
              <div>
                <h2 className='text-xl font-bold text-slate-800'>Pedido {order.orderNumber}</h2>
                <p className='text-sm text-slate-600'>Detalhes completos do pedido</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-slate-600' />
            </button>
          </div>
        </div>

        <div className='p-6 space-y-6'>
          {/* Status do Pedido */}
          <div className='flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>{getStatusIcon(order.status)}</span>
              <div>
                <h3 className='font-semibold text-slate-800'>Status do Pedido</h3>
                <p className='text-sm text-slate-600'>
                  Atualizado em {formatDate(order.orderDate)}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                order.status,
              )}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          {/* Informações do Cliente */}
          <div className='bg-white border border-slate-200 rounded-lg p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações do Cliente</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-slate-600'>Nome Completo</label>
                <p className='text-slate-800 font-medium'>{order.customer}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <div>
                  <label className='text-sm font-medium text-slate-600'>Telefone</label>
                  <p className='text-slate-800 font-medium'>{order.customerPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tipo de Entrega */}
          <div className='bg-white border border-slate-200 rounded-lg p-6'>
            <div className='flex items-center gap-3 mb-4'>
              {order.deliveryType === 'delivery' ? (
                <Truck className='w-5 h-5 text-purple-600' />
              ) : (
                <Store className='w-5 h-5 text-purple-600' />
              )}
              <h3 className='text-lg font-semibold text-slate-800'>Tipo de Entrega</h3>
            </div>
            <div className='flex items-center gap-3'>
              {order.deliveryType === 'delivery' ? (
                <>
                  <Truck className='w-5 h-5 text-green-600' />
                  <span className='text-slate-800 font-medium'>Entrega em Domicílio</span>
                </>
              ) : (
                <>
                  <Store className='w-5 h-5 text-blue-600' />
                  <span className='text-slate-800 font-medium'>Retirada na Loja</span>
                </>
              )}
            </div>
          </div>

          {/* Endereço de Entrega - Apenas se for delivery */}
          {order.deliveryType === 'delivery' && order.address && (
            <div className='bg-white border border-slate-200 rounded-lg p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereço de Entrega</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-slate-600'>CEP</label>
                  <p className='text-slate-800'>{order.address.cep}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Rua</label>
                  <p className='text-slate-800'>{order.address.street}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Número</label>
                  <p className='text-slate-800'>{order.address.number}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Complemento</label>
                  <p className='text-slate-800'>{order.address.complement || 'Não informado'}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Bairro</label>
                  <p className='text-slate-800'>{order.address.neighborhood}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-slate-600'>Cidade/Estado</label>
                  <p className='text-slate-800'>
                    {order.address.city}/{order.address.state}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Produtos */}
          <div className='bg-white border border-slate-200 rounded-lg p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <Package className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Produtos do Pedido</h3>
            </div>
            <div className='space-y-3'>
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                      <span className='text-sm font-medium text-purple-600'>{index + 1}</span>
                    </div>
                    <div>
                      <p className='font-medium text-slate-800'>{product.name}</p>
                      <p className='text-sm text-slate-600'>
                        Quantidade: {product.quantity} | Preço unitário:{' '}
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-slate-800'>
                      {formatPrice(product.quantity * product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 pt-4 border-t border-slate-200'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-slate-800'>Total do Pedido</span>
                <span className='text-xl font-bold text-purple-600'>
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className='bg-white border border-slate-200 rounded-lg p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <CreditCard className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Pagamento</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-slate-600'>Forma de Pagamento</label>
                <p className='text-slate-800 font-medium'>{order.paymentMethod}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-slate-400' />
                <div>
                  <label className='text-sm font-medium text-slate-600'>Data do Pedido</label>
                  <p className='text-slate-800 font-medium'>{formatDate(order.orderDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Retirada - Apenas se for pickup */}
          {order.deliveryType === 'pickup' && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
              <div className='flex items-start gap-3'>
                <Store className='w-5 h-5 text-blue-600 mt-0.5' />
                <div>
                  <h4 className='text-sm font-semibold text-blue-800 mb-2'>
                    Informações de Retirada
                  </h4>
                  <p className='text-sm text-blue-700 mb-3'>
                    O cliente deve apresentar documento de identificação e comprovante de pagamento
                    na retirada.
                  </p>
                  <div className='text-xs text-blue-600 space-y-1'>
                    <p>
                      <strong>Horário de Funcionamento:</strong> Segunda a Sexta, 9h às 18h
                    </p>
                    <p>
                      <strong>Prazo para Retirada:</strong> 7 dias após a confirmação do pedido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='flex gap-4 p-6 border-t border-slate-200'>
          <button
            onClick={onClose}
            className='flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
          >
            Fechar
          </button>
          <button
            onClick={onEdit}
            className='flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300'
          >
            Editar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
