<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferensiEdukasi extends Model
{
    use HasFactory;

    protected $table = 'referensi_edukasi';

    protected $fillable = [
        'jenis_penyakit',
        'tingkat_risiko',
        'judul',
        'ringkasan',
        'nama_sumber',
        'link_asli',
        'kategori_topik',
    ];
}
