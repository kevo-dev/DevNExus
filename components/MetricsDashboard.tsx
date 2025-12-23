
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';

const METRIC_DATA = [
  { name: 'LCP', current: 1.8, target: 2.5, unit: 's' },
  { name: 'FID', current: 45, target: 100, unit: 'ms' },
  { name: 'CLS', current: 0.04, target: 0.1, unit: '' },
  { name: 'INP', current: 120, target: 200, unit: 'ms' },
];

const HISTORICAL_DATA = [
  { day: 'Mon', score: 82 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 88 },
  { day: 'Thu', score: 92 },
  { day: 'Fri', score: 90 },
  { day: 'Sat', score: 94 },
  { day: 'Sun', score: 96 },
];

const BUNDLE_SIZE = [
  { name: 'Framework', value: 45 },
  { name: 'Components', value: 25 },
  { name: 'Assets', value: 15 },
  { name: 'Utils', value: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const MetricsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Core Web Vitals */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800">Core Web Vitals</h3>
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wider">Healthy</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={METRIC_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} width={40} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="current" radius={[0, 4, 4, 0]} barSize={20}>
                {METRIC_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.current < entry.target ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">Lower values represent better performance. Current site vs industry benchmarks.</p>
      </div>

      {/* Performance Score Trend */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-6">Lighthouse Score Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HISTORICAL_DATA}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
              <Tooltip 
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bundle Analysis */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-6">Initial JS Bundle Breakdown</h3>
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-64 w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BUNDLE_SIZE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {BUNDLE_SIZE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            {BUNDLE_SIZE.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Logger */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800">
        <h3 className="font-mono text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
           Live Performance Stream
        </h3>
        <div className="space-y-3 font-mono text-xs text-blue-400/80">
          <p><span className="text-slate-600">[14:02:11]</span> Page transition: /architect -> /metrics <span className="text-green-500">220ms</span></p>
          <p><span className="text-slate-600">[14:02:14]</span> API Call: fetchTrends() <span className="text-green-500">450ms</span></p>
          <p><span className="text-slate-600">[14:02:15]</span> Image Lazy Load: picsum.photos/40/40 <span className="text-green-500">12ms</span></p>
          <p><span className="text-slate-600">[14:02:18]</span> Hydration Complete: AppRoot <span className="text-blue-500">105ms</span></p>
          <p><span className="text-slate-600">[14:03:01]</span> Next.js Server Side Rendering (Edge) <span className="text-green-500">45ms</span></p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
