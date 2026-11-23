import React from 'react';

export default function DisclaimerBanner({ agreed, onToggleAgree, isCompact = false }) {
  if (isCompact) {
    return (
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 text-amber-950 flex items-start gap-3.5 text-xs leading-relaxed shadow-xs">
        <div className="w-7 h-7 rounded-lg bg-amber-200/70 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <strong className="font-bold text-amber-900 block mb-0.5">Pernyataan Etika & Batasan Medis:</strong>
          Hasil analisis KidnNova dihitung menggunakan algoritma logika fuzzy Mamdani dan <span className="font-semibold underline">bukan merupakan vonis klinis atau diagnosis pengganti dokter</span>. Hasil ini ditujukan sebagai skrining probabilitas awal untuk memandu pemeriksaan lanjutan di fasilitas kesehatan resmi.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-bold text-slate-900 text-base">
              Pernyataan Persetujuan Skrining Klinis Mandiri
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
              Informed Consent
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Aplikasi <strong>KidnNova</strong> berfungsi sebagai sarana <strong>skrining awal risiko dini</strong> dan media edukasi pencegahan penyakit ginjal. Seluruh aturan inferensi diselaraskan dengan literatur medis resmi <strong>PERNEFRI, IAUI, Kemenkes RI, dan WHO</strong>. Sistem ini tidak memberikan resep obat dan tidak menggantikan pemeriksaan fisik langsung oleh dokter spesialis.
          </p>

          <label className="flex items-start sm:items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-teal-50/30 hover:border-teal-300 transition-all select-none group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => onToggleAgree(e.target.checked)}
              className="mt-0.5 sm:mt-0 w-5 h-5 text-teal-700 rounded-md border-slate-300 focus:ring-teal-600 focus:ring-2 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-teal-950">
              Saya memahami bahwa hasil pemeriksaan KidnNova adalah estimasi sistem pakar dan bukan diagnosis medis final.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
