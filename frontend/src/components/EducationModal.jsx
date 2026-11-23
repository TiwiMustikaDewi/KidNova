import React, { useState, useEffect } from 'react';

export default function EducationModal({ isOpen, onClose }) {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('Semua');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchArticles();
    }
  }, [isOpen]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/edukasi');
      const data = await res.json();
      if (data.success) {
        setArticles(data.data || []);
      }
    } catch (e) {
      console.error("Gagal mengambil artikel edukasi", e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'Semua' 
    ? articles 
    : articles.filter(a => a.jenis_penyakit === filter || (filter === 'Umum' && a.jenis_penyakit === 'Umum'));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Ensiklopedia Edukasi Kesehatan Ginjal</h3>
            <p className="text-xs text-slate-500">100% rujukan resmi: Kemenkes RI, PERNEFRI, IAUI, WHO, & National Kidney Foundation.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex flex-wrap gap-2 text-xs font-semibold">
          {['Semua', 'Ginjal Kronis', 'Batu Ginjal', 'Infeksi Ginjal / Saluran Kemih', 'Umum'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full transition ${
                filter === cat 
                  ? 'bg-sky-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Articles List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Memuat artikel resmi...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Tidak ada artikel yang cocok.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((art) => (
                <div 
                  key={art.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition bg-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-2 font-semibold">
                      <span className="text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-md">
                        {art.nama_sumber}
                      </span>
                      <span className="text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md">
                        {art.kategori_topik || art.jenis_penyakit}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2">
                      {art.judul}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {art.ringkasan}
                    </p>
                  </div>

                  <a
                    href={art.link_asli}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 pt-3 border-t border-slate-200 group"
                  >
                    Buka Artikel Asli
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
