import React from 'react';
import './Footer.css';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">
              KidNova<span className="logo-dot">.</span>
            </span>
          </div>

          <nav className="footer-nav" aria-label="Navigasi Footer">
            <button
              type="button"
              className="footer-link"
              onClick={() => onNavigate('home', 'top')}
            >
              Beranda
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onNavigate('home', 'cara-kerja')}
            >
              Cara Kerja
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onNavigate('home', 'tentang-kidnova')}
            >
              Tentang KidNova
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onNavigate('detection')}
            >
              Mulai Cek Sekarang
            </button>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; 2026 KidNova &middot; Sistem Pakar Deteksi Dini &amp; Edukasi Risiko Ginjal
          </p>
          <p className="footer-note">
            Referensi: Kemenkes RI, KDIGO 2024, PERNEFRI, IAUI &amp; WHO. Bukan pengganti diagnosis dokter.
          </p>
        </div>
      </div>
    </footer>
  );
}
