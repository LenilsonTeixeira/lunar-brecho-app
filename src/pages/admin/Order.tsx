import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, Package, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import OrderView from '../../components/admin/OrderView';
import OrderEdit from '../../components/admin/OrderEdit';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { Order } from '../../types/order';

const OrderPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [viewingOrder, setViewingOrder] = useState<Order | undefined>();
  const [editingOrder, setEditingOrder] = useState<Order | undefined>();
  const [deletingOrder, setDeletingOrder] = useState<Order | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: '#1',
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
        { id: 2, name: 'Blusa Básica Algodão', code: 'BL002', size: 'P', quantity: 2, price: 35.0 },
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
    },
    {
      id: 2,
      orderNumber: '#2',
      customer: 'Ana Paula Costa',
      customerPhone: '(34) 98845-1234',
      products: [
        { id: 3, name: 'Blazer Clássico', code: 'BL003', size: 'G', quantity: 1, price: 95.0 },
      ],
      total: 95.0,
      status: 'aprovado',
      orderDate: '2024-01-21',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. Rondon Pacheco, 456 - Tibery, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38405-142',
        street: 'Av. Rondon Pacheco',
        number: '456',
        complement: '',
        neighborhood: 'Tibery',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
    {
      id: 3,
      orderNumber: '#3',
      customer: 'Fernanda Oliveira',
      customerPhone: '(34) 99789-4321',
      products: [
        { id: 4, name: 'Calça Jeans Skinny', code: 'CJ004', size: '38', quantity: 1, price: 85.0 },
        {
          id: 5,
          name: 'Cropped Top Estampado',
          code: 'CT005',
          size: 'M',
          quantity: 1,
          price: 40.0,
        },
        { id: 6, name: 'Body Rendado', code: 'BR006', size: 'P', quantity: 1, price: 45.0 },
      ],
      total: 170.0,
      status: 'enviado',
      orderDate: '2024-01-20',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua Duque de Caxias, 321 - Fundinho, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38400-000',
        street: 'Rua Duque de Caxias',
        number: '321',
        complement: '',
        neighborhood: 'Fundinho',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
    {
      id: 4,
      orderNumber: '#4',
      customer: 'Carolina Mendes',
      customerPhone: '(34) 99123-8765',
      products: [
        { id: 7, name: 'Sapatos de Salto', code: 'SS007', size: '36', quantity: 1, price: 140.0 },
      ],
      total: 140.0,
      status: 'entregue',
      orderDate: '2024-01-19',
      paymentMethod: 'Cartão de Débito',
      deliveryAddress: 'Av. Cesário Alvim, 654 - Santa Mônica, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38408-100',
        street: 'Av. Cesário Alvim',
        number: '654',
        complement: 'Casa',
        neighborhood: 'Santa Mônica',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
    {
      id: 5,
      orderNumber: '#5',
      customer: 'Patrícia Lima',
      customerPhone: '(34) 99456-7890',
      products: [
        {
          id: 8,
          name: 'Conjunto Shorts + Top',
          code: 'CS008',
          size: 'M',
          quantity: 1,
          price: 85.0,
        },
        { id: 9, name: 'Bolsa de Couro', code: 'BC009', size: 'Único', quantity: 1, price: 89.9 },
      ],
      total: 174.9,
      status: 'cancelado',
      orderDate: '2024-01-18',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua Segismundo Pereira, 987 - Osvaldo Rezende, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38400-000',
        street: 'Rua Segismundo Pereira',
        number: '987',
        complement: '',
        neighborhood: 'Osvaldo Rezende',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
    {
      id: 6,
      orderNumber: '#6',
      customer: 'Luciana Rodrigues',
      customerPhone: '(34) 99876-5432',
      products: [
        {
          id: 10,
          name: 'Vestido Longo Elegante',
          code: 'VL010',
          size: 'G',
          quantity: 1,
          price: 75.0,
        },
        { id: 11, name: 'Blusa Transparente', code: 'BT011', size: 'M', quantity: 1, price: 55.0 },
      ],
      total: 130.0,
      status: 'pendente',
      orderDate: '2024-01-17',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. Anselmo Alves dos Santos, 147 - Shopping Park, Uberlândia/MG',
      deliveryType: 'pickup',
    },
    {
      id: 7,
      orderNumber: '#7',
      customer: 'Gabriela Almeida',
      customerPhone: '(34) 99654-3210',
      products: [
        { id: 12, name: 'Jeans Mom Fit', code: 'JM012', size: '40', quantity: 1, price: 120.0 },
        { id: 13, name: 'Blusa de Seda', code: 'BS013', size: 'P', quantity: 1, price: 85.0 },
      ],
      total: 205.0,
      status: 'aprovado',
      orderDate: '2024-01-16',
      paymentMethod: 'PIX',
      deliveryAddress: 'Av. João Naves de Ávila, 369 - Santa Rosa, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38400-000',
        street: 'Av. João Naves de Ávila',
        number: '369',
        complement: 'Apto 205',
        neighborhood: 'Santa Rosa',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
    {
      id: 8,
      orderNumber: '#8',
      customer: 'Isabela Martins',
      customerPhone: '(34) 99765-4321',
      products: [
        { id: 14, name: 'Body Esportivo', code: 'BE014', size: 'M', quantity: 1, price: 65.0 },
        { id: 15, name: 'Calça Palazzo', code: 'CP015', size: 'G', quantity: 1, price: 95.0 },
        { id: 16, name: 'Cropped Cardigan', code: 'CC016', size: 'P', quantity: 1, price: 75.0 },
      ],
      total: 235.0,
      status: 'enviado',
      orderDate: '2024-01-15',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Rua Coronel Antônio Alves, 741 - Lídice, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38400-000',
        street: 'Rua Coronel Antônio Alves',
        number: '741',
        complement: '',
        neighborhood: 'Lídice',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
    {
      id: 9,
      orderNumber: '#9',
      customer: 'Amanda Pereira',
      customerPhone: '(34) 99234-5678',
      products: [
        { id: 17, name: 'Vestido Midi Floral', code: 'VM017', size: 'M', quantity: 1, price: 65.0 },
      ],
      total: 65.0,
      status: 'entregue',
      orderDate: '2024-01-14',
      paymentMethod: 'PIX',
      deliveryAddress: 'Av. Rondon Pacheco, 852 - Planalto, Uberlândia/MG',
      deliveryType: 'pickup',
    },
    {
      id: 10,
      orderNumber: '#10',
      customer: 'Bianca Santos',
      customerPhone: '(34) 99543-2109',
      products: [
        { id: 18, name: 'Jeans Boyfriend', code: 'JB018', size: '42', quantity: 1, price: 110.0 },
        {
          id: 19,
          name: 'Blusa Básica Algodão',
          code: 'BL019',
          size: 'M',
          quantity: 2,
          price: 35.0,
        },
      ],
      total: 180.0,
      status: 'pendente',
      orderDate: '2024-01-13',
      paymentMethod: 'Cartão de Débito',
      deliveryAddress: 'Rua Professor José Ignácio de Souza, 963 - Jardim Europa, Uberlândia/MG',
      deliveryType: 'delivery',
      address: {
        cep: '38400-000',
        street: 'Rua Professor José Ignácio de Souza',
        number: '963',
        complement: '',
        neighborhood: 'Jardim Europa',
        city: 'Uberlândia',
        state: 'MG',
      },
    },
  ]);

  const statusOptions = [
    'Todos os Status',
    'Pendente',
    'Aprovado',
    'Enviado',
    'Entregue',
    'Cancelado',
  ];

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

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus.toLowerCase() } : order,
      ),
    );
  };

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
  };

  const handleDeleteOrder = (order: Order) => {
    setDeletingOrder(order);
  };

  const handleUpdateOrder = async (updatedOrder: Order) => {
    setIsLoading(true);
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOrders(orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
      setEditingOrder(undefined);
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingOrder) return;

    setIsLoading(true);
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOrders(orders.filter((order) => order.id !== deletingOrder.id));
      setDeletingOrder(undefined);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    const matchesStatus =
      selectedStatus === '' ||
      selectedStatus === 'Todos os Status' ||
      order.status === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
                    Data
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
                          {order.orderNumber}
                        </p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='text-xs sm:text-sm font-medium text-slate-800'>
                          {order.customer}
                        </p>
                        <p className='text-xs text-slate-500'>{order.customerPhone}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='space-y-2'>
                        {order.products.map((product, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between min-w-[200px]'
                          >
                            <span className='text-xs sm:text-sm text-slate-800 flex-1 pr-2'>
                              {product.name}
                            </span>
                            <span className='text-xs sm:text-sm font-medium text-slate-50 bg-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0'>
                              {product.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-xs sm:text-sm font-semibold text-slate-800'>
                        {formatPrice(order.total)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-2 py-1 rounded-sm text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-xs text-slate-600'>{formatDate(order.orderDate)}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <button
                          onClick={() => handleViewOrder(order)}
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          onClick={() => handleEditOrder(order)}
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
                          <div className='absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[120px]'>
                            {statusOptions.slice(1).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
                                className='w-full px-3 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg'
                              >
                                {status}
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

      {/* View Modal */}
      {viewingOrder && (
        <OrderView
          order={viewingOrder}
          onClose={() => setViewingOrder(undefined)}
          onEdit={() => {
            setEditingOrder(viewingOrder);
            setViewingOrder(undefined);
          }}
        />
      )}

      {/* Edit Modal */}
      {editingOrder && (
        <OrderEdit
          order={editingOrder}
          onSubmit={handleUpdateOrder}
          onCancel={() => setEditingOrder(undefined)}
          isLoading={isLoading}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingOrder}
        title='Cancelar Pedido'
        message={`Tem certeza que deseja cancelar o pedido "${deletingOrder?.orderNumber}"? Esta ação não pode ser desfeita.`}
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
