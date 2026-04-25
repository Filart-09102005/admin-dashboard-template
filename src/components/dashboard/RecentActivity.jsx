import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

const transactions = [
  { id: 1, customer: 'Andrea Cruz', orderId: 'ORD-8411', time: '2 min ago', amount: '$42.90', status: 'paid' },
  { id: 2, customer: 'Joel Reyes', orderId: 'ORD-8409', time: '7 min ago', amount: '$17.00', status: 'pending' },
  { id: 3, customer: 'Mia Santos', orderId: 'ORD-8407', time: '12 min ago', amount: '$64.25', status: 'paid' },
  { id: 4, customer: 'Ken Dela Rosa', orderId: 'ORD-8401', time: '18 min ago', amount: '$23.40', status: 'cancelled' },
];

export default function RecentActivity({ isLoading, hasError = false, isEmpty = false }) {
  if (hasError) {
    return (
      <div className="main-chart-activity theme-surface rounded-2xl p-6 lg:col-span-1 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Transactions Feed</h3>
        <p className="text-sm text-red-500">Unable to load live transactions. Please retry.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="main-chart-activity theme-surface rounded-2xl p-6 lg:col-span-1 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-slate-200 dark:bg-neutral-800 rounded mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="h-14 bg-slate-100 dark:bg-neutral-900 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="main-chart-activity theme-surface rounded-2xl p-6 lg:col-span-1 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Transactions Feed</h3>
        <button className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {isEmpty ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No recent transactions yet.</p>
      ) : (
      <div className="space-y-4">
        {transactions.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-neutral-900 flex items-center justify-center font-semibold text-brand-500 ring-1 ring-black/5 dark:ring-white/5">
                {item.customer.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.customer}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.orderId} • {item.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={clsx(
                "text-sm font-semibold",
                item.status === 'cancelled' ? "text-slate-800 dark:text-slate-200" : "text-green-600 dark:text-green-400"
              )}>
                {item.amount}
              </p>
              <p className={clsx(
                "text-xs capitalize mt-0.5 font-medium",
                item.status === 'paid' && "text-green-600/70 dark:text-green-500/70",
                item.status === 'pending' && "text-amber-600/70 dark:text-amber-500/70",
                item.status === 'cancelled' && "text-red-500/80 dark:text-red-400/80"
              )}>
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      )}
      
      <button className="w-full mt-4 py-2 text-sm font-medium text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors border border-dashed border-slate-200 dark:border-neutral-800 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-500/5">
        View All Transactions
      </button>
    </div>
  );
}
