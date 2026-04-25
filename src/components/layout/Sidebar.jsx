import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  LayoutDashboard,
  Lightbulb,
  CreditCard,
  FileText,
  BarChart2,
  CheckCircle,
  Zap,
  Package,
  Settings,
  Headphones,
  Activity
} from 'lucide-react';
import clsx from 'clsx';

function SidebarTooltip({ text, children, isOpen }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  if (isOpen) return children;

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.top + rect.height / 2, left: rect.right + 12 });
    }
    setShow(true);
  };

  return (
    <div 
      ref={ref}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={() => setShow(false)}
      className="w-full relative"
    >
      {children}
      {show && createPortal(
        <div 
          style={{ top: coords.top, left: coords.left, transform: 'translateY(-50%)' }}
          className="fixed px-2.5 py-1.5 bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-[11px] font-semibold rounded-md whitespace-nowrap z-[100] shadow-md border border-slate-700 dark:border-slate-200 pointer-events-none"
        >
          {text}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800 dark:border-r-white"></div>
        </div>,
        document.body
      )}
    </div>
  );
}

const menuSections = [
  {
    title: 'MAIN MENU',
    titleAnim: 'anim-seq-2',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, active: true, anim: 'anim-seq-2' },
      { name: 'Insights', icon: Activity, anim: 'anim-seq-3' },
      { name: 'Updates', icon: Lightbulb, badge: '+21', anim: 'anim-seq-3' },
      { name: 'Transactions', icon: CreditCard, anim: 'anim-seq-3' },
      { name: 'Invoices', icon: FileText, badge: '+2', anim: 'anim-seq-3' },
    ]
  },
  {
    title: 'FEATURES',
    titleAnim: 'anim-seq-4',
    items: [
      { name: 'Reports', icon: BarChart2, anim: 'anim-seq-4' },
      { name: 'Compliance', icon: CheckCircle, anim: 'anim-seq-4' },
      { name: 'Automation', icon: Zap, anim: 'anim-seq-4' },
      { name: 'Inventory', icon: Package, anim: 'anim-seq-4' },
    ]
  },
  {
    title: 'OTHERS',
    titleAnim: 'anim-seq-4',
    items: [
      { name: 'Settings', icon: Settings, anim: 'anim-seq-4' },
      { name: 'Help Desk', icon: Headphones, anim: 'anim-seq-4' },
    ]
  }
];

export default function Sidebar({ isOpen, isMobileOpen, onCloseMobile }) {
  return (
    <>
      <aside
        className={clsx(
          "sidebar-container theme-surface transition-[width,transform] duration-500 ease-out flex flex-col z-30 h-full fixed lg:relative inset-y-0 left-0",
          isOpen ? "w-[260px]" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
      {/* Logo */}
      <div className="h-20 flex items-center overflow-hidden whitespace-nowrap">
        <div className="w-20 flex-shrink-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-brand-500/20">
            HK
          </div>
        </div>
        <span className={clsx(
          "text-xl font-bold text-slate-800 dark:text-white tracking-tight transition-all duration-300 origin-left",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          Dashboard
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-3 pb-4">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h4 className={clsx(
              "text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-3 px-3 uppercase whitespace-nowrap transition-all duration-300",
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            )}>
              {section.title}
            </h4>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarTooltip key={item.name} text={item.name} isOpen={isOpen}>
                    <button
                      className={clsx(
                        "sidebar-nav-item",
                        item.active && "sidebar-item-active",
                        "sidebar-item w-full flex items-center rounded-xl transition-all duration-200 group overflow-hidden whitespace-nowrap",
                        item.active
                          ? "bg-brand-500/10 text-brand-500 font-medium"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                      )}
                    >
                      <div className="w-[56px] h-10 flex-shrink-0 flex items-center justify-center">
                        <Icon size={18} className={clsx(item.active ? "text-brand-500" : "group-hover:scale-110 transition-transform")} />
                      </div>
                      
                      <div className={clsx(
                        "flex-1 flex items-center justify-between pr-3 transition-all duration-300",
                        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1"
                      )}>
                        <span className="text-[13px]">{item.name}</span>
                        {item.badge && (
                          <span className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center rounded-full bg-brand-500 text-white text-[9px] font-bold shadow-sm">
                            {item.badge.replace('+', '')}
                          </span>
                        )}
                      </div>
                    </button>
                  </SidebarTooltip>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Promo Card */}
        <div className={clsx(
          "mt-8 mb-4 relative bg-slate-50 dark:bg-[#0a0a0a] rounded-3xl p-5 border border-slate-100 dark:border-neutral-900 overflow-hidden shadow-sm transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0 max-h-72" : "opacity-0 translate-y-2 max-h-0 pointer-events-none p-0 border-transparent"
        )}>
            {/* Abstract Graphic representing the connected blobs */}
            <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 text-brand-500">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="70" cy="30" r="15" />
                <circle cx="30" cy="70" r="15" />
                <circle cx="70" cy="70" r="20" />
                <circle cx="50" cy="50" r="15" />
                <path d="M60 40 L40 60" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
                <path d="M50 50 L70 30" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
                <path d="M50 50 L70 70" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
              </svg>
            </div>

            <div className="relative z-10 w-2/3">
              <h5 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm">Unlock all<br />Features</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Higher productivity<br />with better<br />organization.
              </p>
            </div>
            <button className="relative z-10 w-full bg-slate-800 hover:bg-slate-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white text-[11px] font-semibold py-2.5 rounded-full transition-colors">
              18 Days Free-Trial
            </button>
        </div>
      </div>
      </aside>
      {isMobileOpen && (
        <button
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-20 lg:hidden"
          aria-label="Close sidebar"
        />
      )}
    </>
  );
}
