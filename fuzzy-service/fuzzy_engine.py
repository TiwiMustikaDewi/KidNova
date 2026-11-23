import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
from typing import Dict, Any, List

class KidneyFuzzyEngine:
    """
    Sistem Inferensi Fuzzy Mamdani untuk Deteksi Dini Risiko Gangguan Ginjal:
    1. Penyakit Ginjal Kronis (PGK / CKD)
    2. Batu Ginjal (Nephrolithiasis)
    3. Infeksi Ginjal / Saluran Kemih (ISK / Pyelonephritis)
    Dilengkapi deteksi Kondisi Darurat (Tanda Bahaya -> Rujukan IGD)
    """

    def __init__(self):
        self._init_fuzzy_systems()

    def _init_fuzzy_systems(self):
        # ==============================================================
        # 1. DEFINISI VARIABEL INPUT (Antecedents)
        # ==============================================================
        # Usia: 15 - 90 tahun
        self.usia = ctrl.Antecedent(np.arange(15, 91, 1), 'usia')
        self.usia['muda'] = fuzz.trapmf(self.usia.universe, [15, 15, 25, 38])
        self.usia['dewasa'] = fuzz.trimf(self.usia.universe, [32, 48, 62])
        self.usia['lansia'] = fuzz.trapmf(self.usia.universe, [55, 68, 90, 90])

        # Riwayat Kesehatan (Hipertensi, Diabetes, Obat Nyeri Rutin): 0 - 10
        self.riwayat = ctrl.Antecedent(np.arange(0, 10.1, 0.1), 'riwayat')
        self.riwayat['rendah'] = fuzz.trapmf(self.riwayat.universe, [0, 0, 2.0, 4.0])
        self.riwayat['sedang'] = fuzz.trimf(self.riwayat.universe, [3.0, 5.0, 7.0])
        self.riwayat['tinggi'] = fuzz.trapmf(self.riwayat.universe, [6.0, 8.0, 10.0, 10.0])

        # Gejala Fisik & Urin (Bengkak kaki/wajah, urin berbusa, cepat lelah): 0 - 10
        self.gejala_fisik = ctrl.Antecedent(np.arange(0, 10.1, 0.1), 'gejala_fisik')
        self.gejala_fisik['ringan'] = fuzz.trapmf(self.gejala_fisik.universe, [0, 0, 2.0, 4.0])
        self.gejala_fisik['sedang'] = fuzz.trimf(self.gejala_fisik.universe, [3.0, 5.0, 7.0])
        self.gejala_fisik['berat'] = fuzz.trapmf(self.gejala_fisik.universe, [6.0, 8.0, 10.0, 10.0])

        # Nyeri Pinggang & Warna Urin (Nyeri kolik tajam, urin kemerahan/keruh): 0 - 10
        self.nyeri_pinggang = ctrl.Antecedent(np.arange(0, 10.1, 0.1), 'nyeri_pinggang')
        self.nyeri_pinggang['ringan'] = fuzz.trapmf(self.nyeri_pinggang.universe, [0, 0, 2.0, 4.0])
        self.nyeri_pinggang['sedang'] = fuzz.trimf(self.nyeri_pinggang.universe, [3.0, 5.0, 7.0])
        self.nyeri_pinggang['berat'] = fuzz.trapmf(self.nyeri_pinggang.universe, [6.0, 8.0, 10.0, 10.0])

        # Gejala Infeksi (Demam/menggigil, anyang-anyangan, panas saat BAK): 0 - 10
        self.gejala_infeksi = ctrl.Antecedent(np.arange(0, 10.1, 0.1), 'gejala_infeksi')
        self.gejala_infeksi['ringan'] = fuzz.trapmf(self.gejala_infeksi.universe, [0, 0, 2.0, 4.0])
        self.gejala_infeksi['sedang'] = fuzz.trimf(self.gejala_infeksi.universe, [3.0, 5.0, 7.0])
        self.gejala_infeksi['berat'] = fuzz.trapmf(self.gejala_infeksi.universe, [6.0, 8.0, 10.0, 10.0])

        # Kebiasaan Minum & Pola Hidup (0 = Sangat Sehat/Banyak Minum, 10 = Sangat Buruk/Jarang Minum): 0 - 10
        self.pola_hidup = ctrl.Antecedent(np.arange(0, 10.1, 0.1), 'pola_hidup')
        self.pola_hidup['baik'] = fuzz.trapmf(self.pola_hidup.universe, [0, 0, 2.0, 4.0])
        self.pola_hidup['cukup'] = fuzz.trimf(self.pola_hidup.universe, [3.0, 5.0, 7.0])
        self.pola_hidup['buruk'] = fuzz.trapmf(self.pola_hidup.universe, [6.0, 8.0, 10.0, 10.0])

        # ==============================================================
        # 2. DEFINISI VARIABEL OUTPUT (Consequents) 0 - 100%
        # ==============================================================
        self.risiko_kronis = ctrl.Consequent(np.arange(0, 100.1, 0.5), 'risiko_kronis')
        self.risiko_kronis['rendah'] = fuzz.trapmf(self.risiko_kronis.universe, [0, 0, 25, 40])
        self.risiko_kronis['waspada'] = fuzz.trimf(self.risiko_kronis.universe, [35, 55, 72])
        self.risiko_kronis['tinggi'] = fuzz.trapmf(self.risiko_kronis.universe, [68, 85, 100, 100])

        self.risiko_batu = ctrl.Consequent(np.arange(0, 100.1, 0.5), 'risiko_batu')
        self.risiko_batu['rendah'] = fuzz.trapmf(self.risiko_batu.universe, [0, 0, 25, 40])
        self.risiko_batu['waspada'] = fuzz.trimf(self.risiko_batu.universe, [35, 55, 72])
        self.risiko_batu['tinggi'] = fuzz.trapmf(self.risiko_batu.universe, [68, 85, 100, 100])

        self.risiko_infeksi = ctrl.Consequent(np.arange(0, 100.1, 0.5), 'risiko_infeksi')
        self.risiko_infeksi['rendah'] = fuzz.trapmf(self.risiko_infeksi.universe, [0, 0, 25, 40])
        self.risiko_infeksi['waspada'] = fuzz.trimf(self.risiko_infeksi.universe, [35, 55, 72])
        self.risiko_infeksi['tinggi'] = fuzz.trapmf(self.risiko_infeksi.universe, [68, 85, 100, 100])

        # ==============================================================
        # 3. BASIS ATURAN (FUZZY RULES) MAMDANI
        # ==============================================================
        # A. Aturan Ginjal Kronis (CKD)
        # Utama: Riwayat Kesehatan + Gejala Fisik & Urin, diperberat Usia & Pola Hidup
        rules_kronis = [
            ctrl.Rule(self.riwayat['tinggi'] & self.gejala_fisik['berat'], self.risiko_kronis['tinggi']),
            ctrl.Rule(self.gejala_fisik['berat'] & (self.usia['lansia'] | self.pola_hidup['buruk']), self.risiko_kronis['tinggi']),
            ctrl.Rule(self.riwayat['tinggi'] & self.pola_hidup['buruk'], self.risiko_kronis['tinggi']),
            ctrl.Rule(self.riwayat['sedang'] & (self.usia['dewasa'] | self.usia['lansia']), self.risiko_kronis['waspada']),
            ctrl.Rule(self.riwayat['sedang'] & self.gejala_fisik['sedang'], self.risiko_kronis['waspada']),
            ctrl.Rule(self.riwayat['sedang'] & self.pola_hidup['cukup'], self.risiko_kronis['waspada']),
            ctrl.Rule(self.gejala_fisik['sedang'] & (self.usia['dewasa'] | self.usia['lansia']), self.risiko_kronis['waspada']),
            ctrl.Rule(self.riwayat['tinggi'] & self.gejala_fisik['ringan'], self.risiko_kronis['waspada']),
            ctrl.Rule(self.riwayat['rendah'] & self.gejala_fisik['sedang'], self.risiko_kronis['waspada']),
            ctrl.Rule(self.pola_hidup['buruk'] & self.usia['lansia'], self.risiko_kronis['waspada']),
            ctrl.Rule(self.riwayat['rendah'] & self.gejala_fisik['ringan'] & self.pola_hidup['baik'], self.risiko_kronis['rendah']),
            ctrl.Rule(self.riwayat['rendah'] & self.gejala_fisik['ringan'] & self.usia['muda'], self.risiko_kronis['rendah']),
            ctrl.Rule(self.riwayat['rendah'] & self.gejala_fisik['ringan'], self.risiko_kronis['rendah']),
        ]

        # B. Aturan Batu Ginjal (Nephrolithiasis)
        # Utama: Nyeri Pinggang & Warna Urin + Pola Hidup (Kurang Minum / Garam Tinggi)
        rules_batu = [
            ctrl.Rule(self.nyeri_pinggang['berat'] & self.pola_hidup['buruk'], self.risiko_batu['tinggi']),
            ctrl.Rule(self.nyeri_pinggang['berat'], self.risiko_batu['tinggi']),
            ctrl.Rule(self.nyeri_pinggang['sedang'] & self.pola_hidup['buruk'], self.risiko_batu['tinggi']),
            ctrl.Rule(self.nyeri_pinggang['sedang'] & self.pola_hidup['cukup'], self.risiko_batu['waspada']),
            ctrl.Rule(self.nyeri_pinggang['sedang'] & self.pola_hidup['baik'], self.risiko_batu['waspada']),
            ctrl.Rule(self.nyeri_pinggang['ringan'] & self.pola_hidup['buruk'], self.risiko_batu['waspada']),
            ctrl.Rule(self.nyeri_pinggang['ringan'] & self.pola_hidup['cukup'], self.risiko_batu['rendah']),
            ctrl.Rule(self.nyeri_pinggang['ringan'] & self.pola_hidup['baik'], self.risiko_batu['rendah']),
        ]

        # C. Aturan Infeksi Ginjal / ISK (Pyelonephritis)
        # Utama: Gejala Infeksi (Demam, Sakit BAK) didukung Gejala Fisik & Nyeri Pinggang
        rules_infeksi = [
            ctrl.Rule(self.gejala_infeksi['berat'] & (self.nyeri_pinggang['berat'] | self.gejala_fisik['berat']), self.risiko_infeksi['tinggi']),
            ctrl.Rule(self.gejala_infeksi['berat'], self.risiko_infeksi['tinggi']),
            ctrl.Rule(self.gejala_infeksi['sedang'] & self.nyeri_pinggang['sedang'], self.risiko_infeksi['waspada']),
            ctrl.Rule(self.gejala_infeksi['sedang'], self.risiko_infeksi['waspada']),
            ctrl.Rule(self.gejala_infeksi['ringan'] & self.nyeri_pinggang['sedang'], self.risiko_infeksi['waspada']),
            ctrl.Rule(self.gejala_infeksi['ringan'] & self.gejala_infeksi['ringan'], self.risiko_infeksi['rendah']),
            ctrl.Rule(self.gejala_infeksi['ringan'], self.risiko_infeksi['rendah']),
        ]

        self.sim_kronis = ctrl.ControlSystemSimulation(ctrl.ControlSystem(rules_kronis))
        self.sim_batu = ctrl.ControlSystemSimulation(ctrl.ControlSystem(rules_batu))
        self.sim_infeksi = ctrl.ControlSystemSimulation(ctrl.ControlSystem(rules_infeksi))

    def evaluate(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        """
        Menghitung risiko untuk ketiga penyakit ginjal berdasarkan input pengguna
        """
        usia = float(inputs.get('usia', 30))
        riwayat = float(inputs.get('riwayat_kesehatan', 0))
        gejala_fisik = float(inputs.get('gejala_fisik_urin', 0))
        nyeri_pinggang = float(inputs.get('nyeri_pinggang_urin', 0))
        gejala_infeksi = float(inputs.get('gejala_infeksi', 0))
        pola_hidup = float(inputs.get('kebiasaan_hidup', 0))
        tanda_bahaya = bool(inputs.get('tanda_bahaya', False))

        # Clamp nilai sesuai batas domain
        usia_c = max(15.0, min(90.0, usia))
        riwayat_c = max(0.0, min(10.0, riwayat))
        gejala_fisik_c = max(0.0, min(10.0, gejala_fisik))
        nyeri_pinggang_c = max(0.0, min(10.0, nyeri_pinggang))
        gejala_infeksi_c = max(0.0, min(10.0, gejala_infeksi))
        pola_hidup_c = max(0.0, min(10.0, pola_hidup))

        # 1. Hitung Risiko Ginjal Kronis
        try:
            self.sim_kronis.input['usia'] = usia_c
            self.sim_kronis.input['riwayat'] = riwayat_c
            self.sim_kronis.input['gejala_fisik'] = gejala_fisik_c
            self.sim_kronis.input['pola_hidup'] = pola_hidup_c
            self.sim_kronis.compute()
            score_kronis = round(float(self.sim_kronis.output['risiko_kronis']), 1)
        except Exception:
            score_kronis = self._fallback_score(
                weights=[(riwayat_c, 0.4), (gejala_fisik_c, 0.4), (pola_hidup_c, 0.1), ((usia_c - 15) / 7.5, 0.1)]
            )

        # 2. Hitung Risiko Batu Ginjal
        try:
            self.sim_batu.input['nyeri_pinggang'] = nyeri_pinggang_c
            self.sim_batu.input['pola_hidup'] = pola_hidup_c
            self.sim_batu.compute()
            score_batu = round(float(self.sim_batu.output['risiko_batu']), 1)
        except Exception:
            score_batu = self._fallback_score(
                weights=[(nyeri_pinggang_c, 0.7), (pola_hidup_c, 0.3)]
            )

        # 3. Hitung Risiko Infeksi Ginjal / ISK
        try:
            self.sim_infeksi.input['gejala_infeksi'] = gejala_infeksi_c
            self.sim_infeksi.input['nyeri_pinggang'] = nyeri_pinggang_c
            self.sim_infeksi.compute()
            score_infeksi = round(float(self.sim_infeksi.output['risiko_infeksi']), 1)
        except Exception:
            score_infeksi = self._fallback_score(
                weights=[(gejala_infeksi_c, 0.7), (nyeri_pinggang_c, 0.3)]
            )

        # Analisis Penyakit Tertinggi & Status Utama
        scores = {
            'Ginjal Kronis': score_kronis,
            'Batu Ginjal': score_batu,
            'Infeksi Ginjal / Saluran Kemih': score_infeksi
        }

        penyakit_tertinggi = max(scores, key=scores.get)
        skor_tertinggi = scores[penyakit_tertinggi]

        # Klasifikasi Status (0-39 Rendah/Hijau, 40-69 Waspada/Kuning, 70-100 Tinggi/Merah)
        if tanda_bahaya:
            status_level = 'darurat'
            status_label = 'Kondisi Darurat (Segera ke IGD)'
            status_color = 'red'
        elif skor_tertinggi >= 70:
            status_level = 'tinggi'
            status_label = 'Risiko Tinggi'
            status_color = 'red'
        elif skor_tertinggi >= 40:
            status_level = 'waspada'
            status_label = 'Perlu Waspada'
            status_color = 'yellow'
        else:
            status_level = 'rendah'
            status_label = 'Risiko Rendah'
            status_color = 'green'

        # Tentukan Faktor Utama Penyebab Skor Naik
        factors = self._determine_primary_factors({
            'Usia Lanjut': (usia_c - 40) / 5.0 if usia_c > 40 else 0,
            'Riwayat Hipertensi/Diabetes/Obat Nyeri': riwayat_c,
            'Gejala Fisik Bengkak & Urin Berbusa': gejala_fisik_c,
            'Nyeri Pinggang Kolik Tajam & Urin Merah': nyeri_pinggang_c,
            'Gejala Demam & Nyeri Saat Buang Air Kecil': gejala_infeksi_c,
            'Pola Hidup Kurang Minum & Konsumsi Asin/Manis': pola_hidup_c
        })

        # Panduan Pemeriksaan ke Dokter
        panduan_dokter = self._get_doctor_guidance(penyakit_tertinggi, skor_tertinggi, tanda_bahaya)

        return {
            'skor': {
                'ginjal_kronis': score_kronis,
                'batu_ginjal': score_batu,
                'infeksi_ginjal': score_infeksi
            },
            'penyakit_dominan': penyakit_tertinggi,
            'skor_tertinggi': skor_tertinggi,
            'status_level': status_level,
            'status_label': status_label,
            'status_color': status_color,
            'tanda_bahaya': tanda_bahaya,
            'faktor_penyebab_utama': factors,
            'panduan_dokter': panduan_dokter,
            'penjelasan_singkat': self._generate_summary(penyakit_tertinggi, skor_tertinggi, factors, tanda_bahaya)
        }

    def _fallback_score(self, weights: List[tuple]) -> float:
        total_w = sum(w for _, w in weights)
        val = sum(v * w for v, w in weights) / total_w
        # Skala 0-10 dikonversi ke 0-100%
        return round(float(np.clip(val * 10.0, 5.0, 95.0)), 1)

    def _determine_primary_factors(self, factor_scores: Dict[str, float]) -> List[str]:
        # Ambil 2 faktor tertinggi yang skornya > 3.0
        sorted_factors = sorted(factor_scores.items(), key=lambda x: x[1], reverse=True)
        significant = [name for name, score in sorted_factors if score >= 3.5]
        if not significant:
            return ["Pola hidup dan kondisi umum saat ini relatif terkontrol dengan baik."]
        return significant[:2]

    def _get_doctor_guidance(self, penyakit: str, score: float, tanda_bahaya: bool) -> Dict[str, Any]:
        if tanda_bahaya:
            return {
                'urgensi': 'SEGERA (Gawat Darurat / Hari Ini)',
                'tindakan': 'Kunjungi Instalasi Gawat Darurat (IGD) rumah sakit terdekat sekarang juga.',
                'daftar_pemeriksaan': [
                    'Evaluasi tanda-tanda vital darurat (Tekanan darah, nadi, saturasi)',
                    'Pemasangan kateter urin jika terjadi anuria / retensi urin total',
                    'USG gawat darurat / CT-Scan Abdomen darurat',
                    'Pemeriksaan darah lengkap cito, Ureum, Kreatinin, Elektrolit darah'
                ],
                'catatan_konsultasi': 'Sampaikan ke dokter jaga bahwa Anda merasakan nyeri luar biasa atau tidak bisa buang air kecil sama sekali.'
            }

        guidance = {
            'Ginjal Kronis': {
                'pemeriksaan': [
                    'Tes Darah Ureum & Kreatinin (menghitung Laju Filtrasi Glomerulus / eGFR)',
                    'Tes Urin Lengkap & Rasio Albumin-Kreatinin Urin (UACR) untuk melihat kebocoran protein',
                    'Pemeriksaan Tekanan Darah dan Gula Darah Puasa / HbA1c',
                    'USG Ginjal untuk melihat ukuran dan struktur anatomis ginjal'
                ],
                'spesialis': 'Dokter Spesialis Penyakit Dalam (Sp.PD) atau Konsultan Ginjal Hipertensi (Sp.PD-KGH)'
            },
            'Batu Ginjal': {
                'pemeriksaan': [
                    'USG Saluran Kemih / Ginjal (melihat posisi dan ukuran batu)',
                    'Foto Rontgen BNO-IVP atau CT Urografi Non-Kontras',
                    'Urinalisis Lengkap (mengecek kristaluria, pH urin, dan sel darah merah/eritrosit)',
                    'Kadar Asam Urat dan Kalsium darah/urin'
                ],
                'spesialis': 'Dokter Spesialis Urologi (Sp.U) atau Spesialis Penyakit Dalam (Sp.PD)'
            },
            'Infeksi Ginjal / Saluran Kemih': {
                'pemeriksaan': [
                    'Urinalisis Lengkap (mengecek leukosit esterase, nitrit, dan sedimen bakteri)',
                    'Kultur Urin & Uji Sensitivitas Antibiotik (mengetahui jenis bakteri & antibiotik yang tepat)',
                    'Darah Rutin Lengkap (mengecek tanda infeksi sistemik seperti leukositosis)',
                    'USG Ginjal bila dicurigai adanya abses ginjal atau sumbatan saluran kemih'
                ],
                'spesialis': 'Dokter Umum di Puskesmas/Klinik, Spesialis Penyakit Dalam (Sp.PD), atau Spesialis Urologi (Sp.U)'
            }
        }

        selected = guidance.get(penyakit, guidance['Ginjal Kronis'])

        if score >= 70:
            urgensi = 'Tinggi (Jadwalkan kunjungan dokter dalam 1-3 hari ke depan)'
        elif score >= 40:
            urgensi = 'Sedang (Jadwalkan pemeriksaan dasar dalam 1-2 minggu ke depan)'
        else:
            urgensi = 'Rendah (Pemeriksaan berkala / Medical Check Up tahunan)'

        return {
            'urgensi': urgensi,
            'dokter_tujuan': selected['spesialis'],
            'daftar_pemeriksaan': selected['pemeriksaan'],
            'catatan_konsultasi': f'Diskusikan hasil skrining awal {penyakit} dan mintalah rekomendasi tindak lanjut yang tepat.'
        }

    def _generate_summary(self, penyakit: str, score: float, factors: List[str], tanda_bahaya: bool) -> str:
        if tanda_bahaya:
            return "Perhatian! Ditemukan tanda bahaya klinis yang memerlukan penanganan darurat segera di IGD rumah sakit."
        
        factor_text = ", ".join(factors)
        if score >= 70:
            return f"Berdasarkan perhitungan logika fuzzy Mamdani, risiko terindikasi tinggi pada {penyakit} ({score}%). Faktor pendorong utama yang paling signifikan adalah: {factor_text}. Disarankan segera berkonsultasi dengan dokter untuk pemeriksaan fisik langsung."
        elif score >= 40:
            return f"Hasil perhitungan menunjukkan tingkat kewaspadaan sedang pada {penyakit} ({score}%). Faktor yang mempengaruhi antara lain: {factor_text}. Anda disarankan memperbaiki pola hidup sehat serta menjadwalkan pemeriksaan kesehatan dasar."
        else:
            return f"Kondisi Anda berada dalam batas risiko rendah ({score}%). Pertahankan gaya hidup sehat, minum air putih cukup, dan lakukan deteksi berkala."
