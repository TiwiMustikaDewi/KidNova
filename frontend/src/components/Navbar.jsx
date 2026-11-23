import React from 'react';

export default function Navbar({ user, onOpenAuth, onLogout, onOpenHistory, onOpenEducation, onOpenTestCases, onStartScreening }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand: KidnNova */}
        <div 
          onClick={onStartScreening}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 flex items-center justify-center text-white shadow-md shadow-teal-900/10 group-hover:shadow-teal-900/20 group-hover:scale-[1.02] transition-all">
            {/* Custom Kidney & AI Pulse Vector Icon */}
            <svg className="w-6 h-6 text-teal-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 4.5v15m0-15C9.5 4.5 7 6.5 7 10.5c0 4 2 6 5 9 3-3 5-5 5-9 0-4-2.5-6-5-6z" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Kidn<span className="text-teal-700 font-extrabold">Nova</span>
              </span>
              <span className="text-[10px] bg-teal-50 border border-teal-200/80 text-teal-800 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Clinical AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-tight hidden sm:block">
              Sistem Pakar Risiko Penyakit Ginjal • Logika Fuzzy Mamdani
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 15 Kasus Uji UAS */}
          <button
            onClick={onOpenTestCases}
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-xl transition-all cursor-pointer"
            title="Verifikasi 15 Kasus Uji UAS"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-amber-200"></span>
            15 Kasus Uji UAS
          </button>

          {/* Ensiklopedia Edukasi */}
          <button
            onClick={onOpenEducation}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-800 hover:bg-slate-100/80 border border-transparent hover:border-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="hidden sm:inline">Edukasi Resmi</span>
            <span className="sm:hidden">Edukasi</span>
          </button>

          {/* Riwayat */}
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-800 hover:bg-slate-100/80 border border-transparent hover:border-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Riwayat</span>
          </button>

          {/* Auth Button / Profile */}
          {user ? (
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-teal-800 text-teal-100 font-bold flex items-center justify-center text-xs shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden lg:inline max-w-[120px] truncate">{user.name}</span>
              <button
                onClick={onLogout}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Masuk / Daftar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
