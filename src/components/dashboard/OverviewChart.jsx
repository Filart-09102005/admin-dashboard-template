import React, { useState, useRef, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const datasets = {
  Today: [
    { name: '8AM', revenue: 340 },
    { name: '10AM', revenue: 520 },
    { name: '12PM', revenue: 780 },
    { name: '2PM', revenue: 910 },
    { name: '4PM', revenue: 1200 },
    { name: '6PM', revenue: 1450 },
    { name: '8PM', revenue: 1252 },
  ],
  Week: [
    { name: 'Mon', revenue: 5620 },
    { name: 'Tue', revenue: 6210 },
    { name: 'Wed', revenue: 5940 },
    { name: 'Thu', revenue: 6890 },
    { name: 'Fri', revenue: 7450 },
    { name: 'Sat', revenue: 8210 },
    { name: 'Sun', revenue: 8452 },
  ],
  Month: [
    { name: 'W1', revenue: 52410 },
    { name: 'W2', revenue: 57150 },
    { name: 'W3', revenue: 61280 },
    { name: 'W4', revenue: 71090 },
  ]
};

export default function OverviewChart({ isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Today');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentData = datasets[selected];
  const latestRevenue = currentData[currentData.length - 1]?.revenue || 0;

  if (isLoading) {
    return (
      <div className="main-chart-overview theme-surface rounded-2xl p-6 lg:col-span-2 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-slate-200 dark:bg-neutral-800 rounded mb-2"></div>
        <div className="h-3 w-56 bg-slate-200 dark:bg-neutral-800 rounded mb-8"></div>
        <div className="h-[280px] w-full bg-slate-100 dark:bg-neutral-900 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="main-chart-overview theme-surface rounded-2xl p-6 lg:col-span-2 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Revenue Overview</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Monthly revenue and user growth</p>
        </div>
        <p className="overview-kpi-value text-sm font-semibold text-brand-500 dark:text-brand-400">
          ${latestRevenue.toLocaleString()}
        </p>
        
        {/* Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-brand-500 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl px-4 py-2"
          >
            {selected}
            <ChevronDown size={14} className={`transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-20">
              {Object.keys(datasets).map(option => (
                <button
                  key={option}
                  onClick={() => { setSelected(option); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
              dx={-10}
            />
            <Tooltip 
              cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }}
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
            <Area 
              type="monotone" 
              dataKey="revenue" 
              className="overview-line"
              stroke="#f97316" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              animationDuration={950}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
