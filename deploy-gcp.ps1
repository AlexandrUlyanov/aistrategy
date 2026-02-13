param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectId,
    [string]$Region = "europe-west1",
    [string]$MongoUrl = "mongodb+srv://user:password@cluster.mongodb.net",
    [string]$DbName = "aureum_digital_prod",
    [string]$CorsOrigins = "*"
)

$ErrorActionPreference = "Stop"

$configDir = Join-Path $PSScriptRoot ".gcloud-local"
New-Item -ItemType Directory -Force -Path $configDir | Out-Null
$env:CLOUDSDK_CONFIG = $configDir

$activeAccount = ""
try {
    $activeAccount = (gcloud.cmd config get-value account 2>$null).Trim()
} catch {
    $activeAccount = ""
}

if (-not $activeAccount -or $activeAccount -eq "(unset)") {
    Write-Host "No active gcloud account found."
    Write-Host "Run this once, then re-run deploy-gcp.ps1:"
    Write-Host "gcloud.cmd auth login --no-launch-browser"
    exit 1
}

Write-Host "Using account: $activeAccount"
Write-Host "Setting project: $ProjectId"
gcloud.cmd config set project $ProjectId | Out-Null
gcloud.cmd config set run/region $Region | Out-Null

Write-Host "Enabling required GCP services..."
gcloud.cmd services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com

Write-Host "Starting Cloud Build deploy..."
gcloud.cmd builds submit `
  --config=cloudbuild.yaml `
  --substitutions="_MONGO_URL=$MongoUrl,_DB_NAME=$DbName,_CORS_ORIGINS=$CorsOrigins" `
  .

$backendUrl = gcloud.cmd run services describe aureum-backend --region=$Region --format="value(status.url)"
$frontendUrl = gcloud.cmd run services describe aureum-frontend --region=$Region --format="value(status.url)"

Write-Host ""
Write-Host "Deploy complete."
Write-Host "Backend URL:  $backendUrl"
Write-Host "Frontend URL: $frontendUrl"
