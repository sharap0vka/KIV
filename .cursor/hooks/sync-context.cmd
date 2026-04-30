@echo off
setlocal

set "LOG_FILE=.cursor\hooks\sync-context.log"

where node >nul 2>nul
if errorlevel 1 (
  >> "%LOG_FILE%" echo [%date% %time%] node is not available in PATH
  echo sync-context hook: node is not available in PATH 1>&2
  exit /b 0
)

node scripts/context/generate-context-docs.mjs >nul 2>nul
if errorlevel 1 (
  >> "%LOG_FILE%" echo [%date% %time%] failed to refresh AGENTS.MD/CONTEXT.md
  echo sync-context hook: failed to refresh AGENTS.MD/CONTEXT.md 1>&2
  exit /b 0
)

>> "%LOG_FILE%" echo [%date% %time%] context refreshed successfully
exit /b 0
