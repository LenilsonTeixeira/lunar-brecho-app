import { useState, useEffect } from 'react';
import { ArrowLeft, Package, User, MapPin, CreditCard, Store, Truck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { orderService } from '../../services/order/OrderService';
import { OrderResponse } from '../../services/types';

const ViewOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError(null);
      const orderData = await orderService.getOrder(orderId);
      setOrder(orderData);
    } catch (err) {
      setError('Erro ao carregar pedido');
      console.error('Erro ao carregar pedido:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-300 text-slate-950';
      case 'APPROVED':
        return 'bg-blue-300 text-slate-950';
      case 'SENT':
        return 'bg-purple-300 text-slate-950';
      case 'DELIVERED':
        return 'bg-green-300 text-slate-950';
      case 'CANCELLED':
        return 'bg-red-300 text-slate-950';
      default:
        return 'bg-slate-300 text-slate-950';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'APPROVED':
        return 'Aprovado';
      case 'SENT':
        return 'Enviado';
      case 'DELIVERED':
        return 'Entregue';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className='py-6 flex flex-col justify-between bg-slate-50'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Package className='w-8 h-8 text-slate-400 animate-pulse' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>Carregando pedido...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className='py-6 flex flex-col justify-between bg-slate-50'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
                <Package className='w-8 h-8 text-red-400' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>
                {error || 'Pedido não encontrado'}
              </h3>
              <button
                onClick={() => navigate('/admin/pedidos')}
                className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
              >
                Voltar para pedidos
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Pedido #{order.externalId}
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
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusLabel(order.status)}
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
                  <span className='text-slate-800'>{order.customer.fullName}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{order.customer.phone}</span>
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
                {order.deliveryType === 'HOME_DELIVERY' ? (
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
          {order.deliveryType === 'HOME_DELIVERY' && order.deliveryAddress && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereço de Entrega</h3>
              </div>
              <div className='p-3 bg-white rounded-lg border border-slate-200'>
                <div className='space-y-1'>
                  <p className='text-slate-800'>
                    {order.deliveryAddress.street}, {order.deliveryAddress.number}
                  </p>
                  <p className='text-slate-600'>
                    {order.deliveryAddress.neighborhood} - {order.deliveryAddress.city}/
                    {order.deliveryAddress.state}
                  </p>
                  <p className='text-slate-600 font-mono'>CEP: {order.deliveryAddress.zipCode}</p>
                  {order.deliveryAddress.complement && (
                    <p className='text-slate-600'>
                      Complemento: {order.deliveryAddress.complement}
                    </p>
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
              {order.items.map((item, index) => (
                <div key={index} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0'>
                        <img
                          src={item.mainImageThumbnailUrl || item.mainImageUrl}
                          alt={item.name}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div>
                        <p className='text-slate-800 font-medium'>{item.name}</p>
                        <p className='text-sm text-slate-600'>
                          Código: {item.externalId} | Marca: {item.brand} | Tamanho: {item.size} |
                          Qtd: {item.quantity} | Unit: {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-slate-800 font-semibold'>{formatPrice(item.subtotal)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-slate-600'>Subtotal:</span>
                  <span className='text-sm text-slate-600'>
                    {formatPrice(order.financialSummary.subtotal)}
                  </span>
                </div>
                {order.financialSummary.deliveryFee > 0 && (
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-slate-600'>Taxa de entrega:</span>
                    <span className='text-sm text-slate-600'>
                      {formatPrice(order.financialSummary.deliveryFee)}
                    </span>
                  </div>
                )}
                {order.financialSummary.discountAmount > 0 && (
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-slate-600'>Desconto:</span>
                    <span className='text-sm text-green-600'>
                      -{formatPrice(order.financialSummary.discountAmount)}
                    </span>
                  </div>
                )}
                <div className='border-t border-purple-200 pt-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold text-slate-800'>Total do Pedido</span>
                    <span className='text-xl font-bold text-purple-600'>
                      {formatPrice(order.financialSummary.totalAmount)}
                    </span>
                  </div>
                </div>
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
                  <span className='text-slate-800'>{order.paymentMethod}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Email do Cliente
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{order.customer.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Retirada - Apenas se for pickup */}
          {order.deliveryType === 'STORE_PICKUP' && (
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
                onClick={() => navigate(`/admin/pedidos/editar/${order.id}`)}
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
