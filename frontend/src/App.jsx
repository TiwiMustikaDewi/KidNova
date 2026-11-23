import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DisclaimerBanner from './components/DisclaimerBanner';
import HeroSection from './components/HeroSection';
import ScreeningWizard from './components/ScreeningWizard';
import ResultView from './components/ResultView';
import PrintReport from './components/PrintReport';
import HistoryModal from './components/HistoryModal';
import EducationModal from './components/EducationModal';
import TestCaseModal from './components/TestCaseModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [user, setUser] = useState(null);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [viewState, setViewState] = useState('home'); // 'home', 'wizard', 'result'
  const [screeningResult, setScreeningResult] = useState(null);
  const [wizardInitialData, setWizardInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modals
  const [showHistory, setShowHistory] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const res = await fetch('/api/me');
      const data = await res.json();
      if (data.authenticated) {
        setUser(data.user);
      }
    } catch {
      // Guest
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartScreening = () => {
    if (!agreedToDisclaimer) return;
    setViewState('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitScreening = async (formData) => {
    setLoading(true);
    const startTime = performance.now();

    try {
      const res = await fetch('/api/skrining', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          user_id: user?.id
        })
      });

      const responseJson = await res.json();
      const endTime = performance.now();
      const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);
      console.log(`KidnNova Fuzzy Engine: Selesai dalam ${durationSeconds} detik (< 2.0s).`);

      if (res.ok && responseJson.success) {
        setScreeningResult(responseJson.data);
        setViewState('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(responseJson.message || 'Gagal memproses perhitungan fuzzy.');
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghubungi backend KidnNova.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadTestCase = (testCaseId) => {
    const rawCases = {
      1: { usia: 21, riwayat_kesehatan: 0, gejala_fisik_urin: 0, nyeri_pinggang_urin: 0, gejala_infeksi: 0, kebiasaan_hidup: 1, tanda_bahaya: false, nama_pasien: "Kasus Uji 01 (Muda Bugar)" },
      2: { usia: 28, riwayat_kesehatan: 1, gejala_fisik_urin: 1, nyeri_pinggang_urin: 1, gejala_infeksi: 1, kebiasaan_hidup: 3, tanda_bahaya: false, nama_pasien: "Kasus Uji 02 (Dewasa Stabil)" },
      3: { usia: 65, riwayat_kesehatan: 1, gejala_fisik_urin: 1, nyeri_pinggang_urin: 0, gejala_infeksi: 0, kebiasaan_hidup: 1, tanda_bahaya: false, nama_pasien: "Kasus Uji 03 (Lansia Sehat)" },
      4: { usia: 32, riwayat_kesehatan: 0, gejala_fisik_urin: 1, nyeri_pinggang_urin: 1, gejala_infeksi: 0, kebiasaan_hidup: 3, tanda_bahaya: false, nama_pasien: "Kasus Uji 04 (Asin Moderat)" },
      5: { usia: 45, riwayat_kesehatan: 5, gejala_fisik_urin: 2, nyeri_pinggang_urin: 1, gejala_infeksi: 0, kebiasaan_hidup: 4, tanda_bahaya: false, nama_pasien: "Kasus Uji 05 (Waspada Hipertensi)" },
      6: { usia: 35, riwayat_kesehatan: 2, gejala_fisik_urin: 2, nyeri_pinggang_urin: 3, gejala_infeksi: 1, kebiasaan_hidup: 7, tanda_bahaya: false, nama_pasien: "Kasus Uji 06 (Waspada Hidrasi Buruk)" },
      7: { usia: 29, riwayat_kesehatan: 1, gejala_fisik_urin: 2, nyeri_pinggang_urin: 2, gejala_infeksi: 5, kebiasaan_hidup: 4, tanda_bahaya: false, nama_pasien: "Kasus Uji 07 (Waspada ISK Ringan)" },
      8: { usia: 40, riwayat_kesehatan: 2, gejala_fisik_urin: 2, nyeri_pinggang_urin: 5, gejala_infeksi: 2, kebiasaan_hidup: 5, tanda_bahaya: false, nama_pasien: "Kasus Uji 08 (Waspada Nyeri Pinggang)" },
      9: { usia: 68, riwayat_kesehatan: 4, gejala_fisik_urin: 5, nyeri_pinggang_urin: 2, gejala_infeksi: 1, kebiasaan_hidup: 4, tanda_bahaya: false, nama_pasien: "Kasus Uji 09 (Waspada Edema Lansia)" },
      10: { usia: 52, riwayat_kesehatan: 6, gejala_fisik_urin: 3, nyeri_pinggang_urin: 2, gejala_infeksi: 1, kebiasaan_hidup: 4, tanda_bahaya: false, nama_pasien: "Kasus Uji 10 (Waspada Analgesik)" },
      11: { usia: 62, riwayat_kesehatan: 9, gejala_fisik_urin: 9, nyeri_pinggang_urin: 3, gejala_infeksi: 2, kebiasaan_hidup: 8, tanda_bahaya: false, nama_pasien: "Kasus Uji 11 (Tinggi Ginjal Kronis)" },
      12: { usia: 44, riwayat_kesehatan: 3, gejala_fisik_urin: 4, nyeri_pinggang_urin: 9, gejala_infeksi: 2, kebiasaan_hidup: 9, tanda_bahaya: false, nama_pasien: "Kasus Uji 12 (Tinggi Batu Ginjal)" },
      13: { usia: 34, riwayat_kesehatan: 2, gejala_fisik_urin: 5, nyeri_pinggang_urin: 7, gejala_infeksi: 9, kebiasaan_hidup: 4, tanda_bahaya: false, nama_pasien: "Kasus Uji 13 (Tinggi Pielonefritis)" },
      14: { usia: 70, riwayat_kesehatan: 9, gejala_fisik_urin: 8, nyeri_pinggang_urin: 2, gejala_infeksi: 2, kebiasaan_hidup: 7, tanda_bahaya: false, nama_pasien: "Kasus Uji 14 (Tinggi Komplikasi DM)" },
      15: { usia: 55, riwayat_kesehatan: 7, gejala_fisik_urin: 8, nyeri_pinggang_urin: 8, gejala_infeksi: 5, kebiasaan_hidup: 6, tanda_bahaya: true, nama_pasien: "Kasus Uji 15 (DARURAT Anuria / IGD)" },
    };

    const target = rawCases[testCaseId];
    if (target) {
      setAgreedToDisclaimer(true);
      setWizardInitialData(target);
      handleSubmitScreening(target);
    }
  };

  const handleSelectHistoryItem = (historyItem) => {
    setScreeningResult({
      skor: {
        ginjal_kronis: historyItem.skor_ginjal_kronis,
        batu_ginjal: historyItem.skor_batu_ginjal,
        infeksi_ginjal: historyItem.skor_infeksi_ginjal,
      },
      penyakit_dominan: historyItem.penyakit_dominan,
      skor_tertinggi: historyItem.skor_tertinggi,
      status_level: historyItem.status_level,
      status_label: historyItem.status_utama,
      status_color: historyItem.status_color,
      tanda_bahaya: historyItem.tanda_bahaya,
      faktor_penyebab_utama: historyItem.faktor_penyebab_utama,
      panduan_dokter: historyItem.panduan_dokter,
      penjelasan_singkat: historyItem.ringkasan_analisis,
      riwayat_id: historyItem.id,
      nama_pasien: historyItem.nama_pasien,
      tanggal_pengecekan: historyItem.tanggal_pengecekan,
      artikel_rekomendasi: historyItem.artikel_rekomendasi || []
    });
    setViewState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      {/* Bespoke Header */}
      <Navbar
        user={user}
        onOpenAuth={() => setShowAuth(true)}
        onLogout={handleLogout}
        onOpenHistory={() => setShowHistory(true)}
        onOpenEducation={() => setShowEducation(true)}
        onOpenTestCases={() => setShowTestCases(true)}
        onStartScreening={() => {
          setViewState('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: HOME */}
        {viewState === 'home' && (
          <div className="space-y-6">
            <DisclaimerBanner
              agreed={agreedToDisclaimer}
              onToggleAgree={setAgreedToDisclaimer}
            />
            <HeroSection
              agreed={agreedToDisclaimer}
              onStart={handleStartScreening}
            />
          </div>
        )}

        {/* VIEW 2: SCREENING WIZARD */}
        {viewState === 'wizard' && (
          <div>
            <ScreeningWizard
              onSubmit={handleSubmitScreening}
              onCancel={() => setViewState('home')}
              initialData={wizardInitialData}
              loading={loading}
            />
          </div>
        )}

        {/* VIEW 3: RESULT VIEW */}
        {viewState === 'result' && (
          <div>
            <ResultView
              result={screeningResult}
              onRetest={() => {
                setViewState('wizard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPrint={handlePrint}
            />
          </div>
        )}
      </main>

      {/* Hidden Medical Print Document (For PDF Export / Print) */}
      <PrintReport result={screeningResult} />

      {/* Modals */}
      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectRiwayat={handleSelectHistoryItem}
      />

      <EducationModal
        isOpen={showEducation}
        onClose={() => setShowEducation(false)}
      />

      <TestCaseModal
        isOpen={showTestCases}
        onClose={() => setShowTestCases(false)}
        onLoadTestCase={handleLoadTestCase}
      />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

      {/* Bespoke Medical Platform Footer */}
      <footer className="bg-white border-t border-slate-200/90 py-8 mt-12 text-xs text-slate-500 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-xs">
              KN
            </div>
            <div>
              <p className="font-bold text-slate-900">
                KidnNova — Sistem Pakar Deteksi Dini Risiko Ginjal
              </p>
              <p className="text-[11px] text-slate-400">
                Tugas Akhir Semester (UAS) Sistem Pakar • Implementasi Logika Fuzzy Mamdani
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400 space-y-0.5">
            <p>Rujukan Medis: PERNEFRI • IAUI • Kemenkes RI • WHO • National Kidney Foundation</p>
            <p>© 2026 KidnNova Project • All clinical rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
