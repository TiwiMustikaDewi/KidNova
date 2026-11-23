# KidnNova — Sistem Pakar Deteksi Dini & Edukasi Risiko Penyakit Ginjal (Fuzzy Logic Mamdani)

> **Tugas UAS – Proyek Sistem Pakar (Sispak)**  
> Implementasi Kecerdasan Buatan berbasis **Fuzzy Logic (Metode Mamdani)** untuk skrining awal risiko 3 gangguan ginjal + deteksi tanda bahaya darurat medis.
> **Platform Name: KidnNova** • **Typography: Poppins** • **Bespoke Health-Tech Design**

---

## 1. Gambaran Umum & Arsitektur Sistem

Proyek ini dibangun menggunakan arsitektur microservice 3 komponen:
1. **Frontend (`frontend/`)**: React.js (Vite) berjalan di **Port 5173**  
   - Desain medis ramah pengguna (Multi-step Wizard 3 Langkah).
   - Menampilkan 4 kotak informasi hasil (Status Utama, Grafik 3 Risiko, Panduan Dokter, Kartu Edukasi Resmi).
   - Fitur Cetak / Unduh Ringkasan Medis (PDF) lengkap dengan disclaimer.
   - Papan 15 Kasus Uji terintegrasi.
2. **Backend Web & Database (`backend-laravel/`)**: Laravel (PHP 8.3) berjalan di **Port 8000**  
   - Mengelola endpoint REST API (`/api/skrining`, `/api/riwayat`, `/api/edukasi`, `/api/auth`).
   - Menyimpan 3 tabel database SQLite: `users`, `riwayat_skrining`, dan `referensi_edukasi`.
   - Mengambil artikel kesehatan resmi yang cocok secara otomatis.
   - Bertindak sebagai penghubung dan fallback engine ke service Python.
3. **Fuzzy Service (`fuzzy-service/`)**: Python (FastAPI + scikit-fuzzy) berjalan di **Port 8001**  
   - Menghitung fungsi keanggotaan trapesium dan segitiga.
   - Melakukan penalaran aturan implikasi Min-Max Mamdani.
   - Melakukan defuzzifikasi Centroid (Center of Gravity) untuk menghasilkan skor risiko persentase (0–100%).

---

## 2. Parameter Input & Output Fuzzy Logic

### 7 Variabel Input
1. **Usia** (15 – 90 tahun): Muda, Dewasa, Lansia
2. **Riwayat Kesehatan** (Skala 0 – 10): Hipertensi, Diabetes, Obat nyeri rutin NSAID (Rendah, Sedang, Tinggi)
3. **Gejala Fisik & Urin** (Skala 0 – 10): Bengkak kaki/wajah, Urin berbusa, Cepat lelah (Ringan, Sedang, Berat)
4. **Nyeri Pinggang & Warna Urin** (Skala 0 – 10): Nyeri kolik tajam, Urin keruh/merah (Ringan, Sedang, Berat)
5. **Gejala Infeksi** (Skala 0 – 10): Demam/menggigil, Perih BAK, Anyang-anyangan (Ringan, Sedang, Berat)
6. **Kebiasaan Minum & Pola Hidup** (Skala 0 – 10): Jarang minum air putih, Konsumsi garam/manis (Baik, Cukup, Buruk)
7. **Tanda Bahaya (Darurat)**: Tidak bisa kencing sama sekali, Nyeri luar biasa, Demam tinggi + muntah (Ya / Tidak -> Rujukan Langsung ke IGD)

### 3 Output Penyakit yang Dicek
1. **Persentase Risiko Penyakit Ginjal Kronis (CKD)** (0–100%)
2. **Persentase Risiko Batu Ginjal (Nephrolithiasis)** (0–100%)
3. **Persentase Risiko Infeksi Ginjal / Saluran Kemih (ISK)** (0–100%)

