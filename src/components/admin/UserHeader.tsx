import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

const UserHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return 'AD';
  };

  return (
    <div className='flex items-center justify-end bg-white h-20 px-6'>
      {/* Right Section - User and Notifications */}
      <div className='flex items-center gap-4'>
        {/* User Info */}
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <div className='h-10 w-10 rounded-full ring-2 ring-purple-500/30 shadow-md bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center'>
              <span className='text-white font-semibold text-sm'>{getUserInitials()}</span>
            </div>
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
