import React, { useState } from 'react';

export default function ScreeningWizard({ onSubmit, onCancel, initialData = null, loading = false }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nama_pasien: initialData?.nama_pasien || '',
    usia: initialData?.usia || 35,
    riwayat_kesehatan: initialData?.riwayat_kesehatan ?? 2,
    gejala_fisik_urin: initialData?.gejala_fisik_urin ?? 1,
    nyeri_pinggang_urin: initialData?.nyeri_pinggang_urin ?? 1,
    gejala_infeksi: initialData?.gejala_infeksi ?? 1,
    kebiasaan_hidup: initialData?.kebiasaan_hidup ?? 3,
    tanda_bahaya: initialData?.tanda_bahaya ?? false,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => setStep(s => Math.min(3, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Descriptive text for clinical levels
  const getScaleDescriptor = (val, type = 'gejala') => {
    if (type === 'riwayat') {
      if (val <= 3) return { text: 'Rendah (Tidak ada riwayat atau sangat terkontrol)', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      if (val <= 6) return { text: 'Sedang (Ada riwayat hipertensi/DM awal, obat terkontrol)', badge: 'bg-amber-50 text-amber-800 border-amber-200' };
      return { text: 'Tinggi (Komplikasi diabetes/hipertensi menahun atau konsumsi NSAID rutin)', badge: 'bg-rose-50 text-rose-800 border-rose-200' };
    }
    if (type === 'kebiasaan') {
      if (val <= 3) return { text: 'Baik (Hidrasi rutin >2.5 Liter/hari, pola makan seimbang)', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      if (val <= 6) return { text: 'Cukup (Asupan air 1.5 - 2 Liter/hari, garam/gula moderat)', badge: 'bg-amber-50 text-amber-800 border-amber-200' };
      return { text: 'Buruk (Jarang minum <1.5 L, sering makanan asin/manis, menahan kencing)', badge: 'bg-rose-50 text-rose-800 border-rose-200' };
    }
    // Gejala fisik / nyeri / infeksi
    if (val <= 3) return { text: 'Ringan (Jarang timbul atau keluhan sangat minimal)', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
    if (val <= 6) return { text: 'Sedang (Mulai mengganggu rutinitas harian)', badge: 'bg-amber-50 text-amber-800 border-amber-200' };
    return { text: 'Berat (Keluhan intens, persisten, dan signifikan)', badge: 'bg-rose-50 text-rose-800 border-rose-200' };
  };

  const QuickPillGroup = ({ value, onChange, options = [0, 2.5, 5.0, 7.5, 10] }) => (
    <div className="flex items-center gap-1.5 mt-2.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            value === opt
              ? 'bg-teal-800 text-white border-teal-800 shadow-2xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto my-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Step Header */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-800 px-3 py-1 rounded-full">
              Langkah {step} dari 3
            </span>
            <span className="text-xs text-slate-400 font-mono">KidnNova Wizard</span>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          {step === 1 && "Langkah 1: Profil Pasien & Riwayat Metabolik"}
          {step === 2 && "Langkah 2: Gejala Klinis & Traktus Urinarius"}
          {step === 3 && "Langkah 3: Hidrasi & Biomarker Gaya Hidup"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {step === 1 && "Karakteristik demografis dan riwayat morbiditas yang mempengaruhi perfusi mikrovaskular ginjal."}
          {step === 2 && "Manifestasi fisik makroskopis urin dan sensasi nyeri saluran kemih."}
          {step === 3 && "Faktor protektif cairan dan konsumsi zat terlarut yang memicu kejenuhan kristal urin."}
        </p>

        {/* Clinical Progress Stepper Bar */}
        <div className="grid grid-cols-3 gap-2.5 mt-6">
          <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-teal-400' : 'bg-slate-800'}`}></div>
          <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-teal-400' : 'bg-slate-800'}`}></div>
          <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-teal-400' : 'bg-slate-800'}`}></div>
        </div>
      </div>

      {/* Form Questions */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nama Lengkap / Inisial Pasien (Opsional untuk Laporan Medis)
              </label>
              <input
                type="text"
                placeholder="Contoh: Ny. Sri / Budi Santoso"
                value={formData.nama_pasien}
                onChange={(e) => handleChange('nama_pasien', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-sm font-medium text-slate-900"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Dapat dikosongkan bila ingin anonim (akan tertera sebagai 'Pasien Mandiri').</span>
            </div>

            {/* Usia */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900">
                  1. Usia Pasien: <span className="text-teal-800 text-base">{formData.usia} Tahun</span>
                </label>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800">
                  {formData.usia < 35 ? 'Kategori: Muda' : formData.usia < 60 ? 'Kategori: Dewasa' : 'Kategori: Lansia'}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="1"
                value={formData.usia}
                onChange={(e) => handleChange('usia', parseInt(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                <span>15 th (Muda)</span>
                <span>45 th (Dewasa)</span>
                <span>90 th (Lansia)</span>
              </div>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Secara fisiologis, laju filtrasi nefron ginjal mengalami penurunan alami sebesar 1 mL/menit/tahun setelah usia 40 tahun.
              </p>
            </div>

            {/* Riwayat Kesehatan */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-slate-900">
                  2. Riwayat Penyakit Penyerta (Komorbid): <span className="text-teal-800">{formData.riwayat_kesehatan} / 10</span>
                </label>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${getScaleDescriptor(formData.riwayat_kesehatan, 'riwayat').badge}`}>
                  {getScaleDescriptor(formData.riwayat_kesehatan, 'riwayat').text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={formData.riwayat_kesehatan}
                onChange={(e) => handleChange('riwayat_kesehatan', parseFloat(e.target.value))}
                className="w-full cursor-pointer mt-2"
              />
              <QuickPillGroup
                value={formData.riwayat_kesehatan}
                onChange={(v) => handleChange('riwayat_kesehatan', v)}
              />
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Mencakup diagnosis: Hipertensi, Diabetes Mellitus, Asam Urat tinggi, atau kebiasaan konsumsi obat pereda nyeri (NSAID seperti asam mefenamat/natrium diklofenak/jamu tradisional tanpa resep).
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Tanda Bahaya Darurat (Clinical Red Flag) */}
            <div className={`p-5 rounded-2xl border transition-all ${
              formData.tanda_bahaya 
                ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  formData.tanda_bahaya ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Protokol Tanda Bahaya Medis (Red Flag Signs)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Apakah saat ini pasien mengalami: <strong>sama sekali tidak dapat buang air kecil (anuria total)</strong>, <strong>nyeri kolik punggung sangat tajam tak tertahankan</strong>, atau <strong>demam menggigil hebat disertai mual dan muntah profus</strong>?
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <label className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      !formData.tanda_bahaya ? 'bg-white border-slate-300 text-slate-800 shadow-2xs' : 'bg-transparent border-slate-200 text-slate-500'
                    }`}>
                      <input
                        type="radio"
                        name="tanda_bahaya"
                        checked={formData.tanda_bahaya === false}
                        onChange={() => handleChange('tanda_bahaya', false)}
                        className="text-teal-700"
                      />
                      Tidak Ada (Kondisi Stabil)
                    </label>

                    <label className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition ${
                      formData.tanda_bahaya ? 'bg-rose-600 text-white border-rose-600 shadow-2xs' : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}>
                      <input
                        type="radio"
                        name="tanda_bahaya"
                        checked={formData.tanda_bahaya === true}
                        onChange={() => handleChange('tanda_bahaya', true)}
                        className="text-rose-600"
                      />
                      Ya, Mengalami Gejala Bahaya Ini!
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Gejala Fisik & Urin Berbusa */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-slate-900">
                  3. Gejala Fisik Edema & Urin Berbusa: <span className="text-teal-800">{formData.gejala_fisik_urin} / 10</span>
                </label>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${getScaleDescriptor(formData.gejala_fisik_urin).badge}`}>
                  {getScaleDescriptor(formData.gejala_fisik_urin).text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={formData.gejala_fisik_urin}
                onChange={(e) => handleChange('gejala_fisik_urin', parseFloat(e.target.value))}
                className="w-full cursor-pointer mt-2"
              />
              <QuickPillGroup
                value={formData.gejala_fisik_urin}
                onChange={(v) => handleChange('gejala_fisik_urin', v)}
              />
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Pembengkakan pada pergelangan kaki atau kelopak mata (retensi cairan), urin berbusa tebal seperti busa sabun (indikator kebocoran albumin), serta cepat lelah dan pucat (anemia nefrogenik).
              </p>
            </div>

            {/* Nyeri Pinggang & Warna Urin */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-slate-900">
                  4. Nyeri Kolik Pinggang & Urin Kemerahan: <span className="text-teal-800">{formData.nyeri_pinggang_urin} / 10</span>
                </label>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${getScaleDescriptor(formData.nyeri_pinggang_urin).badge}`}>
                  {getScaleDescriptor(formData.nyeri_pinggang_urin).text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={formData.nyeri_pinggang_urin}
                onChange={(e) => handleChange('nyeri_pinggang_urin', parseFloat(e.target.value))}
                className="w-full cursor-pointer mt-2"
              />
              <QuickPillGroup
                value={formData.nyeri_pinggang_urin}
                onChange={(v) => handleChange('nyeri_pinggang_urin', v)}
              />
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Nyeri mendadak menusuk pada area sudut kostovertebra (pinggang samping/belakang) yang menjalar ke lipat paha, disertai urin keruh berpasir atau berwarna merah muda/teh gelap (hematuria).
              </p>
            </div>

            {/* Gejala Infeksi Saluran Kemih */}
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-slate-900">
                  5. Gejala Infeksi & Disuria (BAK Panas): <span className="text-teal-800">{formData.gejala_infeksi} / 10</span>
                </label>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${getScaleDescriptor(formData.gejala_infeksi).badge}`}>
                  {getScaleDescriptor(formData.gejala_infeksi).text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={formData.gejala_infeksi}
                onChange={(e) => handleChange('gejala_infeksi', parseFloat(e.target.value))}
                className="w-full cursor-pointer mt-2"
              />
              <QuickPillGroup
                value={formData.gejala_infeksi}
                onChange={(v) => handleChange('gejala_infeksi', v)}
              />
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Sensasi perih/terbakar saat berkemih (disuria), perasaan ingin berkemih terus-menerus namun keluar sedikit (polakisuria/anyang-anyangan), serta demam febris sumeng-sumeng.
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-bold text-slate-900">
                  6. Asupan Hidrasi & Gaya Hidup Harian: <span className="text-teal-800">{formData.kebiasaan_hidup} / 10</span>
                </label>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${getScaleDescriptor(formData.kebiasaan_hidup, 'kebiasaan').badge}`}>
                  {getScaleDescriptor(formData.kebiasaan_hidup, 'kebiasaan').text}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={formData.kebiasaan_hidup}
                onChange={(e) => handleChange('kebiasaan_hidup', parseFloat(e.target.value))}
                className="w-full cursor-pointer mt-2"
              />
              <QuickPillGroup
                value={formData.kebiasaan_hidup}
                onChange={(v) => handleChange('kebiasaan_hidup', v)}
              />
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Skala 0 (Optimal, minum &gt; 2.5L air putih/hari, rendah natrium) hingga 10 (Sangat kurang minum air &lt; 1.5L/hari, sering minuman manis/energi/soda, konsumsi natrium tinggi, dan sering menahan BAK).
              </p>
            </div>

            {/* Clinical Readiness Note */}
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 text-xs text-teal-950">
              <div className="flex items-center gap-2 font-bold mb-1">
                <svg className="w-4 h-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Semua parameter input telah terisi lengkap
              </div>
              <p className="leading-relaxed text-teal-900/80">
                Data akan diteruskan ke mesin <strong>KidnNova Fuzzy Logic Mamdani</strong> untuk dilakukan fuzzifikasi, inferensi aturan min-max, dan defuzzifikasi centroid.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-200/90">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer"
            >
              ← Kembali
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut Langkah Berikutnya</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-bold text-xs text-white shadow-sm transition flex items-center gap-2.5 cursor-pointer ${
                loading ? 'bg-slate-400 cursor-wait' : 'bg-teal-800 hover:bg-teal-900'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Menghitung Inferensi Fuzzy...
                </>
              ) : (
                <>
                  <span>Hitung Probabilitas Risiko Sekarang</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
