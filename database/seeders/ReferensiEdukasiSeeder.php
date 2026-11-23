<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ReferensiEdukasi;

class ReferensiEdukasiSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            // --- GINJAL KRONIS (CKD) ---
            [
                'jenis_penyakit' => 'Ginjal Kronis',
                'tingkat_risiko' => 'semua',
                'kategori_topik' => 'Pencegahan & Pola Hidup',
                'judul' => 'Cegah Penyakit Ginjal Kronis dengan GERMAS dan Cerdik',
                'ringkasan' => 'Panduan resmi Kementerian Kesehatan RI mengenai langkah preventif menjaga fungsi ginjal melalui kontrol tekanan darah, kadar gula darah, pembatasan konsumsi garam harian maksimal 1 sendok teh (5 gram), dan aktivitas fisik teratur.',
                'nama_sumber' => 'Kemenkes RI (Ayo Sehat)',
                'link_asli' => 'https://ayosehat.kemkes.go.id/topik-penyakit/penyakit-tidak-menular/penyakit-ginjal-kronis',
            ],
            [
                'jenis_penyakit' => 'Ginjal Kronis',
                'tingkat_risiko' => 'waspada',
                'kategori_topik' => 'Pemeriksaan Klinis',
                'judul' => 'Konsensus Pemeriksaan Laju Filtrasi Glomerulus (eGFR) & Albuminuria',
                'ringkasan' => 'Rekomendasi PERNEFRI bagi individu dengan riwayat diabetes atau hipertensi untuk melakukan uji laboratorium eGFR (kreatinin serum) dan rasio albumin-kreatinin urin minimal 1 kali per tahun guna deteksi dini penurunan fungsi nefron.',
                'nama_sumber' => 'PERNEFRI (Perhimpunan Nefrologi Indonesia)',
                'link_asli' => 'https://pernefri.org/guidelines-penyakit-ginjal-kronik',
            ],
            [
                'jenis_penyakit' => 'Ginjal Kronis',
                'tingkat_risiko' => 'tinggi',
                'kategori_topik' => 'Manajemen Penyakit',
                'judul' => 'Chronic Kidney Disease: Symptoms, Stages and Clinical Management',
                'ringkasan' => 'Penjelasan komprehensif dari National Kidney Foundation mengenai 5 stadium penyakit ginjal kronik, bahaya penumpukan toksin uremik, serta pentingnya pendampingan nefrologis dalam memperlambat progresi gagal ginjal.',
                'nama_sumber' => 'National Kidney Foundation (NKF)',
                'link_asli' => 'https://www.kidney.org/atoz/content/about-chronic-kidney-disease',
            ],
            [
                'jenis_penyakit' => 'Ginjal Kronis',
                'tingkat_risiko' => 'semua',
                'kategori_topik' => 'Global Health',
                'judul' => 'WHO Fact Sheet: Hypertension, Diabetes and Kidney Complications',
                'ringkasan' => 'Data dan rekomendasi Organisasi Kesehatan Dunia (WHO) terkait sinergi penanganan faktor risiko kardiovaskular dan metabolik sebagai penyebab utama 75% kasus penyakit ginjal tahap akhir di seluruh dunia.',
                'nama_sumber' => 'WHO (World Health Organization)',
                'link_asli' => 'https://www.who.int/news-room/fact-sheets/detail/hypertension',
            ],

            // --- BATU GINJAL (NEPHROLITHIASIS) ---
            [
                'jenis_penyakit' => 'Batu Ginjal',
                'tingkat_risiko' => 'semua',
                'kategori_topik' => 'Pencegahan & Hidrasi',
                'judul' => 'Pentingnya Hidrasi Cairan 2–3 Liter/Hari untuk Mencegah Kristalisasi Urin',
                'ringkasan' => 'Kemenkes mengedukasi masyarakat mengenai asupan cairan minimal 2 liter per hari untuk menjaga warna urin tetap kuning jernih, serta menghindari konsumsi asam urat dan oksalat tinggi secara berlebih.',
                'nama_sumber' => 'Kemenkes RI (Ayo Sehat)',
                'link_asli' => 'https://ayosehat.kemkes.go.id/batu-saluran-kemih-kenali-dan-cegah',
            ],
            [
                'jenis_penyakit' => 'Batu Ginjal',
                'tingkat_risiko' => 'waspada',
                'kategori_topik' => 'Panduan Diagnosis Urologi',
                'judul' => 'Panduan Penatalaksanaan Klinis Batu Saluran Kemih',
                'ringkasan' => 'Pedoman resmi Ikatan Ahli Urologi Indonesia (IAUI) mengenai indikasi pemeriksaan USG traktus urinarius, foto BNO polos abdomen, serta pembedaan nyeri kolik ginjal akibat sumbatan ureter.',
                'nama_sumber' => 'IAUI (Ikatan Ahli Urologi Indonesia)',
                'link_asli' => 'https://iaui.or.id/guideline-batu-saluran-kemih',
            ],
            [
                'jenis_penyakit' => 'Batu Ginjal',
                'tingkat_risiko' => 'tinggi',
                'kategori_topik' => 'Penanganan Medis Lanjutan',
                'judul' => 'Kidney Stones: Types, Medical Dissolution, and Minimally Invasive Options',
                'ringkasan' => 'Tinjauan National Kidney Foundation tentang batu kalsium oksalat, asam urat, struvit, serta teknologi modern ESWL, URS, dan PCNL untuk ekstraksi batu tanpa operasi bedah terbuka besar.',
                'nama_sumber' => 'National Kidney Foundation (NKF)',
                'link_asli' => 'https://www.kidney.org/atoz/content/kidneystones',
            ],

            // --- INFEKSI GINJAL / SALURAN KEMIH (ISK / PYELONEPHRITIS) ---
            [
                'jenis_penyakit' => 'Infeksi Ginjal / Saluran Kemih',
                'tingkat_risiko' => 'semua',
                'kategori_topik' => 'Edukasi Higienitas',
                'judul' => 'Waspadai Anyang-Anyangan: Tanda Awal Infeksi Saluran Kemih',
                'ringkasan' => 'Informasi Kemenkes RI mengenai perilaku higienitas buang air kecil, tidak menahan kencing, membasuh dari depan ke belakang, dan pentingnya mencukupi kebutuhan cairan tubuh harian.',
                'nama_sumber' => 'Kemenkes RI (Ayo Sehat)',
                'link_asli' => 'https://ayosehat.kemkes.go.id/infeksi-saluran-kemih-gejala-dan-pengobatannya',
            ],
            [
                'jenis_penyakit' => 'Infeksi Ginjal / Saluran Kemih',
                'tingkat_risiko' => 'waspada',
                'kategori_topik' => 'Protokol Klinis ISK',
                'judul' => 'Konsensus Infeksi Saluran Kemih dan Pielonefritis di Indonesia',
                'ringkasan' => 'Pedoman IAUI dalam mendiagnosis ISK bagian bawah (sistitis) vs ISK atas (pielonefritis), tata cara urinalisis leukosit esterase/nitrit, dan kultur resistensi bakteri patogen uropatogenik.',
                'nama_sumber' => 'IAUI (Ikatan Ahli Urologi Indonesia)',
                'link_asli' => 'https://iaui.or.id/guideline-infeksi-saluran-kemih',
            ],
            [
                'jenis_penyakit' => 'Infeksi Ginjal / Saluran Kemih',
                'tingkat_risiko' => 'tinggi',
                'kategori_topik' => 'Penanganan Komplikasi',
                'judul' => 'Pyelonephritis (Kidney Infection): Warning Signs & Timely Antibiotic Treatment',
                'ringkasan' => 'Peringatan National Kidney Foundation mengenai risiko urosepsis dan kerusakan nefron permanen jika demam tinggi disertai nyeri pinggang dan mual muntah tidak segera diobati dengan regimen antibiotik yang tepat.',
                'nama_sumber' => 'National Kidney Foundation (NKF)',
                'link_asli' => 'https://www.kidney.org/atoz/content/kidney-infection-pyelonephritis',
            ],

            // --- KONDISI DARURAT / UMUM ---
            [
                'jenis_penyakit' => 'Umum',
                'tingkat_risiko' => 'darurat',
                'kategori_topik' => 'Kedaruratan Medis (Red Flag)',
                'judul' => 'Mengenali Tanda Bahaya Anuria dan Kolik Ginjal Akut di IGD',
                'ringkasan' => 'Panduan kedaruratan PERNEFRI dan IAUI: ketidakmampuan mengeluarkan urin (anuria <100ml/24 jam), nyeri tak tertahankan menjalar ke selangkangan, atau penurunan kesadaran membutuhkan penanganan gawat darurat segera.',
                'nama_sumber' => 'PERNEFRI (Perhimpunan Nefrologi Indonesia)',
                'link_asli' => 'https://pernefri.org/kegawatdaruratan-nefrologi',
            ],
            [
                'jenis_penyakit' => 'Umum',
                'tingkat_risiko' => 'rendah',
                'kategori_topik' => 'Panduan Kesehatan Holistik',
                'judul' => '8 Golden Rules for Kidney Health',
                'ringkasan' => 'Rekomendasi 8 aturan emas World Kidney Day / WHO: tetap aktif & bugar, kontrol gula darah, pantau tekanan darah, makan sehat & jaga berat badan, minum cukup air, jangan merokok, jangan konsumsi obat anti-nyeri bebas tanpa resep.',
                'nama_sumber' => 'WHO (World Health Organization)',
                'link_asli' => 'https://www.worldkidneyday.org/facts/take-care-of-your-kidneys/8-golden-rules/',
            ],
        ];

        foreach ($articles as $art) {
            ReferensiEdukasi::updateOrCreate(
                ['judul' => $art['judul']],
                $art
            );
        }
    }
}
