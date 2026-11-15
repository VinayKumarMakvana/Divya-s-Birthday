Add-Type -AssemblyName System.Drawing
$imgPath = "C:/Users/VINAY/.gemini/antigravity/brain/089d78bd-4a9c-4995-9ac1-459e57c850cf/.user_uploaded/media_1794755392848_f1d7a3bc.jpg"
$bmp = New-Object System.Drawing.Bitmap($imgPath)

Write-Output "--- Horizontal Scan at y=530 (Head/Face) ---"
for ($x = 250; $x -le 550; $x += 25) {
    $c = $bmp.GetPixel($x, 530)
    Write-Output "x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

Write-Output "--- Horizontal Scan at y=800 (Gown Flare) ---"
for ($x = 150; $x -le 650; $x += 40) {
    $c = $bmp.GetPixel($x, 800)
    Write-Output "x=$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}
$bmp.Dispose()
