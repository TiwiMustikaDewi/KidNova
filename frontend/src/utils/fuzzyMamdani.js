export const PAIN_OPTIONS = [
  { score: 0, title: 'Tidak ada', label: 'tidak ada nyeri pinggang', tone: 'low' },
  { score: 2, title: 'Ringan / pegal', label: 'nyeri pinggang ringan', tone: 'low' },
  { score: 5, title: 'Sedang / mengganggu', label: 'nyeri pinggang sedang dan mengganggu', tone: 'medium' },
  { score: 9, title: 'Berat / tajam menjalar', label: 'nyeri pinggang berat dan tajam menjalar', tone: 'high' }
];

export const URINE_OPTIONS = [
  { id: 'dysuria', text: 'Perih / panas saat BAK', weight: 2.5, label: 'perih atau panas saat buang air kecil' },
  { id: 'hematuria', text: 'Urin kemerahan / berdarah', weight: 3.5, label: 'urin kemerahan atau berdarah' },
  { id: 'foamy', text: 'Urin berbusa pekat', weight: 3.0, label: 'urin berbusa pekat' },
  { id: 'nocturia', text: 'Sering BAK malam hari', weight: 2.0, label: 'sering BAK malam hari' },
  { id: 'cloudy', text: 'Urin keruh / berbau menyengat', weight: 2.5, label: 'urin keruh atau berbau menyengat' }
];

export const BODY_OPTIONS = [
  { id: 'edema', text: 'Kaki / wajah bengkak', weight: 3.5, label: 'kaki atau wajah bengkak' },
  { id: 'fever', text: 'Demam atau menggigil', weight: 3.5, label: 'demam atau menggigil' },
  { id: 'fatigue', text: 'Lemas berkepanjangan', weight: 2.0, label: 'lemas berkepanjangan' },
  { id: 'nausea', text: 'Mual atau muntah', weight: 2.5, label: 'mual atau muntah' },
  { id: 'appetite', text: 'Nafsu makan turun drastis', weight: 2.0, label: 'nafsu makan turun drastis' }
];

export const HISTORY_OPTIONS = [
  { id: 'diabetes', text: 'Diabetes / gula darah tinggi', weight: 3.5, label: 'diabetes atau gula darah tinggi' },
  { id: 'hypertension', text: 'Hipertensi / darah tinggi lama', weight: 3.5, label: 'hipertensi atau darah tinggi lama' },
  { id: 'prev_stone_uti', text: 'Pernah batu ginjal / ISK', weight: 2.5, label: 'pernah batu ginjal atau ISK' },
  { id: 'age_50', text: 'Usia di atas 50 tahun', weight: 2.0, label: 'usia di atas 50 tahun' },
  { id: 'low_water', text: 'Jarang minum air putih', weight: 1.5, label: 'jarang minum air putih' }
];

export function trapmf(x, a, b, c, d) {
  if (x <= a && a < b) return 0;
  if (x >= d && c < d) return 0;
  if (x >= b && x <= c) return 1;
  if (x > a && x < b) return (x - a) / (b - a);
  if (x > c && x < d) return (d - x) / (d - c);
  return 0;
}

export function trimf(x, a, b, c) {
  if (x <= a || x >= c) return 0;
  if (x === b) return 1;
  if (x > a && x < b) return (x - a) / (b - a);
  return (c - x) / (c - b);
}

