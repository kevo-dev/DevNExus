
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MetricsDashboard from './components/MetricsDashboard';
import ArchitectView from './components/ArchitectView';
import TrendsView from './components/TrendsView';
import { AppRoute } from './types';

const DashboardHome: React.FC = () => (
  <div className="space-y-8">
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Lead Architect! 🚀</h1>
        <p className="text-slate-600 text-lg">Your Next.js applications are performing within expected parameters. Last deployment was successful 2 hours ago.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-blue-50 rounded-xl flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm font-semibold text-blue-900">Edge Runtime: Active</span>
          </div>
          <div className="px-4 py-2 bg-purple-50 rounded-xl flex items-center gap-3">
            <i className="fas fa-code-branch text-purple-600"></i>
            <span className="text-sm font-semibold text-purple-900">Version: v15.0.0-canary</span>
          </div>
        </div>
      </div>
      <div className="w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-4xl font-black text-blue-600">98</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Global Health</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
          <i className="fas fa-rocket"></i>
        </div>
        <h3 className="font-bold text-slate-800 mb-1">Quick Start</h3>
        <p className="text-sm text-slate-500 mb-4">Scaffold a new Next.js project using our AI patterns.</p>
        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2">
          New Project <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
          <i className="fas fa-search"></i>
        </div>
        <h3 className="font-bold text-slate-800 mb-1">Audit Site</h3>
        <p className="text-sm text-slate-500 mb-4">Run a real-time Core Web Vitals audit on any URL.</p>
        <button className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-2">
          Start Audit <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h3 className="font-bold text-slate-800 mb-1">Learn New Patterns</h3>
        <p className="text-sm text-slate-500 mb-4">Master Server Actions and Parallel Routing in Next.js.</p>
        <button className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-2">
          Open Docs <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    
    <MetricsDashboard />
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to={`/${AppRoute.DASHBOARD}`} replace />} />
          <Route path={`/${AppRoute.DASHBOARD}`} element={<DashboardHome />} />
          <Route path={`/${AppRoute.ARCHITECT}`} element={<ArchitectView />} />
          <Route path={`/${AppRoute.METRICS}`} element={<MetricsDashboard />} />
          <Route path={`/${AppRoute.TRENDS}`} element={<TrendsView />} />
          <Route path="*" element={<div className="p-10 text-center text-slate-500">Page not found</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
