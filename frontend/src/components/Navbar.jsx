import React from 'react';
import './Navbar.css';

export default function Navbar({ currentView, onNavigate }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button
          type="button"
          className="navbar-logo"
          onClick={() => onNavigate('home')}
          aria-label="Beranda KidNova"
        >
          KidNova<span className="logo-dot">.</span>
        </button>

        <nav className="navbar-actions" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Beranda
          </button>
          <button
            type="button"
            className="nav-cta"
            onClick={() => onNavigate('detection')}
          >
            Mulai Cek Sekarang
          </button>
        </nav>
      </div>
    </header>
  );
}
