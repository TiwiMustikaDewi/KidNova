Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host " MENJALANKAN SISTEM PAKAR KIDNNOVA (LOGIKA FUZZY MAMDANI UAS)" -ForegroundColor Green
Write-Host "=========================================================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Menjalankan Microservice Python Fuzzy Mamdani (Port 8001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/fuzzy-service'; python main.py"

Start-Sleep -Seconds 2

Write-Host "[2/3] Menjalankan Backend Laravel (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; php artisan serve --port=8000"

Start-Sleep -Seconds 2

Write-Host "[3/3] Menjalankan Frontend React Vite (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/frontend'; npm run dev"

Write-Host "`n=========================================================================" -ForegroundColor Cyan
Write-Host " SEMUA LAYANAN BERHASIL DIJALANKAN!" -ForegroundColor Green
Write-Host "  - Frontend React  : http://localhost:5173" -ForegroundColor White
Write-Host "  - Backend Laravel : http://localhost:8000" -ForegroundColor White
Write-Host "  - Fuzzy Service   : http://localhost:8001" -ForegroundColor White
Write-Host "=========================================================================" -ForegroundColor Cyan
