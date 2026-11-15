Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\VINAY\OneDrive\Desktop\divya's\reference\divya-10-screen-reference.png"
$img = [System.Drawing.Image]::FromFile($srcPath)

Write-Host "Source image: $($img.Width) x $($img.Height)"

# The image has 2 rows of 5 phones each.
# Let's inspect the phone dimensions and spacing.
# Top row: y ~ 10 to 490
# Bottom row: y ~ 500 to 980
# Columns: 5 phones across width 924.
# Approximate width per phone: ~170px, height: ~370px.

# Phone screen content (inside the bezel):
# Let's define the screen crops (x, y, width, height) for each of the 10 phones:
# Top row:
# Screen 1: x: 10, y: 15, w: 172, h: 375
# Screen 2: x: 192, y: 15, w: 172, h: 375
# Screen 3: x: 374, y: 15, w: 172, h: 375
# Screen 4: x: 556, y: 15, w: 172, h: 375
# Screen 5: x: 738, y: 15, w: 172, h: 375

# Bottom row:
# Screen 6: x: 10, y: 505, w: 172, h: 375
# Screen 7: x: 192, y: 505, w: 172, h: 375
# Screen 8: x: 374, y: 505, w: 172, h: 375
# Screen 9: x: 556, y: 505, w: 172, h: 375
# Screen 10: x: 738, y: 505, w: 172, h: 375

$rects = @(
    @{ Name = "screen-bg-01.jpg"; X = 10;  Y = 16;  W = 172; H = 374 },
    @{ Name = "screen-bg-02.jpg"; X = 192; Y = 16;  W = 172; H = 374 },
    @{ Name = "screen-bg-03.jpg"; X = 375; Y = 16;  W = 172; H = 374 },
    @{ Name = "screen-bg-04.jpg"; X = 557; Y = 16;  W = 172; H = 374 },
    @{ Name = "screen-bg-05.jpg"; X = 739; Y = 16;  W = 172; H = 374 },
    @{ Name = "screen-bg-06.jpg"; X = 10;  Y = 508; W = 172; H = 374 },
    @{ Name = "screen-bg-07.jpg"; X = 192; Y = 508; W = 172; H = 374 },
    @{ Name = "screen-bg-08.jpg"; X = 375; Y = 508; W = 172; H = 374 },
    @{ Name = "screen-bg-09.jpg"; X = 557; Y = 508; W = 172; H = 374 },
    @{ Name = "screen-bg-10.jpg"; X = 739; Y = 508; W = 172; H = 374 }
)

$outDir = "c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\screens"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

foreach ($r in $rects) {
    $cropRect = New-Object System.Drawing.Rectangle($r.X, $r.Y, $r.W, $r.H)
    $cropped = New-Object System.Drawing.Bitmap($r.W, $r.H)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $r.W, $r.H)
    $g.DrawImage($img, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $outPath = Join-Path $outDir $r.Name
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved $($r.Name)"
}

$img.Dispose()
Write-Host "All 10 screen backgrounds extracted!"

