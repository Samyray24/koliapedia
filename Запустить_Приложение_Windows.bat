@echo off
cd /d "%~dp0"

netstat -ano | findstr 7777 > nul
if %errorlevel% neq 0 (
    start "" /B npm run dev
    timeout /t 2 /nobreak > nul
)

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:7777 --window-size=1260,860 --user-data-dir="%LOCALAPPDATA%\KoliapediaApp7777"
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:7777 --window-size=1260,860 --user-data-dir="%LOCALAPPDATA%\KoliapediaApp7777"
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app=http://localhost:7777 --window-size=1260,860 --user-data-dir="%LOCALAPPDATA%\KoliapediaApp7777"
) else (
    start http://localhost:7777
)

exit /b 0
