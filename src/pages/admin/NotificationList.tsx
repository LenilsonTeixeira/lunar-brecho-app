import { useState } from 'react';
import { Search, Bell, BellRing, Trash2, Check } from 'lucide-react';

interface Notification {
  id: number;
  type: 'order' | 'product' | 'user' | 'system' | 'stock';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  icon: string;
  action?: string;
}

const NotificationList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Novo Pedido Recebido',
      message: 'Pedido #1234 foi realizado por Maria Silva Santos',
      timestamp: '2024-01-22T10:30:00',
      isRead: false,
      priority: 'high',
      icon: '🛍️',
      action: 'Ver Pedido',
    },
    {
      id: 2,
      type: 'stock',
      title: 'Estoque Baixo',
      message: 'Produto "Vestido Floral Vintage" está com estoque baixo (2 unidades)',
      timestamp: '2024-01-22T09:15:00',
      isRead: false,
      priority: 'medium',
      icon: '📦',
      action: 'Gerenciar Estoque',
    },
    {
      id: 3,
      type: 'product',
      title: 'Produto Adicionado',
      message: 'Novo produto "Blusa de Seda" foi adicionado ao catálogo',
      timestamp: '2024-01-22T08:45:00',
      isRead: true,
      priority: 'low',
      icon: '👕',
      action: 'Ver Produto',
    },
    {
      id: 4,
      type: 'order',
      title: 'Pedido Enviado',
      message: 'Pedido #1230 foi enviado para entrega',
      timestamp: '2024-01-22T08:20:00',
      isRead: true,
      priority: 'medium',
      icon: '🚚',
      action: 'Acompanhar',
    },
    {
      id: 5,
      type: 'system',
      title: 'Backup Realizado',
      message: 'Backup automático do sistema foi concluído com sucesso',
      timestamp: '2024-01-22T07:00:00',
      isRead: true,
      priority: 'low',
      icon: '💾',
    },
    {
      id: 6,
      type: 'user',
      title: 'Novo Usuário Registrado',
      message: 'Usuário "Ana Paula Costa" se registrou no sistema',
      timestamp: '2024-01-21T23:30:00',
      isRead: false,
      priority: 'medium',
      icon: '👤',
      action: 'Ver Perfil',
    },
    {
      id: 7,
      type: 'order',
      title: 'Pagamento Confirmado',
      message: 'Pagamento do pedido #1228 foi confirmado via PIX',
      timestamp: '2024-01-21T22:15:00',
      isRead: true,
      priority: 'high',
      icon: '💰',
      action: 'Ver Detalhes',
    },
    {
      id: 8,
      type: 'stock',
      title: 'Produto Esgotado',
      message: 'Produto "Calça Jeans Skinny" está completamente esgotado',
      timestamp: '2024-01-21T21:45:00',
      isRead: false,
      priority: 'high',
      icon: '⚠️',
      action: 'Repor Estoque',
    },
  ]);

  const typeOptions = ['Todos os Tipos', 'Pedidos', 'Produtos', 'Usuários', 'Sistema', 'Estoque'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-700';
      case 'product':
        return 'bg-green-100 text-green-700';
      case 'user':
        return 'bg-purple-100 text-purple-700';
      case 'system':
        return 'bg-slate-100 text-slate-700';
      case 'stock':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== notificationId));
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === '' ||
      selectedType === 'Todos os Tipos' ||
      (selectedType === 'Pedidos' && notification.type === 'order') ||
      (selectedType === 'Produtos' && notification.type === 'product') ||
      (selectedType === 'Usuários' && notification.type === 'user') ||
      (selectedType === 'Sistema' && notification.type === 'system') ||
      (selectedType === 'Estoque' && notification.type === 'stock');

    return matchesSearch && matchesType;
  });

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Notificações</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie as notificações da loja
              </p>
            </div>
            <div className='flex items-center gap-3'>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className='flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-3 bg-slate-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300'
                >
                  <Check className='w-4 h-4' />
                  Marcar como Lidas
                </button>
              )}
              <div className='flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg'>
                <BellRing className='w-4 h-4' />
                {unreadCount} não lidas
              </div>
            </div>
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
                placeholder='Buscar notificações...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className='w-full px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
              }}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <div className='space-y-2 p-4'>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
                    notification.isRead ? 'border-slate-200' : 'border-purple-300 bg-purple-50'
                  }`}
                >
                  {/* Icon */}
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl'>
                      {notification.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <h3
                          className={`font-semibold text-sm sm:text-base ${
                            notification.isRead ? 'text-slate-700' : 'text-slate-900'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                        )}
                      </div>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(notification.priority)}`}
                        >
                          {getPriorityIcon(notification.priority)} {notification.priority}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getTypeColor(notification.type)}`}
                        >
                          {notification.type === 'order' && 'Pedido'}
                          {notification.type === 'product' && 'Produto'}
                          {notification.type === 'user' && 'Usuário'}
                          {notification.type === 'system' && 'Sistema'}
                          {notification.type === 'stock' && 'Estoque'}
                        </span>
                      </div>
                    </div>

                    <p className='text-sm text-slate-600 mb-2 line-clamp-2'>
                      {notification.message}
                    </p>

                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-slate-500'>
                        {formatTimestamp(notification.timestamp)}
                      </span>

                      <div className='flex items-center gap-2'>
                        {notification.action && (
                          <button className='text-xs text-purple-600 hover:text-purple-700 font-medium transition-colors'>
                            {notification.action}
                          </button>
                        )}

                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className='p-1 text-green-600 hover:bg-green-50 rounded transition-colors duration-200'
                            title='Marcar como lida'
                          >
                            <Check className='w-3 h-3' />
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className='p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200'
                          title='Excluir'
                        >
                          <Trash2 className='w-3 h-3' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Bell className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                Nenhuma notificação encontrada
              </h3>
              <p className='text-sm sm:text-base text-slate-600'>
                Tente ajustar os filtros ou aguarde novas notificações.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredNotifications.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Mostrando {filteredNotifications.length} de {notifications.length} notificações
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

export default NotificationList;
