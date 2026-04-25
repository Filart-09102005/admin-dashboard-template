import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import clsx from 'clsx';

const products = [
  { id: 1, name: 'Signature Burger', category: 'Food', price: '$7.50', sales: 245, stock: 'In Stock' },
  { id: 2, name: 'Iced Latte', category: 'Drinks', price: '$3.20', sales: 390, stock: 'In Stock' },
  { id: 3, name: 'Cheese Add-on', category: 'Add-ons', price: '$1.10', sales: 160, stock: 'Low Stock' },
  { id: 4, name: 'Chocolate Sundae', category: 'Desserts', price: '$2.80', sales: 138, stock: 'Low Stock' },
  { id: 5, name: 'Family Meal Box', category: 'Food', price: '$18.00', sales: 62, stock: 'Out of Stock' },
];

export default function TopProducts({ isLoading, hasError = false, isEmpty = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (hasError) {
    return (
      <div className="table-section-container theme-surface rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Best Selling Items</h3>
        <p className="text-sm text-red-500">Unable to load product insights. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="table-section-container theme-surface rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-5 w-40 bg-slate-200 dark:bg-neutral-800 rounded mb-2"></div>
        <div className="h-3 w-52 bg-slate-200 dark:bg-neutral-800 rounded mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="h-12 bg-slate-100 dark:bg-neutral-900 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="table-section-container theme-surface rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Best Selling Items</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Top-performing POS products by quantity sold</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <button className="p-2 border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-500 hover:text-brand-500 hover:border-brand-500 transition-colors bg-slate-50 dark:bg-neutral-900">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-neutral-900 text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <th className="pb-3 font-medium px-2">Product Name</th>
              <th className="pb-3 font-medium px-2">Category</th>
              <th className="pb-3 font-medium px-2">Price</th>
              <th className="pb-3 font-medium px-2">Qty Sold</th>
              <th className="pb-3 font-medium px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty && filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item.id} className="top-products-row border-b border-slate-50 dark:border-neutral-900/50 hover:bg-slate-50 dark:hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(item.name)}`}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-neutral-800"
                      />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm text-slate-500 dark:text-slate-400">{item.category}</td>
                  <td className="py-4 px-2 text-sm font-medium text-slate-800 dark:text-slate-200">{item.price}</td>
                  <td className="py-4 px-2 text-sm font-medium text-slate-800 dark:text-slate-200">{item.sales}</td>
                  <td className="py-4 px-2 text-right">
                    <span className={clsx(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                      item.stock === 'In Stock' && "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
                      item.stock === 'Low Stock' && "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                      item.stock === 'Out of Stock' && "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    )}>
                      {item.stock}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  {isEmpty ? 'No products available right now.' : `No products found matching "${searchTerm}"`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