### Kategori Status & Warna
- **0 – 39% (Risiko Rendah / Hijau)**: Kondisi aman, edukasi pola hidup pencegahan ginjal.
- **40 – 69% (Perlu Waspada / Kuning)**: Gejala awal/faktor risiko sedang, jadwalkan cek dasar puskesmas/klinik.
- **70 – 100% (Risiko Tinggi / Merah)**: Risiko cukup kuat, segera periksakan diri ke dokter spesialis (Sp.PD / Sp.U).
- **Tanda Bahaya = True (Darurat / Merah Gelap)**: Segera kunjungi IGD Rumah Sakit terdekat!

---

## 3. Sumber Edukasi Kesehatan Resmi (100%)

Seluruh rekomendasi artikel pada aplikasi terhubung ke lembaga kesehatan resmi terpercaya:
- **Kemenkes RI / Ayo Sehat**: Pencegahan Ginjal Kronis GERMAS, Edukasi Batu Saluran Kemih, Bahaya Anyang-anyangan.
- **PERNEFRI (Perhimpunan Nefrologi Indonesia)**: Panduan Laju Filtrasi Glomerulus (eGFR), Kedaruratan Nefrologi.
- **IAUI (Ikatan Ahli Urologi Indonesia)**: Panduan Penatalaksanaan Klinis Batu Saluran Kemih & Konsensus ISK.
- **WHO (World Health Organization)**: Hipertensi & Komplikasi Ginjal, 8 Golden Rules for Kidney Health.
- **National Kidney Foundation (NKF)**: Chronic Kidney Disease, Kidney Stones Minimally Invasive, Pyelonephritis.

---

## 4. Cara Menjalankan Program

### Cara 1: Sekali Klik (Rekomendasi untuk Dosen / Penguji)
Cukup jalankan file batch atau script powershell di root direktori:
```cmd
start_all.bat
```
atau via PowerShell:
```powershell
.\start_all.ps1
```
Script akan otomatis membuka 3 jendela terminal terpisah untuk menjalankan Python (8001), Laravel (8000), dan React (5173).

---

### Cara 2: Manual per Layanan

#### Layanan 1: Microservice Python (Port 8001)
```bash
cd fuzzy-service
python main.py
```
*(Swagger UI Dokumentasi API dapat dibuka di: `http://localhost:8001/docs`)*

#### Layanan 2: Backend Laravel (Port 8000)
```bash
php artisan serve --port=8000
```
*(Backend API & database SQLite siap di: `http://localhost:8000/api`)*

#### Layanan 3: Frontend React Vite (Port 5173)
```bash
cd frontend
npm run dev
```
*(Buka browser di: `http://localhost:5173`)*

---

## 5. Pengujian 15 Kasus Uji (Target 100% Lulus)

Sesuai ketentuan target proyek, telah diuji 15 skenario klinis berbeda:
- **Kasus 1 - 4**: Kondisi Aman / Risiko Rendah (Semua teruji: < 40% - PASSED)
- **Kasus 5 - 10**: Kondisi Perlu Waspada (Semua teruji: 40% - 69% - PASSED)
- **Kasus 11 - 14**: Kondisi Risiko Tinggi (Semua teruji: >= 70% - PASSED)
- **Kasus 15**: Kondisi Darurat Medis / Tanda Bahaya Anuria (Semua teruji: Rujukan IGD - PASSED)

Untuk menjalankan script otomatis pengujian 15 kasus:
```bash
python fuzzy-service/test_fuzzy.py
```
Hasil: **15 / 15 Kasus Uji Lulus 100%**.

---

## 6. Pengujian Backend Laravel Feature Test
```bash
php artisan test --filter=SkriningApiTest
```
Hasil: **5 / 5 Tests PASSED (28 assertions)**.

---

## 7. Peringatan Medis (Disclaimer)
Web ini dibuat untuk tujuan edukasi dan skrining awal kecerdasan buatan berbasis logika fuzzy, dan **bukan merupakan alat diagnosis atau pengganti konsultasi dokter**. Peringatan ini dicantumkan secara wajib pada:
1. Halaman Awal (dengan kotak persetujuan sebelum skrining)
2. Halaman Hasil Skrining
3. Lembar Cetak / Unduh Dokumen Ringkasan PDF
