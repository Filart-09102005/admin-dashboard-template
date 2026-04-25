import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { category: 'Food', sales: 42000 },
  { category: 'Drinks', sales: 38000 },
  { category: 'Add-ons', sales: 25000 },
  { category: 'Desserts', sales: 18000 },
];

export default function SalesChart({ isLoading }) {
  if (isLoading) {
    return (
      <div className="secondary-widget-sales theme-surface rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-slate-200 dark:bg-neutral-800 rounded mb-2"></div>
        <div className="h-3 w-48 bg-slate-200 dark:bg-neutral-800 rounded mb-6"></div>
        <div className="h-[260px] w-full bg-slate-100 dark:bg-neutral-900 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="secondary-widget-sales theme-surface rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Sales by Category</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">POS category performance today</p>
      </div>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
            <XAxis 
              dataKey="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(value) => `$${value/1000}k`}
              dx={-10}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                color: '#0f172a',
                padding: '12px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#f97316', fontWeight: 600 }}
              wrapperClassName="dark:!bg-[#0a0a0a] dark:!text-slate-200 dark:!shadow-none dark:ring-1 dark:ring-white/10"
            />
            <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} animationDuration={900} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
