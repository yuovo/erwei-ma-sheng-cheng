$ErrorActionPreference = "Stop"

$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$url = "http://127.0.0.1:3000/zh"

function Test-QrbtfReady {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 3
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (-not (Test-QrbtfReady)) {
  $installedNode = "C:\Users\1\AppData\Local\Programs\nodejs\node.exe"
  $node = if (Test-Path -LiteralPath $installedNode) {
    $installedNode
  } else {
    (Get-Command node -ErrorAction Stop).Source
  }

  Start-Process `
    -FilePath $node `
    -ArgumentList @("node_modules/next/dist/bin/next", "start", "-p", "3000") `
    -WorkingDirectory $appRoot `
    -WindowStyle Hidden `
    -RedirectStandardOutput (Join-Path $appRoot "server.out.log") `
    -RedirectStandardError (Join-Path $appRoot "server.err.log")

  $deadline = (Get-Date).AddSeconds(30)
  while ((Get-Date) -lt $deadline -and -not (Test-QrbtfReady)) {
    Start-Sleep -Milliseconds 500
  }

  if (-not (Test-QrbtfReady)) {
    throw "QRBTF local server failed to start. See server.err.log."
  }
}

$programFilesX86 = [Environment]::GetFolderPath("ProgramFilesX86")
$browserCandidates = @(
  "$programFilesX86\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "$programFilesX86\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

$browser = $browserCandidates |
  Where-Object { $_ -and (Test-Path -LiteralPath $_) } |
  Select-Object -First 1

if ($browser) {
  Start-Process -FilePath $browser -ArgumentList @("--app=$url", "--window-size=1440,920")
} else {
  Start-Process -FilePath $url
}
