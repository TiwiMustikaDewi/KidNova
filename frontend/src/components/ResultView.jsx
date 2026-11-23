import React from 'react';
import DisclaimerBanner from './DisclaimerBanner';

export default function ResultView({ result, onRetest, onPrint }) {
  if (!result) return null;

  const skor = result.skor || {
    ginjal_kronis: 0,
    batu_ginjal: 0,
    infeksi_ginjal: 0
  };

  const isEmergency = result.tanda_bahaya || result.status_level === 'darurat';

  // Professional Clinical Status Config
  const getStatusConfig = () => {
    if (isEmergency) {
      return {
        badgeText: 'KONDISI DARURAT MEDIS (SEGERA KE IGD)',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold',
        borderClass: 'border-rose-400 ring-2 ring-rose-500/20 bg-rose-50/40',
        textColor: 'text-rose-950',
        scoreColor: 'text-rose-700',
        accentBg: 'bg-rose-600',
      };
    }
    if (result.status_level === 'tinggi') {
      return {
        badgeText: 'RISIKO TINGGI (70 - 100%)',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 font-bold',
        borderClass: 'border-rose-300 bg-rose-50/30',
        textColor: 'text-slate-900',
        scoreColor: 'text-rose-700',
        accentBg: 'bg-rose-600',
      };
    }
    if (result.status_level === 'waspada') {
      return {
        badgeText: 'PERLU WASPADA (40 - 69%)',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        borderClass: 'border-amber-300 bg-amber-50/30',
        textColor: 'text-slate-900',
        scoreColor: 'text-amber-700',
        accentBg: 'bg-amber-500',
      };
    }
    // Rendah
    return {
      badgeText: 'RISIKO RENDAH (0 - 39%)',
      badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
      borderClass: 'border-emerald-300 bg-emerald-50/30',
      textColor: 'text-slate-900',
      scoreColor: 'text-emerald-700',
      accentBg: 'bg-emerald-600',
    };
  };

  const statusCfg = getStatusConfig();

  return (
    <div className="max-w-4xl mx-auto my-6 space-y-6">
      {/* Top Clinical Advisory */}
      <DisclaimerBanner agreed={true} onToggleAgree={() => {}} isCompact={true} />

      {/* Control Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Laporan Evaluasi Risiko KidnNova
            </h2>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              #{result.riwayat_id ? `KN-${result.riwayat_id}` : 'LIVE'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pasien: <strong className="text-slate-700">{result.nama_pasien || 'Pasien Mandiri'}</strong> ({result.usia || 35} th) • Dievaluasi: {new Date(result.tanggal_pengecekan || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak / Unduh PDF
          </button>

          <button
            onClick={onRetest}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Uji Ulang
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4 KOTAK INFORMASI SPESIFIKASI PROYEK                           */}
      {/* ============================================================== */}

      {/* KOTAK 1: STATUS UTAMA */}
      <div className={`p-6 sm:p-7 rounded-3xl border ${statusCfg.borderClass} shadow-2xs transition-all`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-3 py-1 rounded-full border uppercase tracking-wider ${statusCfg.badgeClass}`}>
                {statusCfg.badgeText}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Hasil Defuzzifikasi Centroid
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${statusCfg.textColor}`}>
              {isEmergency ? 'Peringatan Bahaya Medis Terdeteksi' : result.status_label}
            </h3>

            <p className="text-sm text-slate-700 max-w-xl leading-relaxed">
              Berdasarkan inferensi aturan Mamdani, kecenderungan probabilitas tertinggi mengarah pada:{' '}
              <strong className="text-slate-900 font-bold">{result.penyakit_dominan} ({result.skor_tertinggi}%)</strong>.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-right md:min-w-[190px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Skor Puncak
            </span>
            <span className={`text-4xl font-extrabold tracking-tight ${statusCfg.scoreColor}`}>
              {result.skor_tertinggi}<span className="text-2xl text-slate-400 font-medium">%</span>
            </span>
          </div>
        </div>

        {/* Faktor Utama Pendorong Skor */}
        {result.faktor_penyebab_utama && result.faktor_penyebab_utama.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
              Faktor Determinan Utama Penentu Nilai Fuzzy:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.faktor_penyebab_utama.map((faktor, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <span className={`w-2 h-2 rounded-full ${statusCfg.accentBg}`}></span>
                  {faktor}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KOTAK 2: GRAFIK 3 RISIKO GANGGUAN GINJAL */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Kotak 2 – Analisis Tri-Risiko Gangguan Ginjal
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Komparasi probabilitas simultan dengan skala 0 – 100% (Mamdani Defuzzification).
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            Centroid Output
          </span>
        </div>

        <div className="space-y-6">
          {/* 1. Ginjal Kronis (CKD) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-2 text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                Penyakit Ginjal Kronis (CKD)
              </span>
              <span className="font-extrabold text-slate-900">{skor.ginjal_kronis}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full rounded-full bg-slate-900 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, Math.max(3, skor.ginjal_kronis))}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500">
              Parameter terkait: Usia, komorbid hipertensi/diabetes, analgesik kronis, edema perifer, proteinuria.
            </p>
          </div>

          {/* 2. Batu Ginjal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-2 text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-700"></span>
                Batu Ginjal (Nefrolitiasis)
              </span>
              <span className="font-extrabold text-teal-800">{skor.batu_ginjal}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full rounded-full bg-teal-700 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, Math.max(3, skor.batu_ginjal))}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500">
              Parameter terkait: Nyeri sudut kostovertebra kolik tajam, hematuria, asupan hidrasi harian rendah.
            </p>
          </div>

          {/* 3. Infeksi Ginjal / Saluran Kemih */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-2 text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                Infeksi Ginjal / Saluran Kemih (Pielonefritis / ISK)
              </span>
              <span className="font-extrabold text-rose-700">{skor.infeksi_ginjal}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full rounded-full bg-rose-600 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(100, Math.max(3, skor.infeksi_ginjal))}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500">
              Parameter terkait: Disuria, febris menggigil, leukosituria, frekuensi berkemih abnormal.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>0 – 39%: Kondisi Aman (Risiko Rendah)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>40 – 69%: Perlu Waspada (Pemeriksaan Dasar)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>70 – 100%: Risiko Tinggi (Konsultasi Spesialis Segera)</span>
          </div>
        </div>
      </div>

      {/* KOTAK 3: RINGKASAN & PANDUAN KE DOKTER */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Kotak 3 – Panduan Konsultasi & Rekomendasi Uji Klinis
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Rekomendasi pemeriksaan objektif yang dapat dibawa dan ditanyakan kepada dokter.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            Clinical Care Plan
          </span>
        </div>

        {/* Deskripsi Ulasan Sistem */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 block mb-1">Catatan Evaluasi KidnNova:</strong>
          {result.penjelasan_singkat}
        </div>

        {/* Rujukan & Daftar Lab */}
        {result.panduan_dokter && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/90">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Tingkat Urgensi Tindakan
              </span>
              <p className="text-sm font-bold text-slate-900">
                {result.panduan_dokter.urgensi}
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Rujukan Dokter Sasaran:{' '}
                <strong className="text-slate-900">{result.panduan_dokter.dokter_tujuan || 'Dokter Umum / Puskesmas'}</strong>
              </p>
              {result.panduan_dokter.catatan_konsultasi && (
                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 mt-3 italic">
                  "{result.panduan_dokter.catatan_konsultasi}"
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-900 block mb-2">
                Uji Penunjang & Laboratorium yang Dianjurkan:
              </span>
              <ul className="text-xs text-slate-700 space-y-2">
                {result.panduan_dokter.daftar_pemeriksaan?.map((tes, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{tes}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* KOTAK 4: BACAAN DARI SUMBER RESMI */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Kotak 4 – Literatur Edukasi Resmi Terverifikasi
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              100% kurasi dari Kemenkes RI (Ayo Sehat), PERNEFRI, IAUI, WHO, dan National Kidney Foundation.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            Sumber Resmi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.artikel_rekomendasi?.map((art, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl border border-slate-200/90 hover:border-slate-400 transition-all bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2 font-medium">
                  <span className="text-teal-900 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md font-semibold">
                    {art.nama_sumber}
                  </span>
                  <span className="text-slate-400">
                    {art.kategori_topik || art.jenis_penyakit}
                  </span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                  {art.judul}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {art.ringkasan}
                </p>
              </div>

              <a
                href={art.link_asli}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 pt-2 border-t border-slate-100 group"
              >
                <span>Buka Artikel Asli di Situs Resmi</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
