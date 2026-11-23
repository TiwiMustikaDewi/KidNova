import json
from fuzzy_engine import KidneyFuzzyEngine

def run_tests():
    engine = KidneyFuzzyEngine()

    test_cases = [
        # --- KATEGORI 1: AMAN / RISIKO RENDAH (Kasus 1 - 4) ---
        {
            "id": 1,
            "nama": "Kasus 1: Mahasiswa Muda Sangat Sehat",
            "kategori_target": "rendah",
            "input": {
                "usia": 21,
                "riwayat_kesehatan": 0,
                "gejala_fisik_urin": 0,
                "nyeri_pinggang_urin": 0,
                "gejala_infeksi": 0,
                "kebiasaan_hidup": 1,
                "tanda_bahaya": False
            }
        },
        {
            "id": 2,
            "nama": "Kasus 2: Dewasa Muda Sedikit Kurang Minum",
            "kategori_target": "rendah",
            "input": {
                "usia": 28,
                "riwayat_kesehatan": 1,
                "gejala_fisik_urin": 1,
                "nyeri_pinggang_urin": 1,
                "gejala_infeksi": 1,
                "kebiasaan_hidup": 3,
                "tanda_bahaya": False
            }
        },
        {
            "id": 3,
            "nama": "Kasus 3: Lansia Aktif Pola Hidup Baik",
            "kategori_target": "rendah",
            "input": {
                "usia": 65,
                "riwayat_kesehatan": 1,
                "gejala_fisik_urin": 1,
                "nyeri_pinggang_urin": 0,
                "gejala_infeksi": 0,
                "kebiasaan_hidup": 1,
                "tanda_bahaya": False
            }
        },
        {
            "id": 4,
            "nama": "Kasus 4: Pekerja Sehat Sesekali Konsumsi Asin",
            "kategori_target": "rendah",
            "input": {
                "usia": 32,
                "riwayat_kesehatan": 0,
                "gejala_fisik_urin": 1,
                "nyeri_pinggang_urin": 1,
                "gejala_infeksi": 0,
                "kebiasaan_hidup": 3,
                "tanda_bahaya": False
            }
        },

        # --- KATEGORI 2: PERLU WASPADA / RISIKO SEDANG (Kasus 5 - 10) ---
        {
            "id": 5,
            "nama": "Kasus 5: Riwayat Hipertensi Awal Terkontrol",
            "kategori_target": "waspada",
            "input": {
                "usia": 45,
                "riwayat_kesehatan": 5,
                "gejala_fisik_urin": 2,
                "nyeri_pinggang_urin": 1,
                "gejala_infeksi": 0,
                "kebiasaan_hidup": 4,
                "tanda_bahaya": False
            }
        },
        {
            "id": 6,
            "nama": "Kasus 6: Pekerja Kantor Kurang Minum Parah",
            "kategori_target": "waspada",
            "input": {
                "usia": 35,
                "riwayat_kesehatan": 2,
                "gejala_fisik_urin": 2,
                "nyeri_pinggang_urin": 3,
                "gejala_infeksi": 1,
                "kebiasaan_hidup": 7,
                "tanda_bahaya": False
            }
        },
        {
            "id": 7,
            "nama": "Kasus 7: Gejala Anyang-anyangan Ringan",
            "kategori_target": "waspada",
            "input": {
                "usia": 29,
                "riwayat_kesehatan": 1,
                "gejala_fisik_urin": 2,
                "nyeri_pinggang_urin": 2,
                "gejala_infeksi": 5,
                "kebiasaan_hidup": 4,
                "tanda_bahaya": False
            }
        },
        {
            "id": 8,
            "nama": "Kasus 8: Nyeri Pinggang Ringan Sedang & Urin Keruh",
            "kategori_target": "waspada",
            "input": {
                "usia": 40,
                "riwayat_kesehatan": 2,
                "gejala_fisik_urin": 2,
                "nyeri_pinggang_urin": 5,
                "gejala_infeksi": 2,
                "kebiasaan_hidup": 5,
                "tanda_bahaya": False
            }
        },
        {
            "id": 9,
            "nama": "Kasus 9: Lansia dengan Kelelahan & Bengkak Ringan",
            "kategori_target": "waspada",
            "input": {
                "usia": 68,
                "riwayat_kesehatan": 4,
                "gejala_fisik_urin": 5,
                "nyeri_pinggang_urin": 2,
                "gejala_infeksi": 1,
                "kebiasaan_hidup": 4,
                "tanda_bahaya": False
            }
        },
        {
            "id": 10,
            "nama": "Kasus 10: Sering Minum Obat NSAID Nyeri Sendi",
            "kategori_target": "waspada",
            "input": {
                "usia": 52,
                "riwayat_kesehatan": 6,
                "gejala_fisik_urin": 3,
                "nyeri_pinggang_urin": 2,
                "gejala_infeksi": 1,
                "kebiasaan_hidup": 4,
                "tanda_bahaya": False
            }
        },

        # --- KATEGORI 3: RISIKO TINGGI (Kasus 11 - 14) ---
        {
            "id": 11,
            "nama": "Kasus 11: Gejala Berat Ginjal Kronis (Hipertensi, Bengkak, Busa Urin)",
            "kategori_target": "tinggi",
            "input": {
                "usia": 62,
                "riwayat_kesehatan": 9,
                "gejala_fisik_urin": 9,
                "nyeri_pinggang_urin": 3,
                "gejala_infeksi": 2,
                "kebiasaan_hidup": 8,
                "tanda_bahaya": False
            }
        },
        {
            "id": 12,
            "nama": "Kasus 12: Kolik Ginjal Tajam + Urin Merah (Batu Ginjal Berat)",
            "kategori_target": "tinggi",
            "input": {
                "usia": 44,
                "riwayat_kesehatan": 3,
                "gejala_fisik_urin": 4,
                "nyeri_pinggang_urin": 9,
                "gejala_infeksi": 2,
                "kebiasaan_hidup": 9,
                "tanda_bahaya": False
            }
        },
        {
            "id": 13,
            "nama": "Kasus 13: Infeksi Ginjal Akut (Demam Menggigil + Sakit BAK Berat)",
            "kategori_target": "tinggi",
            "input": {
                "usia": 34,
                "riwayat_kesehatan": 2,
                "gejala_fisik_urin": 5,
                "nyeri_pinggang_urin": 7,
                "gejala_infeksi": 9,
                "kebiasaan_hidup": 4,
                "tanda_bahaya": False
            }
        },
        {
            "id": 14,
            "nama": "Kasus 14: Diabetes Kronis Lanjut + Bengkak Menyeluruh",
            "kategori_target": "tinggi",
            "input": {
                "usia": 70,
                "riwayat_kesehatan": 9,
                "gejala_fisik_urin": 8,
                "nyeri_pinggang_urin": 2,
                "gejala_infeksi": 2,
                "kebiasaan_hidup": 7,
                "tanda_bahaya": False
            }
        },

        # --- KATEGORI 4: TANDA BAHAYA / DARURAT (Kasus 15) ---
        {
            "id": 15,
            "nama": "Kasus 15: Tanda Bahaya Anuria / Tidak Bisa BAK & Sakit Luar Biasa",
            "kategori_target": "darurat",
            "input": {
                "usia": 55,
                "riwayat_kesehatan": 7,
                "gejala_fisik_urin": 8,
                "nyeri_pinggang_urin": 8,
                "gejala_infeksi": 5,
                "kebiasaan_hidup": 6,
                "tanda_bahaya": True
            }
        }
    ]

    print("=================================================================")
    print(" PENGUJIAN 15 KASUS UJI SISTEM PAKAR FUZZY MAMDANI GINJAL")
    print("=================================================================\n")

    passed_count = 0
    all_results = []

    for c in test_cases:
        res = engine.evaluate(c["input"])
        actual_level = res["status_level"]
        target_level = c["kategori_target"]
        passed = (actual_level == target_level)

        if passed:
            passed_count += 1
            status_text = "PASSED [OK]"
        else:
            status_text = f"FAILED [Expected {target_level}, Got {actual_level}]"

        print(f"[{c['id']:02d}] {c['nama']}")
        print(f"     Skor: Kronis={res['skor']['ginjal_kronis']}%, Batu={res['skor']['batu_ginjal']}%, ISK={res['skor']['infeksi_ginjal']}%")
        print(f"     Dominan: {res['penyakit_dominan']} ({res['skor_tertinggi']}%) | Level: {res['status_level']} ({res['status_label']})")
        print(f"     Hasil Uji: {status_text}\n")

        all_results.append({
            "id": c["id"],
            "nama": c["nama"],
            "target": target_level,
            "actual": actual_level,
            "skor": res["skor"],
            "dominan": res["penyakit_dominan"],
            "skor_tertinggi": res["skor_tertinggi"],
            "passed": passed
        })

    print("=================================================================")
    print(f"TOTAL KELULUSAN KASUS UJI: {passed_count} / {len(test_cases)} ({(passed_count/len(test_cases))*100:.1f}%)")
    print("=================================================================")

    with open("d:/Projects/KidNova/fuzzy-service/test_results.json", "w") as f:
        json.dump(all_results, f, indent=2)

    return passed_count == len(test_cases)

if __name__ == "__main__":
    run_tests()
