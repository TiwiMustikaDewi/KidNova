import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detection from './pages/Detection';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeSection, setActiveSection] = useState('beranda');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kidnova-theme') || 'light';
  });
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kidnova-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (view, sectionId = 'top') => {
    setCurrentView(view);
    if (view === 'home') {
      if (sectionId && sectionId !== 'top') {
        setActiveSection(sectionId);
        isNavigatingRef.current = true;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const yOffset = -85;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 800);
        }, 50);
      } else {
        setActiveSection('beranda');
        isNavigatingRef.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 800);
      }
    } else {
      setActiveSection('detection');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scrollspy to auto-highlight active section in navbar pill
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      if (isNavigatingRef.current) return;
      const scrollPos = window.scrollY + 120;
      const caraKerjaEl = document.getElementById('cara-kerja');
      const tentangEl = document.getElementById('tentang-kidnova');

      if (tentangEl && scrollPos >= tentangEl.offsetTop) {
        setActiveSection('tentang-kidnova');
      } else if (caraKerjaEl && scrollPos >= caraKerjaEl.offsetTop) {
        setActiveSection('cara-kerja');
      } else {
        setActiveSection('beranda');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  return (
    <div className="app-shell">
      <Navbar
        currentView={currentView}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main-content">
        {currentView === 'home' ? (
          <Home
            onStartCheck={() => handleNavigate('detection')}
            onNavigateSection={(sec) => handleNavigate('home', sec)}
          />
        ) : (
          <Detection onBackHome={() => handleNavigate('home', 'top')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
