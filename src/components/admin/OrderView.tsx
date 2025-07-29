import { X, Package } from 'lucide-react';
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
                  <Package className='w-4 h-4 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Pedido #{order.orderNumber}</h2>
                  <p className='text-slate-300 text-sm'>Detalhes completos do pedido</p>
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
          {/* Status do Pedido */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Status do Pedido</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='text-slate-800'>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Primeira linha - Cliente e Telefone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nome do Cliente */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Nome do Cliente</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{order.customer}</span>
              </div>
            </div>

            {/* Telefone do Cliente */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Telefone</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{order.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Tipo de Entrega */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Tipo de Entrega</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3'>
                {order.deliveryType === 'delivery' ? (
                  <span className='text-slate-800'>Entrega em Domicílio</span>
                ) : (
                  <span className='text-slate-800'>Retirada na Loja</span>
                )}
              </div>
            </div>
          </div>

          {/* Endereço de Entrega - Apenas se for delivery */}
          {order.deliveryType === 'delivery' && order.address && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Endereço de Entrega</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <div className='space-y-1'>
                  <p className='text-slate-800'>
                    {order.address.street}, {order.address.number}
                  </p>
                  <p className='text-slate-600'>
                    {order.address.neighborhood} - {order.address.city}/{order.address.state}
                  </p>
                  <p className='text-slate-600 font-mono'>CEP: {order.address.cep}</p>
                  {order.address.complement && (
                    <p className='text-slate-600'>Complemento: {order.address.complement}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Produtos */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Produtos do Pedido</label>
            </div>
            <div className='space-y-2'>
              {order.products.map((product, index) => (
                <div key={index} className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center'>
                        <span className='text-xs text-purple-600'>{index + 1}</span>
                      </div>
                      <div>
                        <p className='text-slate-800'>{product.name}</p>
                        <p className='text-sm text-slate-600'>
                          Qtd: {product.quantity} | Unit: {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-slate-800'>
                        {formatPrice(product.quantity * product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200'>
              <div className='flex justify-between items-center'>
                <span className='text-slate-800'>Total do Pedido</span>
                <span className='text-lg text-purple-600'>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Segunda linha - Forma de Pagamento e Data */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Forma de Pagamento */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Forma de Pagamento</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{order.paymentMethod}</span>
              </div>
            </div>

            {/* Data do Pedido */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data do Pedido</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(order.orderDate)}</span>
              </div>
            </div>
          </div>

          {/* Informações de Retirada - Apenas se for pickup */}
          {order.deliveryType === 'pickup' && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>
                  Informações de Retirada
                </label>
              </div>
              <div className='p-3 bg-blue-50 rounded-lg border border-blue-200'>
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
                onClick={onClose}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Fechar
              </button>
              <button
                onClick={onEdit}
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

export default OrderView;
