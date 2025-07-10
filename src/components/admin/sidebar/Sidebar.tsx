import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ShoppingCart,
  FolderOpen,
  Bell,
  Tag,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import MoonIcon from '../../icon/MoonIcon';

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard />,
    path: '/admin',
  },
  {
    label: 'Produtos',
    icon: <Package />,
    path: '/admin/produtos',
  },
  {
    label: 'Categorias',
    icon: <FolderOpen />,
    path: '/admin/categorias',
  },
  {
    label: 'Cupons',
    icon: <Tag />,
    path: '/admin/cupons',
  },
  {
    label: 'Pedidos',
    icon: <ShoppingCart />,
    path: '/admin/pedidos',
  },
  {
    label: 'Notificações',
    icon: <Bell />,
    path: '/admin/notificacoes',
  },
  {
    label: 'Usuários',
    icon: <Users />,
    path: '/admin/usuarios',
  },
  {
    label: 'Configurações',
    icon: <Settings />,
    path: '/admin/configuracoes',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log('Logout clicked');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-colors'
        aria-label='Toggle menu'
      >
        {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className='lg:hidden fixed inset-0 bg-black/50 z-40' onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-56
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        h-screen text-base border-r border-slate-100 
        flex flex-col bg-slate-950 shadow-2xl
      `}
      >
        {/* Logo Section */}
        <div className='p-6 border-b border-slate-200 bg-white'>
          <Link
            to='/'
            onClick={closeSidebar}
            className='flex gap-2 items-center justify-center hover:text-purple-600 transition-all text-slate-700 hover:scale-105 duration-300'
          >
            <MoonIcon className='w-7 h-7' />
            <h1 className='text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              LUNAR
            </h1>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className='flex-1 pt-6'>
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                key={index}
                onClick={closeSidebar}
                className={`flex items-center py-4 px-6 gap-3 transition-all duration-300 relative group
                              ${
                                isActive
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                                  : 'hover:bg-white text-slate-50 hover:text-slate-800'
                              }`}
              >
                {/* Active indicator - left border */}
                {isActive && (
                  <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400'></div>
                )}

                {/* Hover indicator */}
                {!isActive && (
                  <div className='absolute left-0 top-0 bottom-0 w-1 bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                )}

                <div className='flex items-center gap-3 w-full'>
                  <div
                    className={`transition-all duration-300 flex-shrink-0 ${
                      isActive ? 'transform scale-110' : 'group-hover:scale-105'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`font-medium transition-all duration-300 flex-1 ${
                      isActive ? 'text-white' : 'text-slate-50 group-hover:text-slate-800'
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className='p-4 border-t border-slate-200 bg-slate-950'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center py-3 px-4 gap-3 transition-all duration-300 rounded-lg hover:bg-red-50 text-slate-50 hover:text-red-600 group'
          >
            <div className='transition-all duration-300 flex-shrink-0 group-hover:scale-105'>
              <LogOut className='w-5 h-5' />
            </div>
            <span className='font-medium transition-all duration-300 flex-1 text-left'>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
