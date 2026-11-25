import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar({
  currentView,
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', target: 'top' },
    { id: 'cara-kerja', label: 'Cara Kerja', target: 'cara-kerja' },
    { id: 'tentang-kidnova', label: 'Tentang KidNova', target: 'tentang-kidnova' },
  ];

  const handleNavClick = (target) => {
    onNavigate('home', target);
    setMobileOpen(false);
  };

  const handleCtaClick = () => {
    onNavigate('detection');
    setMobileOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Left: Kidney Logo + KidNova Text */}
        <div className="navbar-left">
          <button
            type="button"
            className="navbar-brand"
            onClick={() => onNavigate('home', 'top')}
            aria-label="Beranda KidNova"
          >
            <span className="kidney-emblem" aria-hidden="true">
              <svg
                viewBox="0 0 40 40"
                width="34"
                height="34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Organ Ginjal Estetis & Modern */}
                <path
                  d="M21 4C12.5 4 6 10 6 19.5C6 29 11.5 36.5 20.5 36.5C29 36.5 34 29.5 34 23.5C34 18 29.5 17.5 27.5 17.5C25.5 17.5 24 16 25 14C26.5 11 28.5 10.5 28.5 7.5C28.5 4.8 25.5 4 21 4Z"
                  fill="url(#kidney-primary-grad)"
                />
                {/* Hilum Ginjal (Lekukan dalam) Kuning */}
                <path
                  d="M26 15C23.5 15 21.5 17 21.5 20C21.5 23 23.5 25 26 25C27.8 25 29 23.8 29 20C29 16.5 27.8 15 26 15Z"
                  fill="#ffea00"
                />
                <circle cx="25.5" cy="18.5" r="1.8" fill="#ffffff" opacity="0.9" />
                <circle cx="26" cy="22" r="1.4" fill="#02113e" opacity="0.6" />
                <defs>
                  <linearGradient
                    id="kidney-primary-grad"
                    x1="6"
                    y1="4"
                    x2="34"
                    y2="36.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2000dd" />
                    <stop offset="1" stopColor="#080054" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="brand-text">
              KidNova<span className="logo-dot">.</span>
            </span>
          </button>
        </div>

        {/* Center: Floating Pill Navigation (Pasti Center Presisi) */}
        <nav className="navbar-center-pill" aria-label="Navigasi Utama">
          {navItems.map((item) => {
            const isActive = currentView === 'home' && activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`pill-link ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.target)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle + CTA Button */}
        <div className="navbar-right">
          {/* Theme Switcher Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Ubah ke ${theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}`}
            title={`Ubah ke ${theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}`}
          >
            {theme === 'light' ? (
              // Moon Icon
              <svg
                className="theme-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              // Sun Icon
              <svg
                className="theme-icon sun-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* CTA: Mulai Cek Sekarang */}
          <button
            type="button"
            className={`navbar-cta ${currentView === 'detection' ? 'active-cta' : ''}`}
            onClick={handleCtaClick}
          >
            <span>Mulai Cek Sekarang</span>
            <svg
              className="cta-arrow-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span className={`mobile-line ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-box" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-pill-container">
              {navItems.map((item) => {
                const isActive = currentView === 'home' && activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`mobile-pill-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.target)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="mobile-drawer-actions">
              <button
                type="button"
                className="mobile-theme-btn"
                onClick={onToggleTheme}
              >
                {theme === 'light' ? '🌙 Ganti ke Mode Gelap' : '☀️ Ganti ke Mode Terang'}
              </button>
              <button
                type="button"
                className="mobile-drawer-cta"
                onClick={handleCtaClick}
              >
                Mulai Cek Sekarang &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
