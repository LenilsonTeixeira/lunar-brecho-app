import { Outlet } from 'react-router';
import Sidebar from '@/components/admin/sidebar/Sidebar';

const Layout = () => {
  return (
    <div className='h-screen bg-slate-50 flex overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
