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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  UserCheck,
  ChevronRight,
  Calculator,
  Flag,
  Store,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useState, useEffect, useMemo } from 'react';
import MoonIcon from '../../icon/MoonIcon';
import { useFeatureFlagsContext } from '@/contexts/FeatureFlagsContext';
import { useAuth } from '@/contexts/AuthContext';

// Definição dos grupos do sidebar com mapeamento para feature flags
const getSidebarGroups = (
  isFeatureEnabled: (flag: keyof import('@/hooks/useFeatureFlags').FeatureFlags) => boolean,
  isSuperAdmin: boolean,
  userRole: string,
) => [
  {
    id: 'overview',
    label: 'Visão Geral',
    items: [
      {
        label: 'Dashboard',
        icon: <LayoutDashboard />,
        path: '/admin',
        enabled: isFeatureEnabled('dashboard'), // Dashboard respeita feature flag para todos
      },
      {
        label: 'Feature Flags',
        icon: <Flag />,
        path: '/admin/feature-flags',
        enabled: isSuperAdmin, // Feature Flags apenas para Super Admins
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Gestão de Estoque',
    items: [
      {
        label: 'Produtos',
        icon: <Package />,
        path: '/admin/produtos',
        enabled: isFeatureEnabled('products'),
      },
      {
        label: 'Categorias',
        icon: <FolderOpen />,
        path: '/admin/categorias',
        enabled: isFeatureEnabled('categories'),
      },
    ],
  },
  {
    id: 'partners',
    label: 'Parceiros',
    items: [
      {
        label: 'Consignantes',
        icon: <UserCheck />,
        path: '/admin/consignantes',
        enabled: isFeatureEnabled('consignors'),
      },
      {
        label: 'Fornecedores',
        icon: <Building2 />,
        path: '/admin/fornecedores',
        enabled: isFeatureEnabled('suppliers'),
      },
    ],
  },
  {
    id: 'sales',
    label: 'Vendas & Marketing',
    items: [
      {
        label: 'Clientes',
        icon: <Users />,
        path: '/admin/clientes',
        enabled:
          isFeatureEnabled('customers') &&
          (userRole?.toUpperCase() === 'ADMIN' || userRole?.toUpperCase() === 'SUPER_ADMIN'),
      },
      {
        label: 'Pedidos',
        icon: <ShoppingCart />,
        path: '/admin/pedidos',
        enabled:
          isFeatureEnabled('orders') &&
          (userRole?.toUpperCase() === 'ADMIN' || userRole?.toUpperCase() === 'SUPER_ADMIN'),
      },
      {
        label: 'Cupons',
        icon: <Tag />,
        path: '/admin/cupons',
        enabled: isFeatureEnabled('coupons'),
      },
    ],
  },
  {
    id: 'finance',
    label: 'Financeiro',
    items: [
      {
        label: 'Contas a Receber',
        icon: <TrendingUp />,
        path: '/admin/contas-receber',
        enabled: isFeatureEnabled('accountsReceivable'),
      },
      {
        label: 'Contas a Pagar',
        icon: <TrendingDown />,
        path: '/admin/contas-pagar',
        enabled: isFeatureEnabled('accountsPayable'),
      },
      {
        label: 'Fluxo de Caixa',
        icon: <DollarSign />,
        path: '/admin/fluxo-caixa',
        enabled: isFeatureEnabled('cashFlow'),
      },
      {
        label: 'Simulação de Lucro',
        icon: <Calculator />,
        path: '/admin/simulacao-lucro',
        enabled: isFeatureEnabled('profitSimulation'),
      },
    ],
  },
  {
    id: 'system',
    label: 'Sistema',
    items: [
      {
        label: 'Lojas',
        icon: <Store />,
        path: '/admin/lojas',
        enabled: isSuperAdmin, // Apenas para Super Admins
      },
      {
        label: 'Usuários',
        icon: <Users />,
        path: '/admin/usuarios',
        enabled: isFeatureEnabled('users'),
      },
      {
        label: 'Notificações',
        icon: <Bell />,
        path: '/admin/notificacoes',
        enabled: isFeatureEnabled('notifications'),
      },
      {
        label: 'Configurações',
        icon: <Settings />,
        path: '/admin/configuracoes',
        enabled: isFeatureEnabled('configurations'),
      },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const { isFeatureEnabled } = useFeatureFlagsContext();
  const { user } = useAuth();

  // Verifica se o usuário é super admin (aceita tanto SUPER_ADMIN quanto super_admin)
  const isSuperAdmin = user?.role?.toUpperCase() === 'SUPER_ADMIN';

  // Obtém os grupos do sidebar com base nas feature flags (memoizado para evitar recriação)
  const sidebarGroups = useMemo(
    () => getSidebarGroups(isFeatureEnabled, isSuperAdmin, user?.role || ''),
    [isFeatureEnabled, isSuperAdmin, user?.role],
  );

  // Expandir automaticamente o grupo Sistema se o usuário for super admin e tiver itens habilitados
  useEffect(() => {
    if (isSuperAdmin) {
      setCollapsedGroups((prev) => {
        // Só atualiza se o grupo ainda estiver colapsado
        if (prev.has('system')) {
          const newSet = new Set(prev);
          newSet.delete('system');
          return newSet;
        }
        return prev;
      });
    }
  }, [isSuperAdmin]); // Apenas depende de isSuperAdmin para evitar loop infinito

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleGroup = (groupId: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupId)) {
      newCollapsed.delete(groupId);
    } else {
      newCollapsed.add(groupId);
    }
    setCollapsedGroups(newCollapsed);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    // console.log('Logout clicked');
  };

  // Function to check if a menu item is active
  const isMenuItemActive = (itemPath: string) => {
    // For dashboard, check exact match
    if (itemPath === '/admin') {
      return location.pathname === '/admin';
    }

    // For other items, check if current path starts with the item path
    // This allows sub-routes like /admin/produtos/adicionar to be considered active for /admin/produtos
    return location.pathname.startsWith(itemPath);
  };

  // Check if any item in a group is active
  const isGroupActive = (group: (typeof sidebarGroups)[0]) => {
    return group.items.some((item) => isMenuItemActive(item.path));
  };

  // Check if a group has any enabled items
  const hasEnabledItems = (group: (typeof sidebarGroups)[0]) => {
    return group.items.some((item) => item.enabled);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className='lg:hidden fixed top-4 left-4 z-[60] p-3 rounded-lg bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-colors'
        aria-label='Toggle menu'
      >
        {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className='lg:hidden fixed inset-0 bg-black/50 z-[50]' onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-[55]
        w-64
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
        <div className='flex-1 pt-4 overflow-y-auto'>
          {sidebarGroups.map((group) => {
            const isGroupCollapsed = collapsedGroups.has(group.id);
            const hasActiveItem = isGroupActive(group);
            const groupHasEnabledItems = hasEnabledItems(group);

            // Não renderiza o grupo se não tiver itens habilitados
            if (!groupHasEnabledItems) {
              return null;
            }

            return (
              <div key={group.id} className='mb-2'>
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between py-3 px-4 text-left transition-all duration-300 group
                    ${
                      hasActiveItem
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border-l-2 border-purple-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                >
                  <span
                    className={`font-semibold text-sm uppercase tracking-wider transition-all duration-300
                    ${hasActiveItem ? 'text-purple-300' : 'text-slate-400 group-hover:text-slate-200'}`}
                  >
                    {group.label}
                  </span>
                  <div
                    className={`transition-transform duration-300 ${isGroupCollapsed ? 'rotate-0' : 'rotate-90'}`}
                  >
                    <ChevronRight className='w-4 h-4' />
                  </div>
                </button>

                {/* Group Items */}
                {!isGroupCollapsed && (
                  <div className='ml-2'>
                    {group.items.map((item, index) => {
                      const isActive = isMenuItemActive(item.path);

                      // Se o item não estiver habilitado, não renderiza
                      if (!item.enabled) {
                        return null;
                      }

                      return (
                        <Link
                          to={item.path}
                          key={index}
                          onClick={closeSidebar}
                          className={`flex items-center py-2.5 px-4 gap-3 transition-all duration-300 relative group rounded-r-lg mx-2
                            ${
                              isActive
                                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                                : 'hover:bg-white text-slate-50 hover:text-slate-800'
                            }`}
                        >
                          {/* Active indicator - left border */}
                          {isActive && (
                            <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full'></div>
                          )}

                          {/* Hover indicator */}
                          {!isActive && (
                            <div className='absolute left-0 top-0 bottom-0 w-1 bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-full'></div>
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
                              className={`font-medium transition-all duration-300 flex-1 text-sm ${
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
                )}
              </div>
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
