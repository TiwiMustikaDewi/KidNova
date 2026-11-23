<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SkriningController;
use App\Http\Controllers\Api\AuthController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'Kidney Expert System Backend (Laravel)',
        'time' => now()->toIso8601String()
    ]);
});

// Skrining Ginjal & Fuzzy Logic
Route::post('/skrining', [SkriningController::class, 'calculate']);
Route::get('/riwayat', [SkriningController::class, 'getRiwayat']);
Route::get('/riwayat/{id}', [SkriningController::class, 'showRiwayat']);
Route::get('/edukasi', [SkriningController::class, 'getEdukasi']);

// Autentikasi Pengguna
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/me', [AuthController::class, 'me']);
Route::post('/logout', [AuthController::class, 'logout']);
