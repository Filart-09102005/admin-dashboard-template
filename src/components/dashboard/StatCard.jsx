import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

export default function StatCard({ title, value, subtitle, trend, isPositive, icon: Icon, isLoading }) {
  if (isLoading) {
    return (
      <div className="stat-card theme-surface rounded-2xl p-5 shadow-sm animate-pulse">
        <div className="h-4 w-28 bg-slate-200 dark:bg-neutral-800 rounded mb-3"></div>
        <div className="h-7 w-24 bg-slate-200 dark:bg-neutral-800 rounded mb-3"></div>
        <div className="h-3 w-20 bg-slate-200 dark:bg-neutral-800 rounded"></div>
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        "stat-card theme-surface rounded-2xl p-5 hover:border-brand-500/30 transition-all duration-300 relative overflow-hidden group shadow-sm hover:scale-[1.02]"
      )}
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-2.5 bg-brand-50 dark:bg-neutral-900 rounded-xl text-brand-500 dark:text-brand-400 ring-1 ring-black/5 dark:ring-white/5 shadow-inner">
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 mt-4 relative z-10">
        <div className={clsx(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md",
          isPositive ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400"
        )}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">vs last month</span>
      </div>
    </div>
  );
}
