@echo off
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

echo ------------------------------------------
echo   NEXUS ANALYTICS SYSTEM STARTUP
echo ------------------------------------------
echo.

:: Start Backend in a new window
echo [SYSTEM] Launching Backend API Process...
start "NEXUS BACKEND" cmd /k "echo Initialize Virtual Environment && cd /d "%SCRIPT_DIR%backend" && venv\Scripts\python -m uvicorn main:app --reload --port 8000"

echo [SYSTEM] Waiting for backend initialization...
timeout /t 5 >nul

:: Start Frontend in a new window
echo [SYSTEM] Launching Frontend UI Process...
start "NEXUS FRONTEND" cmd /k "echo Initialize Node Environment && cd /d "%SCRIPT_DIR%frontend" && npm.cmd run dev -- --port 3000"

echo.
echo ==========================================
echo   Both services are now dispatching! 🚀
echo ==========================================
echo - Interface: http://localhost:3000/
echo - API Docs:  http://localhost:8000/docs
echo.
echo [INFO] Close these windows manually to stop the services.
echo.
pause
