Add-Type -AssemblyName System.Drawing
$imgPath = 'C:\Users\VINAY\.gemini\antigravity\brain\089d78bd-4a9c-4995-9ac1-459e57c850cf\.user_uploaded\media_1794755392848_f1d7a3bc.jpg'
$bmp = New-Object System.Drawing.Bitmap($imgPath)
Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# Scan y from 350 to 1020
for ($y = 350; $y -lt 1024; $y += 25) {
    $c = $bmp.GetPixel(384, $y)
    Write-Output "y=$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}
$bmp.Dispose()
