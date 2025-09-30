import { Bell, BellRing, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

const UserHeader = () => {
  const navigate = useNavigate();
  const [hasNotifications] = useState(true);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className='flex items-center justify-end bg-white h-20 px-6'>
      {/* Right Section - User and Notifications */}
      <div className='flex items-center gap-4'>
        {/* Notifications */}
        <button
          onClick={() => navigate('/admin/notificacoes/lista')}
          className='relative p-3 rounded-lg hover:bg-slate-100 transition-all duration-300 group'
          aria-label='Notificações'
        >
          {hasNotifications ? (
            <BellRing className='w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors' />
          ) : (
            <Bell className='w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors' />
          )}
          {hasNotifications && (
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-sm'></div>
          )}
        </button>

        {/* User Info */}
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img
              className='h-10 w-10 rounded-full ring-2 ring-purple-500/30 shadow-md'
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'
              alt='userImage1'
            />
            <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm'></div>
          </div>
          <div className='hidden sm:block'>
            <p className='text-sm font-semibold text-slate-800'>
              {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
            </p>
            <p className='text-xs text-slate-500'>{user?.email || 'Administradora'}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='p-2 rounded-lg hover:bg-red-50 transition-all duration-300 group'
            aria-label='Sair'
            title='Sair'
          >
            <LogOut className='w-5 h-5 text-slate-600 group-hover:text-red-600 transition-colors' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
