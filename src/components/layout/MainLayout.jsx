import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>
      <div className="pl-64 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top header if needed, mockup has a clean top area inside main content block */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
