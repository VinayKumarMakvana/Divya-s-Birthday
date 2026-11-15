Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\VINAY\OneDrive\Desktop\divya's\reference\divya-10-screen-reference.png"
$img = [System.Drawing.Image]::FromFile($srcPath)

# 10 phones in divya-10-screen-reference.png:
# Row 1 (top):
# Phone 1: X=16,  Y=60, W=158, H=318
# Phone 2: X=198, Y=60, W=158, H=318
# Phone 3: X=380, Y=60, W=158, H=318
# Phone 4: X=562, Y=60, W=158, H=318
# Phone 5: X=744, Y=60, W=158, H=318

# Row 2 (bottom):
# Phone 6: X=16,  Y=552, W=158, H=318
# Phone 7: X=198, Y=552, W=158, H=318
# Phone 8: X=380, Y=552, W=158, H=318
# Phone 9: X=562, Y=552, W=158, H=318
# Phone 10: X=744, Y=552, W=158, H=318

$screens = @(
    @{ Id = "01"; Name = "scene-01-entrance.jpg"; X = 16;  Y = 60;  W = 158; H = 318 },
    @{ Id = "02"; Name = "scene-02-music.jpg";    X = 198; Y = 60;  W = 158; H = 318 },
    @{ Id = "03"; Name = "scene-03-letter.jpg";   X = 380; Y = 60;  W = 158; H = 318 },
    @{ Id = "04"; Name = "scene-04-open.jpg";     X = 562; Y = 60;  W = 158; H = 318 },
    @{ Id = "05"; Name = "scene-05-memories.jpg"; X = 744; Y = 60;  W = 158; H = 318 },
    @{ Id = "06"; Name = "scene-06-cake.jpg";     X = 16;  Y = 552; W = 158; H = 318 },
    @{ Id = "07"; Name = "scene-07-celebrate.jpg";X = 198; Y = 552; W = 158; H = 318 },
    @{ Id = "08"; Name = "scene-08-special.jpg";  X = 380; Y = 552; W = 158; H = 318 },
    @{ Id = "09"; Name = "scene-09-wishes.jpg";   X = 562; Y = 552; W = 158; H = 318 },
    @{ Id = "10"; Name = "scene-10-finale.jpg";   X = 744; Y = 552; W = 158; H = 318 }
)

$targetW = 640
$targetH = 1288 # approx 158:318 ratio (1:2.01, standard modern smartphone)

$outDir = "c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\scenes"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

foreach ($s in $screens) {
    $srcRect = New-Object System.Drawing.Rectangle($s.X, $s.Y, $s.W, $s.H)
    $destBmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $destPath = Join-Path $outDir $s.Name
    $destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $destBmp.Dispose()
    Write-Host "Exported $($s.Name) ($targetW x $targetH)"
}

$img.Dispose()
Write-Host "All 10 scene backdrops successfully generated!"

