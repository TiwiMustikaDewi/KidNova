<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed user demo jika belum ada
        User::firstOrCreate(
            ['email' => 'pasien@demo.com'],
            [
                'name' => 'Pasien Demo',
                'password' => Hash::make('password123'),
            ]
        );

        $this->call([
            ReferensiEdukasiSeeder::class,
        ]);
    }
}
