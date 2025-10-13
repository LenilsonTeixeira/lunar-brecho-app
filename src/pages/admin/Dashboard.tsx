import {
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  FolderOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - substitua por dados reais da sua API
  const dashboardData = {
    stats: {
      totalProducts: 1247,
      totalUsers: 892,
      totalOrders: 156,
      totalCategories: 11,
      totalRevenue: 15420.5,
      newProducts: 89,
      bazarProducts: 1158,
      activeUsers: 234,
      pendingOrders: 23,
      completedOrders: 98,
      cancelledOrders: 12,
      processingOrders: 23,
    },
    topCategories: [
      { name: 'Vestidos', count: 234, percentage: 18.8 },
      { name: 'Blusas', count: 189, percentage: 15.2 },
      { name: 'Calças', count: 156, percentage: 12.5 },
      { name: 'Body', count: 134, percentage: 10.7 },
      { name: 'Jeans', count: 98, percentage: 7.9 },
    ],
    orderStatus: [
      { status: 'Pendente', count: 23, color: 'bg-yellow-500' },
      { status: 'Aprovado', count: 45, color: 'bg-blue-500' },
      { status: 'Processando', count: 23, color: 'bg-purple-500' },
      { status: 'Enviado', count: 34, color: 'bg-indigo-500' },
      { status: 'Entregue', count: 98, color: 'bg-green-500' },
      { status: 'Cancelado', count: 12, color: 'bg-red-500' },
    ],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-800'>Dashboard</h1>
          <p className='text-slate-600 mt-2'>Visão geral da sua loja</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-slate-500'>
          <Clock className='w-4 h-4' />
          <span>Última atualização: há 2 minutos</span>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Total de Produtos</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {formatNumber(dashboardData.stats.totalProducts)}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <TrendingUp className='w-4 h-4 text-green-500' />
                <span className='text-xs text-green-600'>+12% este mês</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white'>
              <Package className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Usuários Ativos</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {formatNumber(dashboardData.stats.activeUsers)}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <TrendingUp className='w-4 h-4 text-green-500' />
                <span className='text-xs text-green-600'>+8% esta semana</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white'>
              <Users className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Vendas do Mês</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {formatCurrency(dashboardData.stats.totalRevenue)}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <TrendingUp className='w-4 h-4 text-green-500' />
                <span className='text-xs text-green-600'>+15% vs mês anterior</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'>
              <DollarSign className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Pedidos Pendentes</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {dashboardData.stats.pendingOrders}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <AlertCircle className='w-4 h-4 text-yellow-500' />
                <span className='text-xs text-yellow-600'>Aguardando aprovação</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white'>
              <ShoppingCart className='w-6 h-6' />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Total de Usuários</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {formatNumber(dashboardData.stats.totalUsers)}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <Users className='w-4 h-4 text-blue-500' />
                <span className='text-xs text-blue-600'>Usuários cadastrados</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white'>
              <Users className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Pedidos Concluídos</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {dashboardData.stats.completedOrders}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <CheckCircle className='w-4 h-4 text-green-500' />
                <span className='text-xs text-green-600'>Entregues com sucesso</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white'>
              <CheckCircle className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Total de Pedidos</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>
                {formatNumber(dashboardData.stats.totalOrders)}
              </p>
              <div className='flex items-center gap-2 mt-2'>
                <ShoppingCart className='w-4 h-4 text-purple-500' />
                <span className='text-xs text-purple-600'>Todos os pedidos</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white'>
              <ShoppingCart className='w-6 h-6' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-600'>Taxa de Conversão</p>
              <p className='text-2xl font-bold text-slate-800 mt-1'>12.5%</p>
              <div className='flex items-center gap-2 mt-2'>
                <TrendingUp className='w-4 h-4 text-orange-500' />
                <span className='text-xs text-orange-600'>Visitas para vendas</span>
              </div>
            </div>
            <div className='p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white'>
              <TrendingUp className='w-6 h-6' />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Product Breakdown */}
        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-slate-800'>Produtos</h3>
            <Package className='w-5 h-5 text-slate-400' />
          </div>
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                <span className='text-sm font-medium text-slate-700'>Produtos Novos</span>
              </div>
              <span className='text-sm font-bold text-slate-800'>
                {dashboardData.stats.newProducts}
              </span>
            </div>
            <div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
                <span className='text-sm font-medium text-slate-700'>Produtos Bazar</span>
              </div>
              <span className='text-sm font-bold text-slate-800'>
                {dashboardData.stats.bazarProducts}
              </span>
            </div>
            <div className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                <span className='text-sm font-medium text-slate-700'>Categorias</span>
              </div>
              <span className='text-sm font-bold text-slate-800'>
                {dashboardData.stats.totalCategories}
              </span>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-slate-800'>Status dos Pedidos</h3>
            <ShoppingCart className='w-5 h-5 text-slate-400' />
          </div>
          <div className='space-y-3'>
            {dashboardData.orderStatus.map((item, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className='text-sm font-medium text-slate-700'>{item.status}</span>
                </div>
                <span className='text-sm font-bold text-slate-800'>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className='bg-white p-6 rounded-xl shadow-lg border border-slate-100'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-slate-800'>Top Categorias</h3>
            <FolderOpen className='w-5 h-5 text-slate-400' />
          </div>
          <div className='space-y-4'>
            {dashboardData.topCategories.map((category, index) => (
              <div key={index} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-slate-700'>{category.name}</span>
                  <span className='text-sm font-bold text-slate-800'>{category.count}</span>
                </div>
                <div className='w-full bg-slate-200 rounded-full h-2'>
                  <div
                    className='bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <span className='text-xs text-slate-500'>{category.percentage}% do total</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
