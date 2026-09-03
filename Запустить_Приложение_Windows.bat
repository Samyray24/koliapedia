@echo off
cd /d "%~dp0"

netstat -ano | findstr 5173 > nul
if %errorlevel% neq 0 (
    start "" /B npm run dev
    timeout /t 2 /nobreak > nul
)

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:5173 --window-size=1240,840 --user-data-dir="%LOCALAPPDATA%\KoliapediaApp"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:5173 --window-size=1240,840 --user-data-dir="%LOCALAPPDATA%\KoliapediaApp"
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app=http://localhost:5173 --window-size=1240,840 --user-data-dir="%LOCALAPPDATA%\KoliapediaApp"
) else (
    start http://localhost:5173
)

exit /b 0
