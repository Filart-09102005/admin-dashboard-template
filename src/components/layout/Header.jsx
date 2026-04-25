import React from 'react';
import { Search, Bell, Menu, ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';

export default function Header({ sidebarOpen, setSidebarOpen, isDarkMode, setIsDarkMode, onOpenMobileMenu }) {
  return (
    <header className="header-container h-16 theme-surface backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          className="btn-press text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1.5 rounded-lg hover:bg-brand-500/10 lg:hidden"
          onClick={onOpenMobileMenu}
          title="Open Menu"
        >
          <Menu size={22} />
        </button>
        <button 
          className="btn-press text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1.5 rounded-lg hover:bg-brand-500/10 hidden lg:inline-flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle Sidebar"
        >
          {sidebarOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
        
        <div className="header-search relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-64 bg-slate-100 dark:bg-neutral-900 border border-layout-borderLight dark:border-layout-borderDark rounded-full pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-500"
          />
        </div>
        <button className="btn-press header-icon p-2 text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800 md:hidden">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => setIsDarkMode()}
          className="btn-press header-icon p-2 text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="btn-press header-icon relative p-2 text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-neutral-800">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-neutral-800 mx-1 hidden md:block"></div>
        <button className="btn-press header-profile flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-neutral-800 p-1 pr-2 rounded-full transition-colors">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hans" 
            alt="Admin" 
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-neutral-800"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block">Hans Filart</span>
        </button>
      </div>
    </header>
  );
}
