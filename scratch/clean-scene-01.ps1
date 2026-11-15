Add-Type -AssemblyName System.Drawing

$src = "c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\scenes\scene-01-entrance.jpg"
$bmp = New-Object System.Drawing.Bitmap($src)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Center region is roughly X: 100 to 540, Y: 200 to 1100 (width 640, height 1288)
# We fill the center of the archway with a smooth rich radial gradient brush!
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$rect = New-Object System.Drawing.Rectangle(75, 140, 490, 1050)
$path.AddEllipse($rect)

$pbr = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
$pbr.CenterColor = [System.Drawing.Color]::FromArgb(240, 42, 14, 68) # Deep glowing purple
$pbr.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 42, 14, 68)) # Fade to transparent at borders

$g.FillEllipse($pbr, $rect)

$pbr.Dispose()
$path.Dispose()
$g.Dispose()

$out = "c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\scenes\scene-01-clean.jpg"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Host "Created scene-01-clean.jpg"

