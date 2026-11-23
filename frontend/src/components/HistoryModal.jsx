import React, { useState, useEffect } from 'react';

export default function HistoryModal({ isOpen, onClose, onSelectRiwayat }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/riwayat');
      const data = await res.json();
      if (data.success) {
        setHistory(data.data || []);
      }
    } catch (e) {
      console.error("Gagal mengambil data riwayat", e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Riwayat Skrining Ginjal</h3>
            <p className="text-xs text-slate-500">Daftar pemeriksaan terdahulu untuk memantau perubahan kondisi kesehatan.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              <svg className="animate-spin h-6 w-6 text-sky-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Memuat data riwayat...
            </div>
          ) : history.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <svg className="w-12 h-12 mx-auto text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-semibold text-slate-600">Belum ada riwayat skrining tersimpan</p>
              <p className="text-xs text-slate-400 mt-1">Lakukan skrining pertama Anda untuk melihat riwayat di sini.</p>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onSelectRiwayat(item);
                  onClose();
                }}
                className="p-4 rounded-2xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 cursor-pointer transition flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">
                      {item.nama_pasien || 'Pasien Mandiri'} ({item.usia} th)
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                      item.status_level === 'darurat' || item.status_level === 'tinggi' 
                        ? 'bg-rose-100 text-rose-800' 
                        : item.status_level === 'waspada' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.status_utama}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Dominan: <strong className="text-slate-700">{item.penyakit_dominan} ({item.skor_tertinggi}%)</strong> • Kronis: {item.skor_ginjal_kronis}% • Batu: {item.skor_batu_ginjal}% • ISK: {item.skor_infeksi_ginjal}%
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {new Date(item.tanggal_pengecekan || item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Lihat Hasil →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
