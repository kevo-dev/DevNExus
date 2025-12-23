
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { route: AppRoute.DASHBOARD, icon: 'fa-chart-line', label: 'Overview' },
    { route: AppRoute.ARCHITECT, icon: 'fa-vial', label: 'AI Architect' },
    { route: AppRoute.METRICS, icon: 'fa-gauge-high', label: 'WebVitals' },
    { route: AppRoute.TRENDS, icon: 'fa-newspaper', label: 'Latest Trends' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shadow-xl transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-500 p-2 rounded-lg">
            <i className="fas fa-cubes text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">DevNexus</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.route}
              to={`/${item.route}`}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
            <img src="https://picsum.photos/40/40" alt="Avatar" className="rounded-full border border-slate-700" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Lead Engineer</p>
              <p className="text-xs text-slate-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600">
              <i className="fas fa-bars text-xl"></i>
            </button>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {location.pathname.replace('/', '') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
              <i className="fas fa-search text-slate-400 text-sm"></i>
              <input type="text" placeholder="Search resources..." className="bg-transparent border-none outline-none text-sm ml-2 w-48" />
            </div>
            <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <i className="fas fa-bell text-lg"></i>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Bottom Nav - Mobile */}
        <nav className="md:hidden bg-white border-t border-slate-200 flex justify-around items-center p-3 sticky bottom-0">
          {navItems.map((item) => (
            <NavLink
              key={item.route}
              to={`/${item.route}`}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 transition-all
                ${isActive ? 'text-blue-600' : 'text-slate-400'}
              `}
            >
              <i className={`fas ${item.icon}`}></i>
              <span className="text-[10px] font-medium uppercase">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
