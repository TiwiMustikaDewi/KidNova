<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Database\Seeders\ReferensiEdukasiSeeder;

class SkriningApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ReferensiEdukasiSeeder::class);
    }

    public function test_api_health_check(): void
    {
        $response = $this->getJson('/api/health');
        $response->assertStatus(200)
            ->assertJsonPath('status', 'ok');
    }

    public function test_skrining_calculation_and_article_recommendation(): void
    {
        $payload = [
            'nama_pasien' => 'Budi Santoso',
            'usia' => 52,
            'riwayat_kesehatan' => 7.0,
            'gejala_fisik_urin' => 6.5,
            'nyeri_pinggang_urin' => 2.0,
            'gejala_infeksi' => 1.0,
            'kebiasaan_hidup' => 5.0,
            'tanda_bahaya' => false,
        ];

        $response = $this->postJson('/api/skrining', $payload);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'skor' => ['ginjal_kronis', 'batu_ginjal', 'infeksi_ginjal'],
                    'penyakit_dominan',
                    'skor_tertinggi',
                    'status_level',
                    'status_label',
                    'status_color',
                    'faktor_penyebab_utama',
                    'panduan_dokter',
                    'artikel_rekomendasi',
                    'riwayat_id',
                ]
            ]);

        $this->assertDatabaseHas('riwayat_skrining', [
            'nama_pasien' => 'Budi Santoso',
            'usia' => 52,
        ]);
    }

    public function test_emergency_flag_detection(): void
    {
        $payload = [
            'nama_pasien' => 'Pasien Gawat',
            'usia' => 45,
            'riwayat_kesehatan' => 4.0,
            'gejala_fisik_urin' => 5.0,
            'nyeri_pinggang_urin' => 8.0,
            'gejala_infeksi' => 3.0,
            'kebiasaan_hidup' => 5.0,
            'tanda_bahaya' => true,
        ];

        $response = $this->postJson('/api/skrining', $payload);

        $response->assertStatus(200)
            ->assertJsonPath('data.status_level', 'darurat')
            ->assertJsonPath('data.tanda_bahaya', true);
    }

    public function test_get_history_list(): void
    {
        $response = $this->getJson('/api/riwayat');
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    }

    public function test_get_education_articles(): void
    {
        $response = $this->getJson('/api/edukasi');
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    }
}
