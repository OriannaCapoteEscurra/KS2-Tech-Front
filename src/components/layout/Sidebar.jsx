import { Link, useLocation } from 'react-router-dom';
import { Home, User, PieChart, Activity, ClipboardList, Settings, Clock, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  // { name: 'Perfil', path: '/profile', icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="w-64 bg-primary min-h-screen text-surface flex flex-col pt-6 pb-4">
      <div className="px-6 mb-8 flex items-center space-x-3">
        <Home className="w-8 h-8" />
        <span className="text-xl font-bold tracking-wider">Dashboard</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors group",
                isActive
                  ? "bg-white/10 font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-8">
        <div className="mb-4 px-4 py-3 rounded-lg bg-white/5 mx-2 border border-white/10">
          <div className="text-sm font-medium truncate">{user?.name || 'Admin User'}</div>
          <div className="text-xs text-gray-400 truncate">{user?.email || 'admin@example.com'}</div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-4 px-6 py-3 text-gray-300 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
