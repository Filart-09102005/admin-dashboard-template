import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import OverviewChart from '../components/dashboard/OverviewChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import SalesChart from '../components/dashboard/SalesChart';
import DeviceChart from '../components/dashboard/DeviceChart';
import TopProducts from '../components/dashboard/TopProducts';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="dashboard-root">
        <div className="title-section mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">POS Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Monitor live sales, transactions, inventory, and payment trends.</p>
        </div>

      {/* Metrics Grid */}
      <div className="stats-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$8,452" 
          subtitle="Today / Monthly $241,930"
          trend="+8.4%" 
          isPositive={true} 
          icon={DollarSign}
          isLoading={isLoading}
        />
        <StatCard 
          title="Total Orders" 
          value="186" 
          subtitle="Across all channels"
          trend="+5.1%" 
          isPositive={true} 
          icon={ShoppingCart}
          isLoading={isLoading}
        />
        <StatCard 
          title="Items Sold" 
          value="432" 
          subtitle="Units moved today"
          trend="+12.3%" 
          isPositive={true} 
          icon={Package}
          isLoading={isLoading}
        />
        <StatCard 
          title="Active Customers" 
          value="29" 
          subtitle="In-store + online"
          trend="-1.8%" 
          isPositive={false} 
          icon={Users}
          isLoading={isLoading}
        />
      </div>

      {/* Primary Charts & Activity Grid */}
      <div className="main-charts-section grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <OverviewChart isLoading={isLoading} />
        <RecentActivity isLoading={isLoading} />
      </div>

      {/* Secondary Charts */}
      <div className="secondary-widgets-section grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesChart isLoading={isLoading} />
        <DeviceChart isLoading={isLoading} />
      </div>

      {/* Tables */}
      <div className="table-section">
        <TopProducts isLoading={isLoading} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Developed by <span className="font-semibold text-brand-500 dark:text-brand-400">Hans Filart</span>
        </p>
      </div>
      
      </div>
    </Layout>
  );
}
