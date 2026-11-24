import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            KidNova<span className="logo-dot">.</span>
          </span>
          <span className="footer-copy">
            &copy; 2026 KidNova &middot; Edukasi &amp; Deteksi Dini Kesehatan Ginjal
          </span>
        </div>
        <p className="footer-note">
          Referensi panduan medis: KDIGO 2024 &amp; EAU Guidelines. Bukan pengganti diagnosis dokter.
        </p>
      </div>
    </footer>
  );
}
