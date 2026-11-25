import React from 'react';
import './Home.css';

export default function Home({ onStartCheck, onNavigateSection }) {
  return (
    <section className="home-view view-enter">
      {/* 1. HERO SECTION */}
      <div className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="pill-tag pill-yellow">Cek Risiko Dini &amp; Edukasi Ginjal</span>

              <h1 className="hero-title">
                Kenali Kondisi{' '}
                <span className="hero-highlight">Ginjal Anda</span>
                <span className="hero-accent">Lebih Awal.</span>
              </h1>

              <p className="hero-subtitle">
                Masalah ginjal sering datang tanpa terasa di awal. Luangkan dua menit
                untuk menjawab keluhan harian Anda, dapatkan gambaran tingkat risiko
                secara langsung dengan logika fuzzy, dan ketahui kapan waktu tepat berkonsultasi ke dokter.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onStartCheck}
                >
                  Mulai Cek Sekarang &rarr;
                </button>
                <a href="#cara-kerja" className="btn-secondary">
                  Pelajari Cara Kerja
                </a>
              </div>

              <div className="hero-meta">
                <span>Gratis &amp; Tanpa Akun</span>
                <span>Analisis Logika Fuzzy Cepat</span>
                <span>Merujuk Panduan Kemenkes &amp; KDIGO</span>
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
                    Skor persentase langsung terbaca lengkap dengan saran langkah lanjut ke dokter spesialis.
                  </p>
                </div>

                <div className="bento-card bento-yellow">
                  <span className="bento-badge badge-solid-yellow">
                    Tanpa Login
                  </span>
                  <p className="bento-heading">Langsung Cek</p>
                  <p className="bento-desc">
                    Privasi Anda terjaga tanpa perlu mendaftar akun atau menyimpan data identitas sensitif.
                  </p>
                </div>
              </div>

              <div className="bento-col bento-col-offset">
                <div className="bento-card bento-yellow">
                  <span className="bento-badge badge-solid-yellow">
                    Menyeluruh
                  </span>
                  <p className="bento-heading">3 Kondisi Utama</p>
                  <p className="bento-desc">
                    Pengecekan Ginjal Kronis, Batu Ginjal, dan Infeksi Saluran Kemih sekaligus dalam 1 form.
                  </p>
                </div>

                <div className="bento-card bento-blue">
                  <span className="bento-badge badge-translucent">
                    Tanda Bahaya
                  </span>
                  <p className="bento-heading">Peringatan IGD</p>
                  <p className="bento-desc">
                    Deteksi cepat gejala darurat (anuria, nyeri luar biasa) untuk segera ditangani di IGD rumah sakit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION: MENGENAL PENYAKIT GINJAL */}
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
                <h3 className="card-title">Penyakit Ginjal Kronis (PGK)</h3>
                <p className="card-body">
                  Penurunan fungsi ginjal secara bertahap dalam jangka panjang, sering
                  dipicu tekanan darah tinggi (hipertensi) atau diabetes yang kurang terkontrol.
                </p>
              </div>
              <div className="edu-footer">
                <p className="edu-symptom-label label-blue">Gejala Umum</p>
                <p className="edu-symptom-text">
                  Mudah lelah berkepanjangan, bengkak di kaki atau wajah, urin berbusa
                  pekat, serta tekanan darah tinggi.
                </p>
              </div>
            </article>

            <article className="edu-card">
              <div>
                <span className="edu-badge badge-yellow">Perlu Penanganan Cepat</span>
                <h3 className="card-title">Infeksi Ginjal &amp; Saluran Kemih (ISK)</h3>
                <p className="card-body">
                  Infeksi bakteri pada saluran kemih yang dapat naik ke ginjal bila
                  dibiarkan tanpa penanganan antibiotik yang tepat dari dokter.
                </p>
              </div>
              <div className="edu-footer">
                <p className="edu-symptom-label">
                  <span className="label-yellow-highlight">Gejala Umum</span>
                </p>
                <p className="edu-symptom-text">
                  Terasa perih atau panas saat buang air kecil, urin keruh/berbau
                  menyengat, anyang-anyangan, serta demam menggigil.
                </p>
              </div>
            </article>

            <article className="edu-card">
              <div>
                <span className="edu-badge badge-red">Nyeri Tajam Mendadak</span>
                <h3 className="card-title">Batu Ginjal (Nefrolitiasis)</h3>
                <p className="card-body">
                  Endapan mineral dan garam yang mengeras di ginjal atau saluran kemih
                  karena kurang minum air putih, menghambat aliran urin.
                </p>
              </div>
              <div className="edu-footer">
                <p className="edu-symptom-label label-red">Gejala Umum</p>
                <p className="edu-symptom-text">
                  Nyeri tajam mendadak di pinggang/punggung bawah menjalar ke perut depan, urin
                  kemerahan, disertai mual muntah.
                </p>
              </div>
            </article>
          </div>

          <div className="danger-banner">
            <div className="danger-banner-left">
              <span className="edu-badge badge-red">Perhatian Medis</span>
              <h3 className="danger-banner-title">Kapan Harus Segera ke IGD?</h3>
            </div>
            <div className="danger-banner-right">
              <p className="card-body">
                Jangan menunda pemeriksaan ke Instalasi Gawat Darurat (IGD) bila Anda
                mengalami <strong>tidak bisa buang air kecil sama sekali (anuria)</strong>,{' '}
                <strong>nyeri pinggang hebat tak tertahankan</strong>,{' '}
                <strong>demam tinggi disertai muntah-muntah</strong>, atau{' '}
                <strong>urin bercampur darah segar</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION: CARA KERJA KIDNOVA */}
      <div id="cara-kerja" className="section-block section-surface section-border">
        <div className="container">
          <div className="section-header">
            <span className="section-pill pill-white-blue">Alur Sederhana</span>
            <h2 className="section-title">
              Cara Kerja KidNova<span className="logo-dot">.</span>
            </h2>
            <p className="section-lead">
              Bagaimana sistem pakar KidNova membantu Anda mendeteksi risiko gangguan ginjal dalam 3 langkah mudah:
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <p className="step-number step-blue">01</p>
              <h3 className="card-title">Ceritakan Keluhan &amp; Riwayat</h3>
              <p className="card-body">
                Isi kuesioner ringkas seputar usia, riwayat tekanan darah/gula, nyeri pinggang,
                kondisi fisik, dan keluhan saat buang air kecil.
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge-wrap">
                <span className="step-number-yellow">02</span>
              </div>
              <h3 className="card-title">Perhitungan Logika Fuzzy</h3>
              <p className="card-body">
                Mesin penalaran Fuzzy Mamdani membaca derajat gejala bertingkat (ringan, sedang, berat)
                dan menghitung skor persentase risiko (0–100%).
              </p>
            </div>

            <div className="step-card">
              <p className="step-number step-red">03</p>
              <h3 className="card-title">Hasil, Saran &amp; Artikel Resmi</h3>
              <p className="card-body">
                Terima ringkasan status (Hijau/Kuning/Merah), saran pemeriksaan dokter (eGFR, USG, Urinalisis),
                serta kartu bacaan dari lembaga kesehatan resmi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECTION: TENTANG KIDNOVA */}
      <div id="tentang-kidnova" className="section-block section-border">
        <div className="container">
          <div className="section-header">
            <span className="section-pill pill-soft-blue">Tentang Platform</span>
            <h2 className="section-title">
              Mengenal Lebih Dekat KidNova<span className="logo-dot">.</span>
            </h2>
            <p className="section-lead">
              KidNova adalah sistem pakar berbasis web yang dirancang untuk melakukan skrining risiko dini
              dan memberikan edukasi kesehatan ginjal secara transparan, akurat, dan mudah dipahami masyarakat.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card about-card-highlight">
              <div className="about-card-badge">Tujuan Utama</div>
              <h3 className="about-card-title">Mengapa KidNova Dibuat?</h3>
              <p className="about-card-desc">
                Sebagian besar penyakit ginjal tidak menunjukkan gejala mencolok pada tahap awal (sering disebut *silent disease*). 
                KidNova hadir sebagai jembatan pencegahan agar masyarakat dapat menyadari gejala sejak dini sebelum terjadi komplikasi berat, 
                sekaligus membekali pengguna dengan pertanyaan yang tepat saat berkonsultasi ke dokter.
              </p>
              <div className="about-stats-row">
                <div className="about-stat">
                  <span className="about-stat-num">3</span>
                  <span className="about-stat-label">Jenis Gangguan Ginjal</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">1</span>
                  <span className="about-stat-label">Deteksi Tanda Darurat</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">100%</span>
                  <span className="about-stat-label">Sumber Resmi Terpercaya</span>
                </div>
              </div>
            </div>

            <div className="about-card">
              <div className="about-card-badge badge-blue-outline">Teknologi Cerdas</div>
              <h3 className="about-card-title">Kecerdasan Buatan Fuzzy Mamdani</h3>
              <p className="about-card-desc">
                Di dunia medis, gejala jarang sekali bersifat hitam-putih ("ya" atau "tidak"). 
                Dengan metode <strong>Fuzzy Mamdani</strong>, KidNova mengevaluasi tingkat keparahan gejala 
                (ringan, sedang, berat) melalui fungsi keanggotaan dan defuzzifikasi titik berat (centroid) 
                sehingga hasil persentase risiko (0–100%) menjadi jauh lebih realistis dan humanis.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-badge badge-yellow-outline">Rujukan Ilmiah</div>
              <h3 className="about-card-title">Pedoman Medis Terpercaya</h3>
              <p className="about-card-desc">
                Seluruh materi edukasi, batasan skala pertanyaan, dan rekomendasi pemeriksaan yang disajikan 
                merujuk pada pedoman klinis resmi:
              </p>
              <ul className="about-check-list">
                <li>Kemenkes RI / Ayo Sehat (GERMAS Ginjal Sehat)</li>
                <li>PERNEFRI (Perhimpunan Nefrologi Indonesia)</li>
                <li>IAUI (Ikatan Ahli Urologi Indonesia)</li>
                <li>KDIGO (Kidney Disease: Improving Global Outcomes)</li>
                <li>WHO &amp; National Kidney Foundation (NKF)</li>
              </ul>
            </div>

            <div className="about-card">
              <div className="about-card-badge badge-navy-outline">Privasi &amp; Keamanan</div>
              <h3 className="about-card-title">Privasi 100% Terjaga</h3>
              <p className="about-card-desc">
                Anda tidak diwajibkan mendaftarkan akun, email, ataupun nomor telepon untuk melakukan skrining. 
                Data yang Anda masukkan digunakan murni untuk keperluan perhitungan fuzzy risiko secara langsung.
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
              Mulai Cek Sekarang &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
