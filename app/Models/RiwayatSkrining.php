<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatSkrining extends Model
{
    use HasFactory;

    protected $table = 'riwayat_skrining';

    protected $fillable = [
        'nama_pasien',
        'usia',
        'riwayat_kesehatan',
        'gejala_fisik_urin',
        'nyeri_pinggang_urin',
        'gejala_infeksi',
        'kebiasaan_hidup',
        'tanda_bahaya',
        'skor_ginjal_kronis',
        'skor_batu_ginjal',
        'skor_infeksi_ginjal',
        'skor_tertinggi',
        'penyakit_dominan',
        'status_utama',
        'status_level',
        'status_color',
        'faktor_penyebab_utama',
        'panduan_dokter',
        'ringkasan_analisis',
        'tanggal_pengecekan',
    ];

    protected $casts = [
        'tanda_bahaya' => 'boolean',
        'faktor_penyebab_utama' => 'array',
        'panduan_dokter' => 'array',
        'tanggal_pengecekan' => 'datetime',
        'usia' => 'integer',
        'riwayat_kesehatan' => 'float',
        'gejala_fisik_urin' => 'float',
        'nyeri_pinggang_urin' => 'float',
        'gejala_infeksi' => 'float',
        'kebiasaan_hidup' => 'float',
        'skor_ginjal_kronis' => 'float',
        'skor_batu_ginjal' => 'float',
        'skor_infeksi_ginjal' => 'float',
        'skor_tertinggi' => 'float',
    ];
}
