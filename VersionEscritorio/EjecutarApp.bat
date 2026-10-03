@echo off
echo ========================================================
echo Fit by JP - Modo Escritorio
echo ========================================================
echo.
echo Iniciando la aplicacion... por favor no cierres esta ventana.
echo Abriendo tu navegador...
echo.

start http://localhost:8200
npx serve -p 8200 -s .

pause
