import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, Package, Settings } from 'lucide-react';

const Order = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: '#1',
      customer: 'Maria Silva Santos',
      customerPhone: '(34) 99668-3137',
      products: [
        { name: 'Vestido Floral Vintage', quantity: 1, price: 59.9 },
        { name: 'Blusa Básica Algodão', quantity: 2, price: 35.0 },
      ],
      total: 129.9,
      status: 'pendente',
      orderDate: '2024-01-22',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua das Flores, 123 - Centro, Uberlândia/MG',
    },
    {
      id: 2,
      orderNumber: '#2',
      customer: 'Ana Paula Costa',
      customerPhone: '(34) 98845-1234',
      products: [{ name: 'Blazer Clássico', quantity: 1, price: 95.0 }],
      total: 95.0,
      status: 'aprovado',
      orderDate: '2024-01-21',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. Rondon Pacheco, 456 - Tibery, Uberlândia/MG',
    },
    {
      id: 3,
      orderNumber: '#3',
      customer: 'Fernanda Oliveira',
      customerPhone: '(34) 99789-4321',
      products: [
        { name: 'Calça Jeans Skinny', quantity: 1, price: 85.0 },
        { name: 'Cropped Top Estampado', quantity: 1, price: 40.0 },
        { name: 'Body Rendado', quantity: 1, price: 45.0 },
      ],
      total: 170.0,
      status: 'enviado',
      orderDate: '2024-01-20',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua Duque de Caxias, 321 - Fundinho, Uberlândia/MG',
    },
    {
      id: 4,
      orderNumber: '#4',
      customer: 'Carolina Mendes',
      customerPhone: '(34) 99123-8765',
      products: [{ name: 'Sapatos de Salto', quantity: 1, price: 140.0 }],
      total: 140.0,
      status: 'entregue',
      orderDate: '2024-01-19',
      paymentMethod: 'Cartão de Débito',
      deliveryAddress: 'Av. Cesário Alvim, 654 - Santa Mônica, Uberlândia/MG',
    },
    {
      id: 5,
      orderNumber: '#5',
      customer: 'Patrícia Lima',
      customerPhone: '(34) 99456-7890',
      products: [
        { name: 'Conjunto Shorts + Top', quantity: 1, price: 85.0 },
        { name: 'Bolsa de Couro', quantity: 1, price: 89.9 },
      ],
      total: 174.9,
      status: 'cancelado',
      orderDate: '2024-01-18',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua Segismundo Pereira, 987 - Osvaldo Rezende, Uberlândia/MG',
    },
    {
      id: 6,
      orderNumber: '#6',
      customer: 'Luciana Rodrigues',
      customerPhone: '(34) 99876-5432',
      products: [
        { name: 'Vestido Longo Elegante', quantity: 1, price: 75.0 },
        { name: 'Blusa Transparente', quantity: 1, price: 55.0 },
      ],
      total: 130.0,
      status: 'pendente',
      orderDate: '2024-01-17',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. Anselmo Alves dos Santos, 147 - Shopping Park, Uberlândia/MG',
    },
    {
      id: 7,
      orderNumber: '#7',
      customer: 'Gabriela Almeida',
      customerPhone: '(34) 99654-3210',
      products: [
        { name: 'Jeans Mom Fit', quantity: 1, price: 120.0 },
        { name: 'Blusa de Seda', quantity: 1, price: 85.0 },
      ],
      total: 205.0,
      status: 'aprovado',
      orderDate: '2024-01-16',
      paymentMethod: 'PIX',
      deliveryAddress: 'Av. João Naves de Ávila, 369 - Santa Rosa, Uberlândia/MG',
    },
    {
      id: 8,
      orderNumber: '#8',
      customer: 'Isabela Martins',
      customerPhone: '(34) 99765-4321',
      products: [
        { name: 'Body Esportivo', quantity: 1, price: 65.0 },
        { name: 'Calça Palazzo', quantity: 1, price: 95.0 },
        { name: 'Cropped Cardigan', quantity: 1, price: 75.0 },
      ],
      total: 235.0,
      status: 'enviado',
      orderDate: '2024-01-15',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Rua Coronel Antônio Alves, 741 - Lídice, Uberlândia/MG',
    },
    {
      id: 9,
      orderNumber: '#9',
      customer: 'Amanda Pereira',
      customerPhone: '(34) 99234-5678',
      products: [{ name: 'Vestido Midi Floral', quantity: 1, price: 65.0 }],
      total: 65.0,
      status: 'entregue',
      orderDate: '2024-01-14',
      paymentMethod: 'PIX',
      deliveryAddress: 'Av. Rondon Pacheco, 852 - Planalto, Uberlândia/MG',
    },
    {
      id: 10,
      orderNumber: '#10',
      customer: 'Bianca Santos',
      customerPhone: '(34) 99543-2109',
      products: [
        { name: 'Jeans Boyfriend', quantity: 1, price: 110.0 },
        { name: 'Blusa Básica Algodão', quantity: 2, price: 35.0 },
      ],
      total: 180.0,
      status: 'pendente',
      orderDate: '2024-01-13',
      paymentMethod: 'Cartão de Débito',
      deliveryAddress: 'Rua Professor José Ignácio de Souza, 963 - Jardim Europa, Uberlândia/MG',
    },
    {
      id: 11,
      orderNumber: '#11',
      customer: 'Roberta Ferreira',
      customerPhone: '(34) 99432-1098',
      products: [
        { name: 'Conjunto Pijama', quantity: 1, price: 85.0 },
        { name: 'Body Lace', quantity: 1, price: 65.0 },
      ],
      total: 150.0,
      status: 'aprovado',
      orderDate: '2024-01-12',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua João Pinheiro, 753 - Martins, Uberlândia/MG',
    },
    {
      id: 12,
      orderNumber: '#12',
      customer: 'Tatiana Oliveira',
      customerPhone: '(34) 99789-0123',
      products: [
        { name: 'Blazer Clássico', quantity: 1, price: 95.0 },
        { name: 'Calça Jeans Skinny', quantity: 1, price: 85.0 },
      ],
      total: 180.0,
      status: 'enviado',
      orderDate: '2024-01-11',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. Rondon Pacheco, 456 - Tibery, Uberlândia/MG',
    },
    {
      id: 13,
      orderNumber: '#13',
      customer: 'Camila Silva',
      customerPhone: '(34) 99111-2222',
      products: [
        { name: 'Vestido Floral Vintage', quantity: 1, price: 59.9 },
        { name: 'Blusa Básica Algodão', quantity: 1, price: 35.0 },
        { name: 'Body Rendado', quantity: 1, price: 45.0 },
      ],
      total: 139.9,
      status: 'pendente',
      orderDate: '2024-01-10',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua das Palmeiras, 789 - Centro, Uberlândia/MG',
    },
    {
      id: 14,
      orderNumber: '#14',
      customer: 'Juliana Costa',
      customerPhone: '(34) 99222-3333',
      products: [
        { name: 'Blazer Clássico', quantity: 1, price: 95.0 },
        { name: 'Calça Palazzo', quantity: 1, price: 95.0 },
      ],
      total: 190.0,
      status: 'aprovado',
      orderDate: '2024-01-09',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. Cesário Alvim, 321 - Santa Mônica, Uberlândia/MG',
    },
    {
      id: 15,
      orderNumber: '#15',
      customer: 'Mariana Santos',
      customerPhone: '(34) 99333-4444',
      products: [
        { name: 'Sapatos de Salto', quantity: 1, price: 140.0 },
        { name: 'Bolsa de Couro', quantity: 1, price: 89.9 },
      ],
      total: 229.9,
      status: 'enviado',
      orderDate: '2024-01-08',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua Duque de Caxias, 654 - Fundinho, Uberlândia/MG',
    },
    {
      id: 16,
      orderNumber: '#16',
      customer: 'Fernanda Lima',
      customerPhone: '(34) 99444-5555',
      products: [
        { name: 'Jeans Mom Fit', quantity: 1, price: 120.0 },
        { name: 'Cropped Top Estampado', quantity: 1, price: 40.0 },
      ],
      total: 160.0,
      status: 'entregue',
      orderDate: '2024-01-07',
      paymentMethod: 'Cartão de Débito',
      deliveryAddress: 'Av. Rondon Pacheco, 147 - Tibery, Uberlândia/MG',
    },
    {
      id: 17,
      orderNumber: '#17',
      customer: 'Carolina Almeida',
      customerPhone: '(34) 99555-6666',
      products: [
        { name: 'Conjunto Shorts + Top', quantity: 1, price: 85.0 },
        { name: 'Body Esportivo', quantity: 1, price: 65.0 },
      ],
      total: 150.0,
      status: 'pendente',
      orderDate: '2024-01-06',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua João Pinheiro, 456 - Martins, Uberlândia/MG',
    },
    {
      id: 18,
      orderNumber: '#18',
      customer: 'Patrícia Martins',
      customerPhone: '(34) 99666-7777',
      products: [
        { name: 'Vestido Longo Elegante', quantity: 1, price: 75.0 },
        { name: 'Blusa Transparente', quantity: 1, price: 55.0 },
        { name: 'Body Lace', quantity: 1, price: 65.0 },
      ],
      total: 195.0,
      status: 'aprovado',
      orderDate: '2024-01-05',
      paymentMethod: 'Cartão de Crédito',
      deliveryAddress: 'Av. João Naves de Ávila, 852 - Santa Rosa, Uberlândia/MG',
    },
    {
      id: 19,
      orderNumber: '#19',
      customer: 'Luciana Oliveira',
      customerPhone: '(34) 99777-8888',
      products: [
        { name: 'Jeans Boyfriend', quantity: 1, price: 110.0 },
        { name: 'Blusa de Seda', quantity: 1, price: 85.0 },
      ],
      total: 195.0,
      status: 'enviado',
      orderDate: '2024-01-04',
      paymentMethod: 'PIX',
      deliveryAddress: 'Rua Coronel Antônio Alves, 963 - Lídice, Uberlândia/MG',
    },
    {
      id: 20,
      orderNumber: '#20',
      customer: 'Gabriela Rodrigues',
      customerPhone: '(34) 99888-9999',
      products: [
        { name: 'Vestido Midi Floral', quantity: 1, price: 65.0 },
        { name: 'Cropped Cardigan', quantity: 1, price: 75.0 },
      ],
      total: 140.0,
      status: 'entregue',
      orderDate: '2024-01-03',
      paymentMethod: 'Cartão de Débito',
      deliveryAddress: 'Av. Cesário Alvim, 741 - Santa Mônica, Uberlândia/MG',
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
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Pedidos</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie os pedidos e entregas da sua loja
              </p>
            </div>
            <button className='flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
              <Plus className='w-4 h-4' />
              Novo Pedido
            </button>
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
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[180px]'>
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
                    Pagamento
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
                      <div className='space-y-1'>
                        {order.products.map((product, index) => (
                          <div key={index} className='text-xs sm:text-sm'>
                            <span className='text-slate-800'>{product.name}</span>
                            <span className='text-slate-500 ml-2'>x{product.quantity}</span>
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
                      <span className='text-xs text-slate-600'>{order.paymentMethod}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <button
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                          title='Editar'
                        >
                          <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <div className='relative group'>
                          <button
                            className='p-1.5 sm:p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200'
                            title='Alterar Status'
                          >
                            <Settings className='w-3 h-3 sm:w-4 sm:h-4' />
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
    </div>
  );
};

export default Order;
