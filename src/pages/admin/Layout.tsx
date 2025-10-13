import { Outlet } from 'react-router';
import Sidebar from '@/components/admin/sidebar/Sidebar';
import UserHeader from '@/components/admin/UserHeader';
import { FeatureFlagsProvider } from '@/contexts/FeatureFlagsContext';

const Layout = () => {
  return (
    <FeatureFlagsProvider>
      <div className='h-screen bg-slate-50 flex overflow-hidden'>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden lg:ml-0'>
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
    </FeatureFlagsProvider>
  );
};

export default Layout;
