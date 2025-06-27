import { Outlet } from 'react-router';
import Sidebar from '@/components/admin/sidebar/Sidebar';
import UserHeader from '@/components/admin/UserHeader';

const Layout = () => {
  return (
    <div className='h-screen bg-slate-50 flex overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Fixed Header */}
        <div className='flex-shrink-0'>
          <UserHeader />
        </div>

        {/* Scrollable Content */}
        <main className='flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
