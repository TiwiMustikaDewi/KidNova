import React from 'react';

export default function PrintReport({ result }) {
  if (!result) return null;

  const dateStr = new Date(result.tanggal_pengecekan || Date.now()).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="hidden print:block p-8 bg-white text-black max-w-4xl mx-auto font-sans">
      {/* Kop Lembar Medis KidnNova */}
      <div className="border-b-2 border-black pb-4 mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight uppercase">
          KIDNNOVA — LEMBAR HASIL EVALUASI SKRINING AWAL RISIKO GINJAL
        </h1>
        <p className="text-xs font-semibold text-slate-800 tracking-wide mt-0.5">
          SISTEM PAKAR KECERDASAN BUATAN BERBASIS LOGIKA FUZZY MAMDANI
        </p>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Standar Inferensi Medis: PERNEFRI, IAUI, Kemenkes RI, WHO, National Kidney Foundation
        </p>
      </div>

      {/* Informasi Pasien & Pemeriksaan */}
      <div className="grid grid-cols-2 gap-4 border border-black p-3.5 mb-5 text-xs">
        <div>
          <p><strong>Nama Pasien:</strong> {result.nama_pasien || 'Pasien Mandiri'}</p>
          <p><strong>Usia:</strong> {result.usia || 35} Tahun</p>
          <p><strong>Waktu Pemeriksaan:</strong> {dateStr}</p>
        </div>
        <div>
          <p><strong>Status Risiko Utama:</strong> {result.status_utama || result.status_label}</p>
          <p><strong>Kecenderungan Terbesar:</strong> {result.penyakit_dominan} ({result.skor_tertinggi}%)</p>
          <p><strong>Nomor Rekam Sistem:</strong> #{result.riwayat_id ? `KN-${result.riwayat_id}` : 'DEMO'}</p>
        </div>
      </div>

      {/* Tabel Komparasi 3 Risiko */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">
          1. Hasil Perhitungan Derajat Risiko Organ (Metode Centroid Defuzzification)
        </h3>
        <table className="w-full text-xs border-collapse border border-black text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-black p-2 w-12 text-center">No</th>
              <th className="border border-black p-2">Jenis Gangguan Ginjal yang Dievaluasi</th>
              <th className="border border-black p-2 w-28 text-center">Skor Risiko (%)</th>
              <th className="border border-black p-2 w-36 text-center">Kategori Tingkat Risiko</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2 text-center">1</td>
              <td className="border border-black p-2 font-semibold">Penyakit Ginjal Kronis (CKD)</td>
              <td className="border border-black p-2 text-center font-bold">{result.skor?.ginjal_kronis ?? '-'}%</td>
              <td className="border border-black p-2 text-center">
                {(result.skor?.ginjal_kronis >= 70) ? 'Risiko Tinggi' : (result.skor?.ginjal_kronis >= 40) ? 'Perlu Waspada' : 'Risiko Rendah'}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">2</td>
              <td className="border border-black p-2 font-semibold">Batu Ginjal (Nefrolitiasis)</td>
              <td className="border border-black p-2 text-center font-bold">{result.skor?.batu_ginjal ?? '-'}%</td>
              <td className="border border-black p-2 text-center">
                {(result.skor?.batu_ginjal >= 70) ? 'Risiko Tinggi' : (result.skor?.batu_ginjal >= 40) ? 'Perlu Waspada' : 'Risiko Rendah'}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 text-center">3</td>
              <td className="border border-black p-2 font-semibold">Infeksi Saluran Kemih / Pielonefritis (ISK)</td>
              <td className="border border-black p-2 text-center font-bold">{result.skor?.infeksi_ginjal ?? '-'}%</td>
              <td className="border border-black p-2 text-center">
                {(result.skor?.infeksi_ginjal >= 70) ? 'Risiko Tinggi' : (result.skor?.infeksi_ginjal >= 40) ? 'Perlu Waspada' : 'Risiko Rendah'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ringkasan & Faktor Pendorong Utama */}
      <div className="mb-5 text-xs leading-relaxed">
        <h3 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">
          2. Catatan Evaluasi & Determinan Gejala
        </h3>
        <p className="mb-1.5">{result.penjelasan_singkat}</p>
        {result.faktor_penyebab_utama && (
          <p><strong>Faktor Dominan:</strong> {result.faktor_penyebab_utama.join(', ')}</p>
        )}
      </div>

      {/* Rekomendasi Uji Klinis untuk Dokter */}
      <div className="mb-5 text-xs leading-relaxed">
        <h3 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">
          3. Rekomendasi Uji Penunjang Klinis Saat Berkonsultasi ke Dokter
        </h3>
        <p><strong>Dokter Sasaran:</strong> {result.panduan_dokter?.dokter_tujuan || 'Dokter Umum / Puskesmas'}</p>
        <p><strong>Tingkat Urgensi:</strong> {result.panduan_dokter?.urgensi || '-'}</p>
        <p className="font-semibold mt-1">Daftar Pemeriksaan yang Disarankan:</p>
        <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
          {result.panduan_dokter?.daftar_pemeriksaan?.map((tes, idx) => (
            <li key={idx}>{tes}</li>
          ))}
        </ul>
      </div>

      {/* Peringatan Medis Wajib (Disclaimer Resmi) */}
      <div className="border border-black p-3 mb-6 text-[10px] leading-relaxed bg-slate-50">
        <strong className="block uppercase mb-0.5">
          PERNYATAAN RESMI (DISCLAIMER MEDIS):
        </strong>
        Lembar ini merupakan hasil simulasi model kecerdasan buatan sistem pakar (Logika Fuzzy Mamdani KidnNova) untuk skrining awal 
        dan <strong>BUKAN merupakan vonis, diagnosis resmi, ataupun resep pengobatan dokter</strong>. Lembar ringkasan ini 
        dirancang untuk membantu diskusi anamnesis awal saat pasien memeriksakan diri secara langsung ke fasilitas layanan kesehatan resmi.
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-between items-center text-xs pt-4 border-t border-black">
        <div className="text-center w-48">
          <p>Pasien / Pengguna</p>
          <div className="h-16"></div>
          <p className="border-t border-black pt-1">({result.nama_pasien || 'Pasien Mandiri'})</p>
        </div>

        <div className="text-center w-48">
          <p>Dokter Pemeriksa / Klinik</p>
          <div className="h-16"></div>
          <p className="border-t border-black pt-1">(.......................................)</p>
        </div>
      </div>
    </div>
  );
}
