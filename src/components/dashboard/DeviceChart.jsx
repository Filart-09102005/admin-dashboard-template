import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Cash', value: 38 },
  { name: 'GCash', value: 33 },
  { name: 'Card', value: 22 },
  { name: 'Others', value: 7 },
];
const COLORS = ['#f97316', '#14b8a6', '#6366f1', '#cbd5e1'];

export default function DeviceChart({ isLoading }) {
  if (isLoading) {
    return (
      <div className="secondary-widget-traffic theme-surface rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-slate-200 dark:bg-neutral-800 rounded mb-2"></div>
        <div className="h-3 w-48 bg-slate-200 dark:bg-neutral-800 rounded mb-6"></div>
        <div className="h-[260px] w-full bg-slate-100 dark:bg-neutral-900 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="secondary-widget-traffic theme-surface rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Payment Methods</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">How customers complete POS transactions</p>
      </div>
      <div className="h-[260px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={900}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none',
                borderRadius: '8px',
                color: '#0f172a',
                fontSize: '12px'
              }}
              wrapperClassName="dark:!bg-[#0a0a0a] dark:!text-slate-200 dark:!shadow-none dark:ring-1 dark:ring-white/10"
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-8">
          <div className="text-center">
            <span className="traffic-total-value text-2xl font-bold text-slate-800 dark:text-white block">84</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
