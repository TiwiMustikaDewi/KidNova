<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('referensi_edukasi', function (Blueprint $table) {
            $table->id();
            $table->string('jenis_penyakit'); // 'Ginjal Kronis', 'Batu Ginjal', 'Infeksi Ginjal / Saluran Kemih', 'Umum'
            $table->string('tingkat_risiko'); // 'rendah', 'waspada', 'tinggi', 'darurat', 'semua'
            $table->string('judul');
            $table->text('ringkasan');
            $table->string('nama_sumber'); // Kemenkes RI / Ayo Sehat, PERNEFRI, IAUI, WHO, National Kidney Foundation
            $table->string('link_asli');
            $table->string('kategori_topik')->nullable(); // Pencegahan, Nutrisi, Penanganan Medis
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referensi_edukasi');
    }
};
