import React from 'react';

export default function HeroSection({ onStart, agreed }) {
  return (
    <div className="py-6 sm:py-10">
      {/* Top Banner Tag */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-teal-600"></span>
          KidnNova Decision Support Engine • UAS Sistem Pakar
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Rujukan Standar: <span className="font-semibold text-slate-700">PERNEFRI • IAUI • Kemenkes RI • WHO</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Skrining Awal & Deteksi Risiko <br />
          <span className="text-teal-800">Gangguan Ginjal Komprehensif</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
          Banyak komplikasi nefrologis berkembang tanpa gejala spesifik di stadium awal. <strong>KidnNova</strong> menerapkan pemodelan <strong>Fuzzy Mamdani</strong> (Max-Min Inference & Centroid Defuzzification) untuk membaca derajat gejala klinis secara bertingkat dan mengestimasi risiko secara objektif.
        </p>
      </div>

      {/* 3 Clinical Pillars */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
              Pillar 01
            </span>
            <span className="text-xs text-slate-400 font-mono">01/03</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">
            Penyakit Ginjal Kronis (CKD)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menganalisis penurunan laju filtrasi glomerulus bertahap akibat hipertensi, diabetes melitus, pembengkakan ekstremitas, dan proteinuria.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
              Pillar 02
            </span>
            <span className="text-xs text-slate-400 font-mono">02/03</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">
            Nefrolitiasis (Batu Ginjal)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mengukur potensi kristalisasi kalsium/asam urat dari korelasi nyeri kolik pinggang tajam, hematuria, dan deficit volume cairan tubuh.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
              Pillar 03
            </span>
            <span className="text-xs text-slate-400 font-mono">03/03</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">
            Pielonefritis & ISK
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mendeteksi invasi infeksi bakteri pada traktus urinarius yang naik ke parenkim ginjal ditandai disuria, febris, dan anyang-anyangan.
          </p>
        </div>
      </div>

      {/* Emergency Red Flag Notice Bar */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-200">
            Dilengkapi protokol proteksi klinis: <strong className="text-white">Deteksi Otomatis Kondisi Darurat (Anuria, Kolik Hebat, Febris Tinggi)</strong>
          </span>
        </div>
        <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider bg-rose-950/80 border border-rose-800 px-3 py-1 rounded-lg shrink-0">
          Rujukan Langsung IGD
        </span>
      </div>

      {/* Action CTA Box */}
      <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Mulai Skrining Mandiri (3 Langkah Singkat)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Waktu pengerjaan sekitar 2 menit • Data aman dan tersimpan dalam riwayat
          </p>
        </div>

        <div>
          <button
            onClick={onStart}
            disabled={!agreed}
            className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm shadow-sm transition-all ${
              agreed
                ? 'bg-teal-800 hover:bg-teal-900 text-white cursor-pointer hover:shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Mulai Pemeriksaan Mandiri</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {!agreed && (
        <p className="mt-2 text-xs text-amber-800 font-medium text-right sm:text-right text-center">
          *Mohon setujui pernyataan etika medis di atas terlebih dahulu.
        </p>
      )}
    </div>
  );
}
