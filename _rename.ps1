$utf8 = New-Object System.Text.UTF8Encoding $false
$files = Get-ChildItem -Recurse -Include *.html
foreach ($f in $files) {
  $t = [System.IO.File]::ReadAllText($f.FullName, $utf8)
  $orig = $t
  # ARIA: longer suffixes first
  $t = $t -replace 'composizione-floreale-aria-celeste-milano-dettaglio', 'composizione-floreale-aria-celeste-milano-fiorista'
  $t = $t -replace 'composizione-floreale-aria-celeste-milano-extra', 'bouquet-aria-celeste-milano-matrimonio'
  $t = $t -replace 'composizione-floreale-aria-celeste-milano-still', 'dettaglio-fiori-aria-celeste-milano'
  # base: only when NOT followed by -fiorista (newly added) or any other word char/hyphen
  $t = $t -replace 'composizione-floreale-aria-celeste-milano(?![-\w])', 'scenografia-botanica-aria-celeste-milano'

  # MOIRE
  $t = $t -replace 'composizione-floreale-moire-celeste-milano-dettaglio', 'scenografia-botanica-moire-celeste-milano'
  $t = $t -replace 'composizione-floreale-moire-celeste-milano-extra', 'dettaglio-fiori-moire-celeste-milano'
  $t = $t -replace 'composizione-floreale-moire-celeste-milano-still', 'bouquet-moire-celeste-milano-matrimonio'
  $t = $t -replace 'composizione-floreale-moire-celeste-milano(?![-\w])', 'composizione-floreale-moire-celeste-milano-fiorista'

  # bump v=4 on these new images
  $t = [regex]::Replace($t, '(composizione-floreale-aria-celeste-milano-fiorista|bouquet-aria-celeste-milano-matrimonio|scenografia-botanica-aria-celeste-milano|dettaglio-fiori-aria-celeste-milano|composizione-floreale-moire-celeste-milano-fiorista|bouquet-moire-celeste-milano-matrimonio|scenografia-botanica-moire-celeste-milano|dettaglio-fiori-moire-celeste-milano)\.(jpg|webp)(\?v=\d+)?', '$1.$2?v=4')

  if ($t -ne $orig) {
    [System.IO.File]::WriteAllText($f.FullName, $t, $utf8)
    Write-Host "updated: $($f.FullName)"
  }
}
