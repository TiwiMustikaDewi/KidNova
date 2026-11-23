import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from fuzzy_engine import KidneyFuzzyEngine

# Inisialisasi FastAPI
app = FastAPI(
    title="Kidney Fuzzy Logic Expert Service",
    description="Microservice Sistem Pakar Logika Fuzzy Mamdani untuk Deteksi Dini Risiko Ginjal (UAS Sispak)",
    version="1.0.0"
)

# CORS middleware agar dapat diakses oleh Laravel maupun React jika dibutuhkan
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load engine sekali saat start
engine = KidneyFuzzyEngine()

class ScreeningInput(BaseModel):
    usia: float = Field(..., ge=15, le=90, description="Usia pasien (15 - 90)")
    riwayat_kesehatan: float = Field(..., ge=0, le=10, description="Skala riwayat hipertensi, diabetes, obat nyeri (0 - 10)")
    gejala_fisik_urin: float = Field(..., ge=0, le=10, description="Skala bengkak, urin berbusa, mudah lelah (0 - 10)")
    nyeri_pinggang_urin: float = Field(..., ge=0, le=10, description="Skala nyeri pinggang & urin keruh/merah (0 - 10)")
    gejala_infeksi: float = Field(..., ge=0, le=10, description="Skala demam, perih saat BAK, anyang-anyangan (0 - 10)")
    kebiasaan_hidup: float = Field(..., ge=0, le=10, description="Skala kurang minum & pola hidup buruk (0 - 10)")
    tanda_bahaya: bool = Field(False, description="Tanda darurat / bahaya klinis")

@app.get("/")
def read_root():
    return {
        "service": "Kidney Disease Fuzzy Logic Service",
        "method": "Fuzzy Mamdani (Max-Min Inference & Centroid Defuzzification)",
        "port": 8001,
        "status": "online"
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/calculate")
def calculate_fuzzy_risk(data: ScreeningInput):
    """
    Menghitung 3 skor risiko penyakit ginjal dengan Fuzzy Logic Mamdani
    """
    try:
        inputs_dict = data.model_dump()
        result = engine.evaluate(inputs_dict)
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan pada perhitungan fuzzy: {str(e)}")

@app.get("/test-cases")
def get_test_cases():
    """
    Mengambil data 15 kasus uji yang telah terverifikasi
    """
    results_path = os.path.join(os.path.dirname(__file__), "test_results.json")
    if os.path.exists(results_path):
        import json
        with open(results_path, "r") as f:
            return json.load(f)
    return {"message": "Run test_fuzzy.py to generate results"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