export function evaluateMamdani({ td = 120, np = 0, gb = 0, gs = 0, fr = 0 }) {
  const muTD = {
    normal: trapmf(td, 90, 90, 120, 130),
    tinggi: trimf(td, 120, 140, 160),
    sangatTinggi: trapmf(td, 150, 180, 200, 200)
  };

  const muNP = {
    ringan: trapmf(np, 0, 0, 2, 4),
    sedang: trimf(np, 3, 5, 7),
    berat: trapmf(np, 6, 8, 10, 10)
  };

  const muGB = {
    ringan: trapmf(gb, 0, 0, 2, 4),
    sedang: trimf(gb, 3, 5, 7),
    berat: trapmf(gb, 6, 8, 10, 10)
  };

  const muGS = {
    ringan: trapmf(gs, 0, 0, 2, 4),
    sedang: trimf(gs, 3, 5, 7),
    berat: trapmf(gs, 6, 8, 10, 10)
  };

  const muFR = {
    rendah: trapmf(fr, 0, 0, 2, 4),
    sedang: trimf(fr, 3, 5, 7),
    tinggi: trapmf(fr, 6, 8, 10, 10)
  };

  const rules = [
    { cluster: 'ckd', out: 'tinggi', alpha: Math.min(muTD.sangatTinggi, muGS.berat, muFR.tinggi) },
    { cluster: 'ckd', out: 'tinggi', alpha: Math.min(muTD.sangatTinggi, muGB.berat, muFR.tinggi) },
    { cluster: 'ckd', out: 'tinggi', alpha: Math.min(muTD.tinggi, muGS.berat, muFR.tinggi) },
    { cluster: 'ckd', out: 'tinggi', alpha: Math.min(muTD.tinggi, muGB.sedang, muGS.sedang, muFR.tinggi) },
    { cluster: 'ckd', out: 'sedang', alpha: Math.min(muTD.tinggi, muGS.sedang, muFR.sedang) },
    { cluster: 'ckd', out: 'sedang', alpha: Math.min(muTD.tinggi, muGB.ringan, muGS.ringan, muFR.tinggi) },

    { cluster: 'isk', out: 'tinggi', alpha: Math.min(muGB.berat, muGS.berat, muNP.berat) },
    { cluster: 'isk', out: 'tinggi', alpha: Math.min(muGB.berat, muGS.berat, muNP.sedang) },
    { cluster: 'isk', out: 'tinggi', alpha: Math.min(muGB.berat, muGS.sedang, muNP.sedang) },
    { cluster: 'isk', out: 'sedang', alpha: Math.min(muGB.berat, muGS.ringan, muNP.ringan) },
    { cluster: 'isk', out: 'sedang', alpha: Math.min(muGB.sedang, muGS.sedang, muNP.ringan) },

    { cluster: 'batu', out: 'tinggi', alpha: Math.min(muNP.berat, muGB.berat, muGS.sedang) },
    { cluster: 'batu', out: 'tinggi', alpha: Math.min(muNP.berat, muGB.sedang, muFR.tinggi) },
    { cluster: 'batu', out: 'sedang', alpha: Math.min(muNP.berat, muGB.ringan, muGS.ringan) },
    { cluster: 'batu', out: 'sedang', alpha: Math.min(muNP.sedang, muGB.sedang, muGS.ringan) },

    { cluster: 'aman', out: 'rendah', alpha: Math.min(muTD.normal, muNP.ringan, muGB.ringan, muGS.ringan, muFR.rendah) },
    { cluster: 'aman', out: 'rendah', alpha: Math.min(muTD.normal, muNP.ringan, muGB.ringan, muGS.ringan, muFR.sedang) },
    { cluster: 'aman', out: 'rendah', alpha: Math.min(muTD.normal, muNP.sedang, muGB.ringan, muGS.ringan, muFR.rendah) },
    { cluster: 'isk', out: 'sedang', alpha: Math.min(muTD.normal, muNP.ringan, muGB.sedang, muGS.ringan, muFR.rendah) },
    { cluster: 'ckd', out: 'sedang', alpha: Math.min(muTD.sangatTinggi, muNP.ringan, muGB.ringan, muGS.ringan) }
  ];

  let maxRendah = 0;
  let maxSedang = 0;
  let maxTinggi = 0;
  const clusterWeights = { ckd: 0, isk: 0, batu: 0 };

  rules.forEach((rule) => {
    if (rule.out === 'rendah' && rule.alpha > maxRendah) maxRendah = rule.alpha;
    if (rule.out === 'sedang' && rule.alpha > maxSedang) maxSedang = rule.alpha;
    if (rule.out === 'tinggi' && rule.alpha > maxTinggi) maxTinggi = rule.alpha;
    if (rule.cluster !== 'aman' && rule.alpha > clusterWeights[rule.cluster]) {
      clusterWeights[rule.cluster] = rule.alpha;
    }
  });

  if (maxRendah === 0 && maxSedang === 0 && maxTinggi === 0) {
    const avgSeverity = (((td - 90) / 110) * 10 + np + gb + gs + fr) / 5;
    if (avgSeverity >= 6.5) maxTinggi = 0.7;
    else if (avgSeverity >= 3.2) maxSedang = 0.7;
    else maxRendah = 0.7;
  }

  let numerator = 0;
  let denominator = 0;

  for (let z = 0; z <= 100; z += 1) {
    const muOutRendah = Math.min(maxRendah, trapmf(z, 0, 0, 25, 40));
    const muOutSedang = Math.min(maxSedang, trimf(z, 30, 50, 70));
    const muOutTinggi = Math.min(maxTinggi, trapmf(z, 60, 80, 100, 100));
    const muAgg = Math.max(muOutRendah, muOutSedang, muOutTinggi);

    numerator += z * muAgg;
    denominator += muAgg;
  }

  const score = denominator > 0 ? Math.round(numerator / denominator) : 15;

  let dominantIndication = 'Kondisi Terpantau Aman';
  if (score > 35) {
    const topCluster = Object.entries(clusterWeights).sort((a, b) => b[1] - a[1])[0];
    if (topCluster && topCluster[1] > 0) {
      const names = {
        ckd: 'Mengarah ke Ginjal Kronis',
        isk: 'Mengarah ke Infeksi Saluran Kemih',
        batu: 'Mengarah ke Batu Ginjal'
      };
      dominantIndication = names[topCluster[0]];
    } else {
      dominantIndication = 'Perlu Evaluasi Medis Umum';
    }
  }

  if (score <= 35) {
    return {
      score,
      level: 'low',
      badgeText: 'Risiko Rendah',
      dominantIndication,
      summary:
        'Berdasarkan jawaban Anda saat ini, tidak tampak tanda-tanda gangguan ginjal yang mengkhawatirkan. Tetap pertahankan kebiasaan sehat Anda.',
      steps: [
        'Penuhi kebutuhan minum air putih secara teratur setiap hari.',
        'Batasi konsumsi garam berlebih dan makanan olahan.',
        'Lakukan pemeriksaan kesehatan rutin setidaknya setahun sekali.'
      ]
    };
  }

  if (score <= 69) {
    return {
      score,
      level: 'medium',
      badgeText: 'Risiko Sedang',
      dominantIndication,
      summary:
        'Ada beberapa keluhan atau faktor risiko yang sebaiknya diperhatikan sejak dini. Pemeriksaan sederhana ke dokter akan membantu memastikan kondisi ginjal Anda.',
      steps: [
        'Jadwalkan konsultasi dengan dokter umum dalam waktu dekat.',
        'Diskusikan perlunya pemeriksaan lab dasar seperti tes urin dan tes darah fungsi ginjal.',
        'Pantau tekanan darah secara berkala dan hindari minum obat pereda nyeri tanpa anjuran dokter.'
      ]
    };
  }

  return {
    score,
    level: 'high',
    badgeText: 'Risiko Tinggi',
    dominantIndication,
    summary:
      'Kombinasi keluhan Anda menunjukkan indikasi risiko ginjal yang cukup kuat. Sangat disarankan untuk segera memeriksakan diri ke dokter guna mendapatkan evaluasi menyeluruh.',
    steps: [
      'Segera buat janji konsultasi dengan dokter atau fasilitas kesehatan terdekat.',
      'Sampaikan seluruh keluhan yang Anda pilih di formulir ini kepada dokter.',
      'Jika disertai demam tinggi, nyeri pinggang hebat, atau urin berdarah, segera kunjungi layanan gawat darurat.'
    ]
  };
}

export async function assessKidneyRisk(payload, apiEndpoint = null) {
  if (apiEndpoint) {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return response.json();
    }
  }
  return evaluateMamdani(payload);
}
