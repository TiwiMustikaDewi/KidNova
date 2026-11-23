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
        Schema::create('riwayat_skrining', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('nama_pasien')->nullable();
            
            // 7 Input Parameters
            $table->integer('usia');
            $table->decimal('riwayat_kesehatan', 4, 1);
            $table->decimal('gejala_fisik_urin', 4, 1);
            $table->decimal('nyeri_pinggang_urin', 4, 1);
            $table->decimal('gejala_infeksi', 4, 1);
            $table->decimal('kebiasaan_hidup', 4, 1);
            $table->boolean('tanda_bahaya')->default(false);

            // Fuzzy Output
            $table->decimal('skor_ginjal_kronis', 5, 2);
            $table->decimal('skor_batu_ginjal', 5, 2);
            $table->decimal('skor_infeksi_ginjal', 5, 2);
            $table->decimal('skor_tertinggi', 5, 2);
            $table->string('penyakit_dominan');
            $table->string('status_utama');
            $table->string('status_level'); // 'rendah', 'waspada', 'tinggi', 'darurat'
            $table->string('status_color'); // 'green', 'yellow', 'red'
            $table->json('faktor_penyebab_utama')->nullable();
            $table->json('panduan_dokter')->nullable();
            $table->text('ringkasan_analisis')->nullable();
            $table->timestamp('tanggal_pengecekan');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_skrining');
    }
};
