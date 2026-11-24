import React from 'react';
import './Home.css';

export default function Home({ onStartCheck }) {
  return (
    <section className="home-view view-enter">
      <div className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-content">
            
              <h1 className="hero-title">
                Kenali Kondisi{' '}
                <span className="hero-highlight">Ginjal Anda</span>
                <span className="hero-accent">Lebih Awal.</span>
              </h1>

              <p className="hero-subtitle">
                Masalah ginjal sering datang tanpa terasa di awal. Luangkan dua menit
                untuk menjawab keluhan harian Anda, dapatkan gambaran tingkat risiko
                secara langsung, dan ketahui kapan waktu tepat untuk berkonsultasi ke dokter.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onStartCheck}
                >
                  Mulai Cek Sekarang
                </button>
                <a href="#mengenal-ginjal" className="btn-secondary">
                  Pelajari Penyakit Ginjal
                </a>
              </div>

              <div className="hero-meta">
                <span>Gratis &amp; tanpa akun</span>
                <span>Diproses langsung di perangkat Anda</span>
                <span>Merujuk panduan KDIGO 2024</span>
              </div>
            </div>

            <div className="bento-grid">
              <div className="bento-col">
                <div className="bento-card bento-blue">
                  <span className="bento-badge badge-translucent">
                    Indikator Risiko
                  </span>
                  <p className="bento-heading">Rendah &ndash; Tinggi</p>
                  <p className="bento-desc">
                    Skor persentase langsung terbaca lengkap dengan saran langkah lanjut ke dokter.
                  </p>
                </div>

                <div className="bento-card bento-yellow">
                  <span className="bento-badge badge-solid-yellow">
                    Tanpa Login
                  </span>
                  <p className="bento-heading">Langsung Cek</p>
                  <p className="bento-desc">
                    Privasi terjaga tanpa perlu mendaftar akun atau menyimpan data pribadi.
                  </p>
                </div>
              </div>

              <div className="bento-col bento-col-offset">
                <div className="bento-card bento-yellow">
                  <span className="bento-badge badge-solid-yellow">
                    Menyeluruh
                  </span>
                  <p className="bento-heading">5 Faktor Utama</p>
                  <p className="bento-desc">
                    Tekanan darah, nyeri pinggang, keluhan BAK, kondisi tubuh, dan riwayat kesehatan.
                  </p>
                </div>

                <div className="bento-card bento-blue">
                  <span className="bento-badge badge-translucent">
                    Tanda Bahaya
                  </span>
                  <p className="bento-heading">Peringatan Gejala Berat</p>
                  <p className="bento-desc">
                    Deteksi dini gejala berat yang memerlukan pemeriksaan segera ke dokter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="mengenal-ginjal" className="section-block section-border">
        <div className="container">
          <div className="section-header">
            <span className="section-pill pill-soft-blue">Edukasi Dasar</span>
            <h2 className="section-title">Mengenal Penyakit Ginjal</h2>
            <p className="section-lead">
              Ginjal bekerja menyaring limbah dan menjaga keseimbangan cairan tubuh
              setiap hari. Pahami tiga kondisi utama berikut agar Anda lebih peka
              terhadap sinyal tubuh.
            </p>
          </div>

          <div className="edu-grid">
            <article className="edu-card">
              <div>
                <span className="edu-badge badge-blue">Berkembang Perlahan</span>
                <h3 className="card-title">Penyakit Ginjal Kronis</h3>
                <p className="card-body">
                  Penurunan fungsi ginjal secara bertahap dalam jangka panjang, sering
                  dipicu tekanan darah tinggi atau diabetes yang kurang terkontrol.
                </p>
              </div>
              <div className="edu-footer">
                <p className="edu-symptom-label label-blue">Gejala Umum</p>
                <p className="edu-symptom-text">
                  Mudah lelah berkepanjangan, bengkak di kaki atau wajah, urin berbusa
                  pekat, dan tekanan darah tinggi.
                </p>
              </div>
            </article>

            <article className="edu-card">
              <div>
                <span className="edu-badge badge-yellow">Perlu Penanganan Cepat</span>
                <h3 className="card-title">Infeksi Saluran Kemih &amp; Ginjal</h3>
                <p className="card-body">
                  Infeksi bakteri pada saluran kemih yang dapat naik ke ginjal bila
                  dibiarkan tanpa penanganan medis yang tepat.
                </p>
              </div>
              <div className="edu-footer">
                <p className="edu-symptom-label">
                  <span className="label-yellow-highlight">Gejala Umum</span>
                </p>
                <p className="edu-symptom-text">
                  Terasa perih atau panas saat buang air kecil, urin keruh/berbau
                  menyengat, serta demam atau menggigil.
                </p>
              </div>
            </article>

            <article className="edu-card">
              <div>
                <span className="edu-badge badge-red">Nyeri Tajam Mendadak</span>
                <h3 className="card-title">Batu Ginjal</h3>
                <p className="card-body">
                  Endapan mineral dan garam yang mengeras di ginjal atau saluran kemih
                  sehingga menghambat aliran urin.
                </p>
              </div>
              <div className="edu-footer">
                <p className="edu-symptom-label label-red">Gejala Umum</p>
                <p className="edu-symptom-text">
                  Nyeri tajam di pinggang atau punggung bawah yang menjalar, urin
                  kemerahan, disertai mual atau muntah.
                </p>
              </div>
            </article>
          </div>

          <div className="danger-banner">
            <div className="danger-banner-left">
              <span className="edu-badge badge-red">Perhatian Medis</span>
              <h3 className="danger-banner-title">Kapan Harus Segera ke Dokter?</h3>
            </div>
            <div className="danger-banner-right">
              <p className="card-body">
                Jangan menunda pemeriksaan ke dokter atau layanan gawat darurat bila Anda
                mengalami <strong>demam tinggi disertai menggigil</strong>,{' '}
                <strong>nyeri pinggang hebat yang tak tertahankan</strong>,{' '}
                <strong>urin berdarah</strong>, atau <strong>bengkak mendadak</strong>{' '}
                pada wajah dan kaki.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="cara-kerja" className="section-block section-surface section-border">
        <div className="container">
          <div className="section-header">
            <span className="section-pill pill-white-blue">Alur Sederhana</span>
            <h2 className="section-title">
              Cara Kerja KidNova<span className="logo-dot">.</span>
            </h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <p className="step-number step-blue">01</p>
              <h3 className="card-title">Ceritakan Keluhanmu</h3>
              <p className="card-body">
                Jawab lima kelompok pertanyaan ringan seputar tekanan darah, nyeri
                pinggang, buang air kecil, kondisi tubuh, dan riwayat kesehatan Anda.
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge-wrap">
                <span className="step-number-yellow">02</span>
              </div>
              <h3 className="card-title">Analisis Otomatis</h3>
              <p className="card-body">
                Sistem menghitung perkiraan tingkat risiko secara langsung di perangkat
                Anda berdasarkan pola penilaian yang merujuk pada panduan klinis.
              </p>
            </div>

            <div className="step-card">
              <p className="step-number step-red">03</p>
              <h3 className="card-title">Dapatkan Panduan Langkah Lanjut</h3>
              <p className="card-body">
                Terima ringkasan kondisi dalam bahasa yang mudah dipahami lengkap dengan
                rekomendasi langkah lanjut dan pemeriksaan dasar ke dokter.
              </p>
            </div>
          </div>

          <div className="cta-banner">
            <div className="cta-banner-content">
              <span className="bento-badge badge-navy-sun">Mulai Skrining Mandiri</span>
              <h2 className="cta-banner-title">
                Cek kondisi ginjal Anda sekarang, cukup dua menit.
              </h2>
            </div>
            <button
              type="button"
              className="btn-cta-yellow"
              onClick={onStartCheck}
            >
              Mulai Cek Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
