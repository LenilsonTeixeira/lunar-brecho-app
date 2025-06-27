import { BarChart3, Package, Users, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total de Produtos',
      value: '1,234',
      icon: <Package className='w-6 h-6' />,
      color: 'bg-blue-500',
    },
    {
      title: 'Usuários Ativos',
      value: '567',
      icon: <Users className='w-6 h-6' />,
      color: 'bg-green-500',
    },
    {
      title: 'Vendas do Mês',
      value: 'R$ 12.345',
      icon: <DollarSign className='w-6 h-6' />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Relatórios',
      value: '89',
      icon: <BarChart3 className='w-6 h-6' />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className='space-y-6 pt-4'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-600 mt-2'>Bem-vindo ao painel administrativo</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div key={index} className='bg-white p-6 rounded-lg shadow-md'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>{stat.title}</p>
                <p className='text-2xl font-bold text-gray-900 mt-1'>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Atividades Recentes</h3>
          <div className='space-y-3'>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <p className='text-sm text-gray-600'>Novo produto adicionado</p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              <p className='text-sm text-gray-600'>Usuário registrado</p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
              <p className='text-sm text-gray-600'>Venda realizada</p>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Resumo Rápido</h3>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Produtos em estoque</span>
              <span className='text-sm font-medium'>1,234</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Vendas hoje</span>
              <span className='text-sm font-medium'>45</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Usuários online</span>
              <span className='text-sm font-medium'>23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
