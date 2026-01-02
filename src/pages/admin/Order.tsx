import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Plus, Package, Check, X } from 'lucide-react';
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
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrders(0, 100);

      // Tratar diferentes formatos de resposta
      let ordersList: OrderResponse[] = [];

      if (Array.isArray(response)) {
        ordersList = response;
      } else if (response && typeof response === 'object') {
        // Se a resposta for paginada (com content ou data)
        const responseObj = response as any;
        if ('content' in responseObj && Array.isArray(responseObj.content)) {
          ordersList = responseObj.content;
        } else if ('data' in responseObj && Array.isArray(responseObj.data)) {
          ordersList = responseObj.data;
        } else if ('items' in responseObj && Array.isArray(responseObj.items)) {
          ordersList = responseObj.items;
        }
      }

      setOrders(ordersList);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error('Erro ao carregar pedidos:', err);
      setOrders([]); // Garantir que orders seja sempre um array
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: 'PENDING', label: 'Pendente' },
    { value: 'APPROVED', label: 'Aprovado' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregue' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-300 text-slate-950';
      case 'APPROVED':
        return 'bg-blue-300 text-slate-950';
      case 'SHIPPED':
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
    const statusOption = statusOptions.find((option) => option.value === status);
    return statusOption ? statusOption.label : status;
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId],
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    }
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    try {
      const promises = selectedOrders.map((orderId) =>
        orderService.updateOrderStatus(orderId, { status: newStatus as any }),
      );
      await Promise.all(promises);
      await loadOrders();
      setSelectedOrders([]);
      setShowStatusModal(false);
    } catch (error) {
      console.error('Erro ao atualizar status dos pedidos:', error);
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
    const matchesStatus = selectedStatus === '' || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='py-6 flex flex-col bg-slate-50 min-h-screen'>
        <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
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
      <div className='py-6 flex flex-col bg-slate-50 min-h-screen'>
        <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
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
    <div className='py-6 flex flex-col bg-slate-50 min-h-screen'>
      <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
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
                  <option key={status.value} value={status.value}>
                    {status.label}
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

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className='bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='flex items-center gap-2'>
                <Check className='w-5 h-5 text-purple-600' />
                <span className='text-sm font-medium text-purple-800'>
                  {selectedOrders.length} pedido{selectedOrders.length > 1 ? 's' : ''} selecionado
                  {selectedOrders.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setShowStatusModal(true)}
                  className='px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200'
                >
                  Alterar Status
                </button>
                <button
                  onClick={() => setSelectedOrders([])}
                  className='px-4 py-2 text-purple-600 border border-purple-300 text-sm font-medium rounded-lg hover:bg-purple-50 transition-colors duration-200'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[1150px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[50px]'>
                    <input
                      type='checkbox'
                      checked={
                        selectedOrders.length === filteredOrders.length && filteredOrders.length > 0
                      }
                      onChange={handleSelectAll}
                      className='w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                    />
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[140px]'>
                    Pedido
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Cliente
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[300px]'>
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
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[150px]'>
                    Data de Criação
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
                      <input
                        type='checkbox'
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className='w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                      />
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='text-xs sm:text-sm font-medium text-slate-800'>
                          #{order.externalId || order.id}
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
                      <div className='space-y-3'>
                        {order.items.map((item, index) => (
                          <div key={index} className='flex items-center gap-3 min-w-[280px]'>
                            {/* Thumbnail da imagem */}
                            <div className='flex-shrink-0'>
                              {item.mainThumbnailImageUrl ? (
                                <img
                                  src={item.mainThumbnailImageUrl}
                                  alt={item.name}
                                  className='w-12 h-12 rounded-lg object-cover border border-slate-200'
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className='w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center'>
                                  <Package className='w-5 h-5 text-slate-400' />
                                </div>
                              )}
                            </div>

                            {/* Informações do produto */}
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center gap-2 mb-1'>
                                <span className='text-xs sm:text-sm font-medium text-slate-800 truncate'>
                                  {item.name}
                                </span>
                                <span className='text-xs sm:text-sm font-medium text-slate-50 bg-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0'>
                                  {item.quantity}
                                </span>
                              </div>
                              <div className='flex items-center gap-2 text-xs text-slate-500'>
                                <span className='truncate'>{item.brand}</span>
                                <span className='text-slate-300'>•</span>
                                <span className='font-mono'>
                                  #{item.externalId || item.sku || '-'}
                                </span>
                              </div>
                            </div>
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
                      <span className='text-xs text-slate-600'>{formatDate(order.createdAt)}</span>
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

      {/* Status Change Modal */}
      {showStatusModal && (
        <div
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4'
          onClick={() => setShowStatusModal(false)}
        >
          <div
            className='bg-white rounded-xl shadow-2xl max-w-md w-full mx-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-slate-800'>Alterar Status</h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className='text-slate-400 hover:text-slate-600 transition-colors p-1'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>

              <p className='text-sm text-slate-600 mb-6'>
                Selecione o novo status para {selectedOrders.length} pedido
                {selectedOrders.length > 1 ? 's' : ''} selecionado
                {selectedOrders.length > 1 ? 's' : ''}:
              </p>

              <div className='space-y-3 mb-6'>
                {statusOptions.slice(1).map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleBulkStatusChange(status.value)}
                    className={`w-full px-4 py-3 text-left border rounded-lg transition-all duration-200 ${getStatusColor(status.value)} hover:opacity-80`}
                  >
                    <span className='text-sm font-medium'>{status.label}</span>
                  </button>
                ))}
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className='flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200'
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
