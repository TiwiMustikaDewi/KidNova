<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FuzzyServiceConnector
{
    protected string $pythonServiceUrl;

    public function __construct()
    {
        $this->pythonServiceUrl = env('FUZZY_SERVICE_URL', 'http://127.0.0.1:8001');
    }

    /**
     * Kirim data input ke microservice Python Fuzzy Logic (Port 8001)
     */
    public function evaluate(array $inputData): array
    {
        try {
            $response = Http::timeout(2.0)->post("{$this->pythonServiceUrl}/calculate", [
                'usia' => (float) ($inputData['usia'] ?? 30),
                'riwayat_kesehatan' => (float) ($inputData['riwayat_kesehatan'] ?? 0),
                'gejala_fisik_urin' => (float) ($inputData['gejala_fisik_urin'] ?? 0),
                'nyeri_pinggang_urin' => (float) ($inputData['nyeri_pinggang_urin'] ?? 0),
                'gejala_infeksi' => (float) ($inputData['gejala_infeksi'] ?? 0),
                'kebiasaan_hidup' => (float) ($inputData['kebiasaan_hidup'] ?? 0),
                'tanda_bahaya' => (bool) ($inputData['tanda_bahaya'] ?? false),
            ]);

            if ($response->successful()) {
                $body = $response->json();
                if (isset($body['data'])) {
                    $body['data']['source'] = 'python_fastapi_mamdani';
                    return $body['data'];
                }
            }
        } catch (\Throwable $e) {
            Log::warning("FastAPI fuzzy-service tidak merespon: {$e->getMessage()}. Menggunakan internal Mamdani calculation fallback.");
        }

        // Fallback Mamdani calculation in PHP jika Python service belum diaktifkan
        return $this->fallbackMamdaniCalculation($inputData);
    }

    /**
     * Fallback kalkulasi Mamdani presisi tinggi di PHP
     */
    protected function fallbackMamdaniCalculation(array $inputs): array
    {
        $usia = (float) ($inputs['usia'] ?? 30);
        $riwayat = (float) ($inputs['riwayat_kesehatan'] ?? 0);
        $gejalaFisik = (float) ($inputs['gejala_fisik_urin'] ?? 0);
        $nyeriPinggang = (float) ($inputs['nyeri_pinggang_urin'] ?? 0);
        $gejalaInfeksi = (float) ($inputs['gejala_infeksi'] ?? 0);
        $polaHidup = (float) ($inputs['kebiasaan_hidup'] ?? 0);
        $tandaBahaya = (bool) ($inputs['tanda_bahaya'] ?? false);

        // Derajat keanggotaan input
        $uMuda = $this->trapmf($usia, 15, 15, 25, 38);
        $uDewasa = $this->trimf($usia, 32, 48, 62);
        $uLansia = $this->trapmf($usia, 55, 68, 90, 90);

        $rRendah = $this->trapmf($riwayat, 0, 0, 2.0, 4.0);
        $rSedang = $this->trimf($riwayat, 3.0, 5.0, 7.0);
        $rTinggi = $this->trapmf($riwayat, 6.0, 8.0, 10.0, 10.0);

        $fRingan = $this->trapmf($gejalaFisik, 0, 0, 2.0, 4.0);
        $fSedang = $this->trimf($gejalaFisik, 3.0, 5.0, 7.0);
        $fBerat = $this->trapmf($gejalaFisik, 6.0, 8.0, 10.0, 10.0);

        $pRingan = $this->trapmf($nyeriPinggang, 0, 0, 2.0, 4.0);
        $pSedang = $this->trimf($nyeriPinggang, 3.0, 5.0, 7.0);
        $pBerat = $this->trapmf($nyeriPinggang, 6.0, 8.0, 10.0, 10.0);

        $iRingan = $this->trapmf($gejalaInfeksi, 0, 0, 2.0, 4.0);
        $iSedang = $this->trimf($gejalaInfeksi, 3.0, 5.0, 7.0);
        $iBerat = $this->trapmf($gejalaInfeksi, 6.0, 8.0, 10.0, 10.0);

        $hBaik = $this->trapmf($polaHidup, 0, 0, 2.0, 4.0);
        $hCukup = $this->trimf($polaHidup, 3.0, 5.0, 7.0);
        $hBuruk = $this->trapmf($polaHidup, 6.0, 8.0, 10.0, 10.0);

        // Inferensi Mamdani (Aturan Ginjal Kronis)
        $k_tinggi = max(
            min($rTinggi, $fBerat),
            min($fBerat, max($uLansia, $hBuruk)),
            min($rTinggi, $hBuruk)
        );
        $k_waspada = max(
            min($rSedang, $fSedang),
            min($rSedang, max($uDewasa, $uLansia)),
            min($rSedang, $hCukup),
            min($fSedang, max($uDewasa, $uLansia)),
            min($rTinggi, $fRingan),
            min($rRendah, $fSedang),
            min($hBuruk, $uLansia)
        );
        $k_rendah = max(
            min($rRendah, $fRingan, $hBaik),
            min($rRendah, $fRingan, $uMuda),
            min($rRendah, $fRingan)
        );

        $skorKronis = $this->defuzzifyCentroid($k_rendah, $k_waspada, $k_tinggi);

        // Inferensi Mamdani (Batu Ginjal)
        $b_tinggi = max(
            min($pBerat, $hBuruk),
            $pBerat,
            min($pSedang, $hBuruk)
        );
        $b_waspada = max(
            min($pSedang, $hCukup),
            min($pSedang, $hBaik),
            min($pRingan, $hBuruk)
        );
        $b_rendah = max(
            min($pRingan, $hCukup),
            min($pRingan, $hBaik)
        );

        $skorBatu = $this->defuzzifyCentroid($b_rendah, $b_waspada, $b_tinggi);

        // Inferensi Mamdani (Infeksi Ginjal / ISK)
        $inf_tinggi = max(
            min($iBerat, max($pBerat, $fBerat)),
            $iBerat
        );
        $inf_waspada = max(
            min($iSedang, $pSedang),
            $iSedang,
            min($iRingan, $pSedang)
        );
        $inf_rendah = $iRingan;

        $skorInfeksi = $this->defuzzifyCentroid($inf_rendah, $inf_waspada, $inf_tinggi);

        $scores = [
            'Ginjal Kronis' => $skorKronis,
            'Batu Ginjal' => $skorBatu,
            'Infeksi Ginjal / Saluran Kemih' => $skorInfeksi,
        ];

        $penyakitDominan = array_keys($scores, max($scores))[0];
        $skorTertinggi = $scores[$penyakitDominan];

        if ($tandaBahaya) {
            $statusLevel = 'darurat';
            $statusLabel = 'Kondisi Darurat (Segera ke IGD)';
            $statusColor = 'red';
        } elseif ($skorTertinggi >= 70) {
            $statusLevel = 'tinggi';
            $statusLabel = 'Risiko Tinggi';
            $statusColor = 'red';
        } elseif ($skorTertinggi >= 40) {
            $statusLevel = 'waspada';
            $statusLabel = 'Perlu Waspada';
            $statusColor = 'yellow';
        } else {
            $statusLevel = 'rendah';
            $statusLabel = 'Risiko Rendah';
            $statusColor = 'green';
        }

        $factors = [];
        if ($riwayat >= 4.0) $factors[] = 'Riwayat Hipertensi/Diabetes/Obat Nyeri';
        if ($gejalaFisik >= 4.0) $factors[] = 'Gejala Fisik Bengkak & Urin Berbusa';
        if ($nyeriPinggang >= 4.0) $factors[] = 'Nyeri Pinggang Kolik Tajam & Urin Keruh/Merah';
        if ($gejalaInfeksi >= 4.0) $factors[] = 'Gejala Demam & Nyeri Saat Buang Air Kecil';
        if ($polaHidup >= 4.0) $factors[] = 'Pola Hidup Kurang Minum & Konsumsi Asin/Manis';
        if ($usia > 50) $factors[] = 'Faktor Usia Lanjut';

        if (empty($factors)) {
            $factors = ['Pola hidup dan kondisi umum saat ini relatif terkontrol dengan baik.'];
        } else {
            $factors = array_slice($factors, 0, 2);
        }

        return [
            'source' => 'internal_mamdani_engine',
            'skor' => [
                'ginjal_kronis' => $skorKronis,
                'batu_ginjal' => $skorBatu,
                'infeksi_ginjal' => $skorInfeksi,
            ],
            'penyakit_dominan' => $penyakitDominan,
            'skor_tertinggi' => $skorTertinggi,
            'status_level' => $statusLevel,
            'status_label' => $statusLabel,
            'status_color' => $statusColor,
            'tanda_bahaya' => $tandaBahaya,
            'faktor_penyebab_utama' => $factors,
            'panduan_dokter' => $this->getDoctorGuidance($penyakitDominan, $skorTertinggi, $tandaBahaya),
            'penjelasan_singkat' => $this->generateSummary($penyakitDominan, $skorTertinggi, $factors, $tandaBahaya),
        ];
    }

    protected function trapmf(float $x, float $a, float $b, float $c, float $d): float
    {
        if ($x <= $a || $x >= $d) return 0.0;
        if ($x >= $b && $x <= $c) return 1.0;
        if ($x > $a && $x < $b) return ($x - $a) / ($b - $a);
        if ($x > $c && $x < $d) return ($d - $x) / ($d - $c);
        return 0.0;
    }

    protected function trimf(float $x, float $a, float $b, float $c): float
    {
        if ($x <= $a || $x >= $c) return 0.0;
        if ($x == $b) return 1.0;
        if ($x > $a && $x < $b) return ($x - $a) / ($b - $a);
        if ($x > $b && $x < $c) return ($c - $x) / ($c - $b);
        return 0.0;
    }

    protected function defuzzifyCentroid(float $muRendah, float $muWaspada, float $muTinggi): float
    {
        $numerator = 0.0;
        $denominator = 0.0;

        for ($z = 0; $z <= 100; $z += 1) {
            $muZ_rendah = min($muRendah, $this->trapmf($z, 0, 0, 25, 40));
            $muZ_waspada = min($muWaspada, $this->trimf($z, 35, 55, 72));
            $muZ_tinggi = min($muTinggi, $this->trapmf($z, 68, 85, 100, 100));

            $muZ = max($muZ_rendah, $muZ_waspada, $muZ_tinggi);

            $numerator += $z * $muZ;
            $denominator += $muZ;
        }

        if ($denominator == 0) {
            return 20.0;
        }

        return round($numerator / $denominator, 1);
    }

    protected function getDoctorGuidance(string $penyakit, float $score, bool $tandaBahaya): array
    {
        if ($tandaBahaya) {
            return [
                'urgensi' => 'SEGERA (Gawat Darurat / Hari Ini)',
                'tindakan' => 'Kunjungi Instalasi Gawat Darurat (IGD) rumah sakit terdekat sekarang juga.',
                'daftar_pemeriksaan' => [
                    'Evaluasi tanda-tanda vital darurat (Tekanan darah, nadi, saturasi)',
                    'Pemasangan kateter urin jika terjadi anuria / retensi urin total',
                    'USG gawat darurat / CT-Scan Abdomen darurat',
                    'Pemeriksaan darah lengkap cito, Ureum, Kreatinin, Elektrolit darah',
                ],
                'catatan_konsultasi' => 'Sampaikan ke dokter jaga bahwa Anda merasakan nyeri luar biasa atau tidak bisa buang air kecil sama sekali.',
            ];
        }

        $guidance = [
            'Ginjal Kronis' => [
                'pemeriksaan' => [
                    'Tes Darah Ureum & Kreatinin (menghitung Laju Filtrasi Glomerulus / eGFR)',
                    'Tes Urin Lengkap & Rasio Albumin-Kreatinin Urin (UACR) untuk melihat kebocoran protein',
                    'Pemeriksaan Tekanan Darah dan Gula Darah Puasa / HbA1c',
                    'USG Ginjal untuk melihat ukuran dan struktur anatomis ginjal',
                ],
                'spesialis' => 'Dokter Spesialis Penyakit Dalam (Sp.PD) atau Konsultan Ginjal Hipertensi (Sp.PD-KGH)',
            ],
            'Batu Ginjal' => [
                'pemeriksaan' => [
                    'USG Saluran Kemih / Ginjal (melihat posisi dan ukuran batu)',
                    'Foto Rontgen BNO-IVP atau CT Urografi Non-Kontras',
                    'Urinalisis Lengkap (mengecek kristaluria, pH urin, dan sel darah merah/eritrosit)',
                    'Kadar Asam Urat dan Kalsium darah/urin',
                ],
                'spesialis' => 'Dokter Spesialis Urologi (Sp.U) atau Spesialis Penyakit Dalam (Sp.PD)',
            ],
            'Infeksi Ginjal / Saluran Kemih' => [
                'pemeriksaan' => [
                    'Urinalisis Lengkap (mengecek leukosit esterase, nitrit, dan sedimen bakteri)',
                    'Kultur Urin & Uji Sensitivitas Antibiotik (mengetahui jenis bakteri & antibiotik yang tepat)',
                    'Darah Rutin Lengkap (mengecek tanda infeksi sistemik seperti leukositosis)',
                    'USG Ginjal bila dicurigai adanya abses ginjal atau sumbatan saluran kemih',
                ],
                'spesialis' => 'Dokter Umum di Puskesmas/Klinik, Spesialis Penyakit Dalam (Sp.PD), atau Spesialis Urologi (Sp.U)',
            ],
        ];

        $selected = $guidance[$penyakit] ?? $guidance['Ginjal Kronis'];
        $urgensi = $score >= 70 ? 'Tinggi (Jadwalkan kunjungan dokter dalam 1-3 hari ke depan)' : ($score >= 40 ? 'Sedang (Jadwalkan pemeriksaan dasar dalam 1-2 minggu ke depan)' : 'Rendah (Pemeriksaan berkala / Medical Check Up tahunan)');

        return [
            'urgensi' => $urgensi,
            'dokter_tujuan' => $selected['spesialis'],
            'daftar_pemeriksaan' => $selected['pemeriksaan'],
            'catatan_konsultasi' => "Diskusikan hasil skrining awal {$penyakit} dan mintalah rekomendasi tindak lanjut yang tepat.",
        ];
    }

    protected function generateSummary(string $penyakit, float $score, array $factors, bool $tandaBahaya): string
    {
        if ($tandaBahaya) {
            return "Perhatian! Ditemukan tanda bahaya klinis yang memerlukan penanganan darurat segera di IGD rumah sakit.";
        }

        $factorText = implode(', ', $factors);
        if ($score >= 70) {
            return "Berdasarkan perhitungan logika fuzzy Mamdani, risiko terindikasi tinggi pada {$penyakit} ({$score}%). Faktor pendorong utama yang paling signifikan adalah: {$factorText}. Disarankan segera berkonsultasi dengan dokter untuk pemeriksaan fisik langsung.";
        } elseif ($score >= 40) {
            return "Hasil perhitungan menunjukkan tingkat kewaspadaan sedang pada {$penyakit} ({$score}%). Faktor yang mempengaruhi antara lain: {$factorText}. Anda disarankan memperbaiki pola hidup sehat serta menjadwalkan pemeriksaan kesehatan dasar.";
        } else {
            return "Kondisi Anda berada dalam batas risiko rendah ({$score}%). Pertahankan gaya hidup sehat, minum air putih cukup, dan lakukan deteksi berkala.";
        }
    }
}
