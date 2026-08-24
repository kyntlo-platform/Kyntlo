$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$expectedPages = @(
    "index.html",
    "about.html",
    "funnels.html",
    "compare.html",
    "pricing.html",
    "privacy.html",
    "terms.html",
    "refund.html"
)

$issues = [System.Collections.Generic.List[string]]::new()

foreach ($page in $expectedPages) {
    $pagePath = Join-Path $root $page
    if (-not (Test-Path -LiteralPath $pagePath -PathType Leaf)) {
        $issues.Add("Missing required page: $page")
    }
}

$doubleExtensions = Get-ChildItem -LiteralPath $root -File -Filter "*.html.html"
foreach ($file in $doubleExtensions) {
    $issues.Add("Double HTML extension: $($file.Name)")
}

$htmlFiles = Get-ChildItem -LiteralPath $root -File -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)

    foreach ($landmark in @("<nav", "<main", "<footer")) {
        if ($content -notmatch [regex]::Escape($landmark)) {
            $issues.Add("$($file.Name) is missing $landmark")
        }
    }

    $references = [regex]::Matches(
        $content,
        '(?:href|src)\s*=\s*["'']([^"'']+)["'']'
    )

    foreach ($match in $references) {
        $reference = $match.Groups[1].Value

        if ($reference -match '^(https?:|#|mailto:|tel:|data:|javascript:)') {
            continue
        }

        $pathOnly = ($reference -split "#")[0]
        $decodedPath = [uri]::UnescapeDataString($pathOnly)
        $target = Join-Path $file.DirectoryName $decodedPath

        if (-not (Test-Path -LiteralPath $target)) {
            $issues.Add("$($file.Name) has a broken reference: $reference")
        }
    }
}

if ($issues.Count -gt 0) {
    Write-Host "Site check failed with $($issues.Count) issue(s):" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host " - $issue" -ForegroundColor Red
    }
    exit 1
}

Write-Host "Site check passed." -ForegroundColor Green
Write-Host "Pages checked: $($htmlFiles.Count)"
Write-Host "Broken local references: 0"
Write-Host "Double .html.html files: 0"
