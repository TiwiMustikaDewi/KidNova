import React, { useMemo, useState } from 'react';
import {
  BODY_OPTIONS,
  evaluateMamdani,
  HISTORY_OPTIONS,
  PAIN_OPTIONS,
  URINE_OPTIONS
} from '../utils/fuzzyMamdani';
import './Detection.css';

export default function Detection() {
  const [bpValue, setBpValue] = useState(120);
  const [bpUnknown, setBpUnknown] = useState(false);
  const [painScore, setPainScore] = useState(0);
  const [selectedUrine, setSelectedUrine] = useState([]);
  const [selectedBody, setSelectedBody] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState([]);

  const handleToggleUnknownBp = (event) => {
    const checked = event.target.checked;
    setBpUnknown(checked);
    if (checked) {
      setBpValue(120);
    }
  };

  const toggleMultiOption = (id, selectedList, setSelectedList) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item) => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const handleReset = () => {
    setBpValue(120);
    setBpUnknown(false);
    setPainScore(0);
    setSelectedUrine([]);
    setSelectedBody([]);
    setSelectedHistory([]);
  };

  const bpStatus = useMemo(() => {
    if (bpValue < 130) {
      return { text: 'Normal', tone: 'low' };
    }
    if (bpValue < 155) {
      return { text: 'Tinggi', tone: 'medium' };
    }
    return { text: 'Sangat Tinggi', tone: 'high' };
  }, [bpValue]);

  const assessment = useMemo(() => {
    const sumWeights = (options, selectedIds) =>
      Math.min(
        10,
        options
          .filter((opt) => selectedIds.includes(opt.id))
          .reduce((acc, opt) => acc + opt.weight, 0)
      );

    const gb = sumWeights(URINE_OPTIONS, selectedUrine);
    const gs = sumWeights(BODY_OPTIONS, selectedBody);
    const fr = sumWeights(HISTORY_OPTIONS, selectedHistory);

    const selectedLabels = [];
    if (bpValue >= 140) {
      selectedLabels.push(`tekanan darah ${bpValue} mmHg`);
    }

    const activePain = PAIN_OPTIONS.find((item) => item.score === painScore);
    if (painScore >= 5 && activePain) {
      selectedLabels.push(activePain.label);
    }

    URINE_OPTIONS.forEach((opt) => {
      if (selectedUrine.includes(opt.id)) selectedLabels.push(opt.label);
    });
    BODY_OPTIONS.forEach((opt) => {
      if (selectedBody.includes(opt.id)) selectedLabels.push(opt.label);
    });
    HISTORY_OPTIONS.forEach((opt) => {
      if (selectedHistory.includes(opt.id)) selectedLabels.push(opt.label);
    });

    const result = evaluateMamdani({
      td: bpValue,
      np: painScore,
      gb,
      gs,
      fr
    });

    let driversText =
      'Faktor utama: Tekanan darah berada di kisaran normal dan tidak ada keluhan menonjol.';
    if (selectedLabels.length > 0) {
      const preview = selectedLabels.slice(0, 3).join(', ');
      const suffix = selectedLabels.length > 3 ? ', dan keluhan lainnya' : '';
      driversText = `Faktor yang memengaruhi: ${preview}${suffix}.`;
    }

    return {
      ...result,
      driversText,
      clampedMarker: Math.max(3, Math.min(97, result.score))
    };
  }, [bpValue, painScore, selectedUrine, selectedBody, selectedHistory]);

  return (
    <section className="detection-view view-enter">
      <div className="container detection-container">
        <div className="detection-header">
          <span className="pill-tag pill-yellow">Cek Dini Kesehatan Ginjal</span>
          <h1 className="detection-title">Ceritakan Keluhan Anda</h1>
          <p className="detection-lead">
            Pilih kondisi yang paling sesuai dengan keadaan Anda akhir-akhir ini.
            Panel hasil di sisi kanan akan langsung diperbarui secara otomatis.
          </p>
        </div>

        <div className="detection-split">
          <div className="questions-col">
            <div className="question-card">
              <div className="question-top">
                <label htmlFor="slider-bp" className="question-title">
                  1. Tekanan Darah Sistolik (Angka Atas)
                </label>
                <span className={`bp-badge tone-${bpStatus.tone}`}>
                  {bpStatus.text}
                </span>
              </div>

              <div className="bp-readout">
                <span className="bp-number">{bpValue} mmHg</span>
                <span className="bp-hint">Geser sesuai hasil cek terakhir</span>
              </div>

              <input
                type="range"
                id="slider-bp"
                className="bp-slider"
                min="90"
                max="200"
                step="1"
                value={bpValue}
                disabled={bpUnknown}
                onChange={(e) => setBpValue(Number(e.target.value))}
              />

              <div className="bp-scale">
                <span>90 mmHg</span>
                <span>120 (Normal)</span>
                <span>140 (Tinggi)</span>
                <span>200 mmHg</span>
              </div>

              <label className="bp-checkbox-row">
                <input
                  type="checkbox"
                  checked={bpUnknown}
                  onChange={handleToggleUnknownBp}
                />
                <span>
                  Saya tidak tahu pasti tekanan darah saya (gunakan perkiraan normal 120 mmHg)
                </span>
              </label>
            </div>

            <div className="question-card">
              <p className="question-title">
                2. Nyeri di Pinggang atau Punggung Bawah
              </p>
              <p className="question-desc">
                Pilih tingkat rasa nyeri yang paling mendekati kondisi Anda.
              </p>

              <div className="pain-grid">
                {PAIN_OPTIONS.map((option) => {
                  const isActive = painScore === option.score;
                  return (
                    <button
                      key={option.score}
                      type="button"
                      className={`pain-card ${isActive ? `active tone-${option.tone}` : ''}`}
                      onClick={() => setPainScore(option.score)}
                    >
                      {option.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="question-card">
              <p className="question-title">3. Keluhan Saat Buang Air Kecil</p>
              <p className="question-desc">
                Pilih semua yang Anda alami, atau lewati jika tidak ada.
              </p>

              <div className="pills-wrap">
                {URINE_OPTIONS.map((option) => {
                  const isActive = selectedUrine.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`option-pill ${isActive ? 'active' : ''}`}
                      onClick={() =>
                        toggleMultiOption(option.id, selectedUrine, setSelectedUrine)
                      }
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="question-card">
              <p className="question-title">4. Kondisi Tubuh Lainnya</p>
              <p className="question-desc">
                Pilih semua keluhan tubuh yang menyertai akhir-akhir ini.
              </p>

              <div className="pills-wrap">
                {BODY_OPTIONS.map((option) => {
                  const isActive = selectedBody.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`option-pill ${isActive ? 'active' : ''}`}
                      onClick={() =>
                        toggleMultiOption(option.id, selectedBody, setSelectedBody)
                      }
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="question-card">
              <p className="question-title">5. Riwayat Kesehatan</p>
              <p className="question-desc">
                Membantu menilai faktor kerentanan ginjal Anda.
              </p>

              <div className="pills-wrap">
                {HISTORY_OPTIONS.map((option) => {
                  const isActive = selectedHistory.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`option-pill ${isActive ? 'active' : ''}`}
                      onClick={() =>
                        toggleMultiOption(option.id, selectedHistory, setSelectedHistory)
                      }
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="reset-row">
              <button
                type="button"
                className="btn-reset"
                onClick={handleReset}
              >
                Reset Pilihan
              </button>
            </div>
          </div>

          <aside className="result-col">
            <div className={`result-panel theme-${assessment.level}`}>
              <div className="result-top">
                <div>
                  <p className="result-overline">Skor Indikasi Risiko</p>
                  <span className="result-score">{assessment.score}%</span>
                </div>
                <span className={`result-badge tone-${assessment.level}`}>
                  {assessment.badgeText}
                </span>
              </div>

              <div className="result-meter-block">
                <div className="result-meter-track-wrap">
                  <div className="result-meter-track" />
                  <div
                    className="result-meter-marker"
                    style={{ left: `calc(${assessment.clampedMarker}% - 8px)` }}
                  />
                </div>
                <div className="result-meter-labels">
                  <span className="meter-low">Rendah</span>
                  <span className="meter-medium">Sedang</span>
                  <span className="meter-high">Tinggi</span>
                </div>
              </div>

              <div className="result-summary-block">
                <div className="result-summary-head">
                  <p className="result-section-label">Ringkasan Kondisi</p>
                  <span className={`indication-pill tone-${assessment.level}`}>
                    {assessment.dominantIndication}
                  </span>
                </div>
                <p className="result-summary-text">{assessment.summary}</p>
                <p className="result-drivers-text">{assessment.driversText}</p>
              </div>

              {assessment.level === 'high' && (
                <div className="high-risk-alert">
                  <p className="high-risk-title">Peringatan Risiko Tinggi</p>
                  <p className="high-risk-text">
                    Segera jadwalkan pemeriksaan ke dokter. Jika disertai demam tinggi,
                    nyeri pinggang hebat, atau urin berdarah, kunjungi layanan gawat darurat.
                  </p>
                </div>
              )}

              <div className="result-steps-block">
                <p className={`result-steps-title tone-text-${assessment.level}`}>
                  Saran Langkah Lanjut
                </p>
                <ul className="result-steps-list">
                  {assessment.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="medical-note-card">
              <p className="medical-note-title">Catatan Medis</p>
              <p className="medical-note-text">
                Hasil ini merupakan skrining awal, bukan diagnosis dokter. Untuk
                kepastian kesehatan ginjal Anda, lakukan pemeriksaan langsung bersama dokter.
              </p>
            </div>

            <div className="references-card">
              <p className="references-title">Referensi Medis Resmi</p>
              <div className="references-list">
                <a
                  href="https://kdigo.org/guidelines/ckd-evaluation-and-management/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-link"
                >
                  <span>KDIGO 2024 CKD Guideline</span>
                  <span className="reference-open">Buka</span>
                </a>
                <a
                  href="https://uroweb.org/guidelines/urological-infections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-link"
                >
                  <span>EAU Guidelines on Urological Infections 2024</span>
                  <span className="reference-open">Buka</span>
                </a>
                <a
                  href="https://uroweb.org/guidelines/urolithiasis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-link"
                >
                  <span>EAU Guidelines on Urolithiasis 2025</span>
                  <span className="reference-open">Buka</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
