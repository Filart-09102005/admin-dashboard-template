import React, { useRef, useState, useEffect } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1280);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const themeOverlayRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setMobileMenuOpen(false);
      }
      if (width >= 1024 && width < 1280) {
        setSidebarOpen(false);
      }
      if (width >= 1280) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.classList.add('page-animating');

    const tl = createTimeline({
      defaults: {
        easing: 'outExpo',
        duration: 800,
      },
      onComplete: () => {
        document.body.classList.remove('page-animating');
      }
    });

    tl
      .add('.sidebar-container', {
        opacity: [0, 1],
        translateX: [-18, 0],
        duration: 520
      }, 0)
      .add('.sidebar-nav-item', {
        opacity: [0, 1],
        translateY: [10, 0],
        delay: stagger(60),
        duration: 420
      }, '-=220')
      .add('.sidebar-item-active', {
        scale: [0.98, 1],
        boxShadow: ['0 0 0 rgba(249,115,22,0)', '0 0 14px rgba(249,115,22,0.18)'],
        duration: 500
      }, '-=240')
      .add('.header-container', {
        opacity: [0, 1],
        translateY: [-14, 0],
        duration: 620
      }, '-=180')
      .add('.header-search', {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 620
      }, '-=420')
      .add('.header-icon', {
        opacity: [0, 1],
        translateY: [12, 0],
        delay: stagger(70),
        duration: 540
      }, '-=520')
      .add('.header-profile', {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 620
      }, '-=460')
      .add('.title-section', {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 660
      }, '-=380')
      .add('.stat-card', {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.98, 1],
        delay: stagger(95),
        duration: 780
      }, '-=330')
      .add('.main-chart-overview', {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.992, 1],
        duration: 760
      }, '-=340')
      .add('.main-chart-activity', {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.992, 1],
        duration: 740
      }, '-=520')
      .add('.secondary-widget-sales', {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.99, 1],
        duration: 740
      }, '-=360')
      .add('.secondary-widget-traffic', {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.99, 1],
        duration: 740
      }, '-=520')
      .add('.table-section-container', {
        opacity: [0, 1],
        translateY: [18, 0],
        duration: 660
      }, '-=360')
      .add('.top-products-row', {
        opacity: [0, 1],
        translateY: [10, 0],
        delay: stagger(55),
        duration: 430
      }, '-=430');

    const trafficValue = { value: 0 };
    animate(trafficValue, {
      value: 84,
      duration: 1150,
      easing: 'outExpo',
      delay: 2300,
      onUpdate: () => {
        const target = document.querySelector('.traffic-total-value');
        if (target) {
          target.textContent = `${Math.round(trafficValue.value)}`;
        }
      }
    });

    const revenueValue = { value: 0 };
    animate(revenueValue, {
      value: 1252,
      duration: 1250,
      easing: 'outExpo',
      delay: 1650,
      onUpdate: () => {
        const target = document.querySelector('.overview-kpi-value');
        if (target) {
          target.textContent = `$${Math.round(revenueValue.value).toLocaleString()}`;
        }
      }
    });

    return () => {
      document.body.classList.remove('page-animating');
    };
  }, []);

  const handleThemeToggle = () => {
    const overlay = themeOverlayRef.current;
    if (!overlay) {
      setIsDarkMode((prev) => !prev);
      return;
    }

    animate(overlay, {
      opacity: [0, 0.22],
      duration: 220,
      easing: 'inOutQuad',
      complete: () => {
        setIsDarkMode((prev) => !prev);
        animate(overlay, {
          opacity: [0.22, 0],
          duration: 220,
          easing: 'inOutQuad',
        });
      }
    });
  };

  return (
    <div className="theme-root flex h-screen overflow-hidden font-sans transition-colors duration-500">
      <Sidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden relative lg:pl-0">
        <div ref={themeOverlayRef} className="theme-transition-overlay pointer-events-none absolute inset-0 z-40 opacity-0" />
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          isDarkMode={isDarkMode}
          setIsDarkMode={handleThemeToggle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-5 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
