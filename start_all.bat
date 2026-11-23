@echo off
echo =========================================================================
echo  MENJALANKAN SISTEM PAKAR KIDNNOVA (LOGIKA FUZZY MAMDANI UAS)
echo =========================================================================
echo.

echo [1/3] Menjalankan Microservice Python Fuzzy KidnNova (Port 8001)...
start "Python KidnNova Service" cmd /k "cd fuzzy-service && python main.py"

timeout /t 2 /nobreak >nul

echo [2/3] Menjalankan Backend Laravel KidnNova (Port 8000)...
start "Laravel KidnNova Backend" cmd /k "php artisan serve --port=8000"

timeout /t 2 /nobreak >nul

echo [3/3] Menjalankan Frontend React KidnNova (Port 5173)...
start "React KidnNova Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo =========================================================================
echo  SEMUA LAYANAN BERHASIL DIJALANKAN!
echo   - Frontend React  : http://localhost:5173
echo   - Backend Laravel : http://localhost:8000
echo   - Fuzzy Service   : http://localhost:8001
echo =========================================================================
pause
