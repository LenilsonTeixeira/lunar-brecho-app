import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Plus, Package, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { orderService } from '../../services/order/OrderService';
import { OrderResponse } from '../../services/types';

const OrderPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [deletingOrder, setDeletingOrder] = useState<OrderResponse | undefined>();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrders(0, 100);
      setOrders(response.content);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error('Erro ao carregar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    'Todos os Status',
    'PENDING',
    'APPROVED',
    'SENT',
    'DELIVERED',
    'CANCELLED',
  ];

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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus as any });
      await loadOrders(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  const handleDeleteOrder = (order: OrderResponse) => {
    setDeletingOrder(order);
  };

  const handleConfirmDelete = async () => {
    if (!deletingOrder) return;

    try {
      await orderService.deleteOrder(deletingOrder.id);
      setOrders(orders.filter((order) => order.id !== deletingOrder.id));
      setDeletingOrder(undefined);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.externalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    const matchesStatus =
      selectedStatus === '' ||
      selectedStatus === 'Todos os Status' ||
      order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (loading) {
    return (
      <div className='py-6 flex flex-col bg-slate-50'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Package className='w-8 h-8 text-slate-400 animate-pulse' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>Carregando pedidos...</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-6 flex flex-col bg-slate-50'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
                <Package className='w-8 h-8 text-red-400' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>{error}</h3>
              <button
                onClick={loadOrders}
                className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Pedidos</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie os pedidos e entregas da sua loja
              </p>
            </div>
            <Link to='/admin/pedidos/adicionar'>
              <button className='w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'>
                <Plus className='w-4 h-4' />
                Novo Pedido
              </button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar pedidos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className='w-full px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('');
              }}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[800px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[140px]'>
                    Pedido
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Cliente
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[220px]'>
                    Produtos
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[100px]'>
                    Total
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[100px]'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[100px]'>
                    Entrega
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                  >
                    <td className='px-6 py-4'>
                      <div>
                        <p className='text-xs sm:text-sm font-medium text-slate-800'>
                          #{order.externalId}
                        </p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='text-xs sm:text-sm font-medium text-slate-800'>
                          {order.customer.fullName}
                        </p>
                        <p className='text-xs text-slate-500'>{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='space-y-2'>
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between min-w-[200px]'
                          >
                            <span className='text-xs sm:text-sm text-slate-800 flex-1 pr-2'>
                              {item.name} ({item.brand})
                            </span>
                            <span className='text-xs sm:text-sm font-medium text-slate-50 bg-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0'>
                              {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-xs sm:text-sm font-semibold text-slate-800'>
                        {formatPrice(order.financialSummary.totalAmount)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-2 py-1 rounded-sm text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-xs text-slate-600'>
                        {order.deliveryType === 'HOME_DELIVERY' ? 'Entrega' : 'Retirada'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <button
                          onClick={() => navigate(`/admin/pedidos/visualizar/${order.id}`)}
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/pedidos/editar/${order.id}`)}
                          className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                          title='Editar'
                        >
                          <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <div className='relative group'>
                          <button
                            className='p-1.5 sm:p-2 text-slate-800 hover:bg-orange-50 rounded-lg transition-colors duration-200'
                            title='Alterar Status'
                          >
                            <RefreshCw className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <div className='absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]'>
                            {statusOptions.slice(1).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
                                className='w-full px-3 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg'
                              >
                                {getStatusLabel(status)}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteOrder(order)}
                          className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                          title='Cancelar'
                        >
                          <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Package className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                Nenhum pedido encontrado
              </h3>
              <p className='text-sm sm:text-base text-slate-600'>
                Tente ajustar os filtros ou criar um novo pedido.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Mostrando {filteredOrders.length} de {orders.length} pedidos
            </div>
            <div className='flex items-center gap-2'>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Anterior
              </button>
              <span className='px-2 sm:px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-lg'>
                1
              </span>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingOrder}
        title='Cancelar Pedido'
        message={`Tem certeza que deseja cancelar o pedido "#${deletingOrder?.externalId}"? Esta ação não pode ser desfeita.`}
        confirmText='Cancelar Pedido'
        cancelText='Manter Pedido'
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingOrder(undefined)}
        type='danger'
      />
    </div>
  );
};

export default OrderPage;
