import { useState } from 'react';
import { Search, Bell, BellRing, Trash2, Check, Filter, X } from 'lucide-react';

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
  const [showFilters, setShowFilters] = useState(false);
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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'product':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'user':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'system':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'stock':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
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

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
  };

  const hasActiveFilters = searchTerm || selectedType;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 sm:py-6 lg:py-8'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6'>
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                  <Bell className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                </div>
                <div>
                  <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800'>
                    Notificações
                  </h1>
                  <p className='text-sm sm:text-base text-slate-600'>
                    Gerencie as notificações da loja
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className='flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg'
                >
                  <Check className='w-4 h-4' />
                  <span className='hidden sm:inline'>Marcar como Lidas</span>
                  <span className='sm:hidden'>Marcar Lidas</span>
                </button>
              )}
              <div className='flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold rounded-xl shadow-md'>
                <BellRing className='w-4 h-4' />
                <span className='hidden sm:inline'>{unreadCount} não lidas</span>
                <span className='sm:hidden'>{unreadCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Always Visible */}
        <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            {/* Search Input */}
            <div className='relative flex-1'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar notificações...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 bg-slate-50 focus:bg-white'
              />
            </div>

            {/* Filter Toggle Button - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all duration-300'
            >
              <Filter className='w-4 h-4' />
              Filtros
            </button>

            {/* Clear Filters - Desktop */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className='hidden sm:flex items-center justify-center gap-2 px-4 py-3 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300'
              >
                <X className='w-4 h-4' />
                Limpar
              </button>
            )}
          </div>

          {/* Filters Panel - Mobile */}
          {showFilters && (
            <div className='mt-4 pt-4 border-t border-slate-200'>
              <div className='grid grid-cols-1 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Tipo</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className='w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 bg-slate-50 focus:bg-white'
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className='flex items-center justify-center gap-2 px-4 py-3 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300'
                  >
                    <X className='w-4 h-4' />
                    Limpar Filtros
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Filters - Desktop */}
          <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Tipo de Notificação
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className='w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 bg-slate-50 focus:bg-white'
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <div className='space-y-3 p-4 sm:p-6'>
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group flex flex-col sm:flex-row sm:items-start gap-4 p-4 sm:p-6 bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                    notification.isRead
                      ? 'border-slate-100 hover:border-slate-200'
                      : 'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:border-purple-300'
                  }`}
                >
                  {/* Icon */}
                  <div className='flex-shrink-0 flex justify-center sm:justify-start'>
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-md transition-all duration-300 group-hover:scale-110 ${
                        notification.isRead ? 'bg-slate-100' : 'bg-white shadow-lg'
                      }`}
                    >
                      {notification.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3'>
                      <div className='flex items-start gap-3'>
                        <div className='flex-1'>
                          <h3
                            className={`font-semibold text-base sm:text-lg mb-1 ${
                              notification.isRead ? 'text-slate-700' : 'text-slate-900'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className='w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 mt-1 animate-pulse'></div>
                        )}
                      </div>

                      <div className='flex flex-wrap items-center gap-2'>
                        <span
                          className={`px-3 py-1 text-xs sm:text-sm rounded-full border font-medium ${getPriorityColor(notification.priority)}`}
                        >
                          {getPriorityIcon(notification.priority)} {notification.priority}
                        </span>
                        <span
                          className={`px-3 py-1 text-xs sm:text-sm rounded-full border font-medium ${getTypeColor(notification.type)}`}
                        >
                          {notification.type === 'order' && 'Pedido'}
                          {notification.type === 'product' && 'Produto'}
                          {notification.type === 'user' && 'Usuário'}
                          {notification.type === 'system' && 'Sistema'}
                          {notification.type === 'stock' && 'Estoque'}
                        </span>
                      </div>
                    </div>

                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                      <span className='text-xs sm:text-sm text-slate-500 font-medium'>
                        {formatTimestamp(notification.timestamp)}
                      </span>

                      <div className='flex items-center gap-3'>
                        {notification.action && (
                          <button className='text-sm sm:text-base text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 hover:underline'>
                            {notification.action}
                          </button>
                        )}

                        <div className='flex items-center gap-2'>
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className='p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 hover:scale-110'
                              title='Marcar como lida'
                            >
                              <Check className='w-4 h-4' />
                            </button>
                          )}

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className='p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110'
                            title='Excluir'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className='text-center py-16 sm:py-20'>
              <div className='w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-lg'>
                <Bell className='w-10 h-10 sm:w-12 sm:h-12 text-slate-400' />
              </div>
              <h3 className='text-lg sm:text-xl font-semibold text-slate-800 mb-3'>
                Nenhuma notificação encontrada
              </h3>
              <p className='text-sm sm:text-base text-slate-600 max-w-md mx-auto'>
                {hasActiveFilters
                  ? 'Tente ajustar os filtros para encontrar notificações.'
                  : 'Aguarde novas notificações ou verifique mais tarde.'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className='mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg'
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredNotifications.length > 0 && (
          <div className='mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 sm:p-6'>
            <div className='text-sm sm:text-base text-slate-600 font-medium'>
              Mostrando {filteredNotifications.length} de {notifications.length} notificações
            </div>
            <div className='flex items-center justify-center sm:justify-end gap-2'>
              <button className='px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium'>
                Anterior
              </button>
              <span className='px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base rounded-xl font-semibold shadow-md'>
                1
              </span>
              <button className='px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium'>
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
