<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ReferensiEdukasi;
use App\Models\RiwayatSkrining;
use App\Services\FuzzyServiceConnector;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SkriningController extends Controller
{
    public function __construct(
        protected FuzzyServiceConnector $fuzzyService
    ) {}

    /**
     * Hitung Risiko Ginjal dengan Fuzzy Logic & Simpan Riwayat
     */
    public function calculate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama_pasien' => 'nullable|string|max:100',
            'usia' => 'required|numeric|min:15|max:90',
            'riwayat_kesehatan' => 'required|numeric|min:0|max:10',
            'gejala_fisik_urin' => 'required|numeric|min:0|max:10',
            'nyeri_pinggang_urin' => 'required|numeric|min:0|max:10',
            'gejala_infeksi' => 'required|numeric|min:0|max:10',
            'kebiasaan_hidup' => 'required|numeric|min:0|max:10',
            'tanda_bahaya' => 'nullable|boolean',
        ]);

        $validated['tanda_bahaya'] = (bool) ($request->input('tanda_bahaya', false));

        // 1. Eksekusi Perhitungan Fuzzy Mamdani (via microservice Python atau fallback)
        $fuzzyResult = $this->fuzzyService->evaluate($validated);

        $penyakitDominan = $fuzzyResult['penyakit_dominan'];
        $statusLevel = $fuzzyResult['status_level'];

        // 2. Ambil 2 - 4 Artikel Edukasi Resmi Relevan dari Database
        $query = ReferensiEdukasi::query();

        if ($fuzzyResult['tanda_bahaya']) {
            $artikelRekomendasi = $query->where('tingkat_risiko', 'darurat')
                ->orWhere('jenis_penyakit', 'Umum')
                ->take(3)
                ->get();
        } else {
            $artikelRekomendasi = $query->where(function ($q) use ($penyakitDominan, $statusLevel) {
                $q->where('jenis_penyakit', $penyakitDominan)
                  ->whereIn('tingkat_risiko', [$statusLevel, 'semua']);
            })->orWhere(function ($q) {
                $q->where('jenis_penyakit', 'Umum')
                  ->where('tingkat_risiko', 'semua');
            })->take(4)->get();
        }

        // 3. Simpan ke Database (Tabel riwayat_skrining)
        $userId = Auth::id() ?? $request->input('user_id');

        $riwayat = RiwayatSkrining::create([
            'user_id' => $userId,
            'nama_pasien' => $validated['nama_pasien'] ?? 'Anonim',
            'usia' => (int) $validated['usia'],
            'riwayat_kesehatan' => $validated['riwayat_kesehatan'],
            'gejala_fisik_urin' => $validated['gejala_fisik_urin'],
            'nyeri_pinggang_urin' => $validated['nyeri_pinggang_urin'],
            'gejala_infeksi' => $validated['gejala_infeksi'],
            'kebiasaan_hidup' => $validated['kebiasaan_hidup'],
            'tanda_bahaya' => $fuzzyResult['tanda_bahaya'],
            'skor_ginjal_kronis' => $fuzzyResult['skor']['ginjal_kronis'],
            'skor_batu_ginjal' => $fuzzyResult['skor']['batu_ginjal'],
            'skor_infeksi_ginjal' => $fuzzyResult['skor']['infeksi_ginjal'],
            'skor_tertinggi' => $fuzzyResult['skor_tertinggi'],
            'penyakit_dominan' => $fuzzyResult['penyakit_dominan'],
            'status_utama' => $fuzzyResult['status_label'],
            'status_level' => $fuzzyResult['status_level'],
            'status_color' => $fuzzyResult['status_color'],
            'faktor_penyebab_utama' => $fuzzyResult['faktor_penyebab_utama'],
            'panduan_dokter' => $fuzzyResult['panduan_dokter'],
            'ringkasan_analisis' => $fuzzyResult['penjelasan_singkat'],
            'tanggal_pengecekan' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Perhitungan fuzzy logic berhasil diselesaikan',
            'data' => array_merge($fuzzyResult, [
                'riwayat_id' => $riwayat->id,
                'nama_pasien' => $riwayat->nama_pasien,
                'tanggal_pengecekan' => $riwayat->tanggal_pengecekan->toIso8601String(),
                'artikel_rekomendasi' => $artikelRekomendasi,
            ]),
        ]);
    }

    /**
     * Mengambil daftar riwayat skrining
     */
    public function getRiwayat(Request $request): JsonResponse
    {
        $userId = Auth::id() ?? $request->query('user_id');

        $query = RiwayatSkrining::query()->orderBy('created_at', 'desc');

        if ($userId) {
            $query->where('user_id', $userId);
        }

        $riwayat = $query->take(50)->get();

        return response()->json([
            'success' => true,
            'data' => $riwayat,
        ]);
    }

    /**
     * Detail 1 riwayat skrining
     */
    public function showRiwayat(int $id): JsonResponse
    {
        $riwayat = RiwayatSkrining::findOrFail($id);

        $artikelRekomendasi = ReferensiEdukasi::where('jenis_penyakit', $riwayat->penyakit_dominan)
            ->orWhere('jenis_penyakit', 'Umum')
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => array_merge($riwayat->toArray(), [
                'artikel_rekomendasi' => $artikelRekomendasi,
            ]),
        ]);
    }

    /**
     * Daftar seluruh artikel edukasi resmi
     */
    public function getEdukasi(Request $request): JsonResponse
    {
        $jenis = $request->query('jenis');
        $query = ReferensiEdukasi::query();

        if ($jenis) {
            $query->where('jenis_penyakit', $jenis);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }
}
