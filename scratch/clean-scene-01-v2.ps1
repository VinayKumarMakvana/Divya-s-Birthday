Add-Type -AssemblyName System.Drawing

$src = "c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\scenes\scene-01-entrance.jpg"
$bmp = New-Object System.Drawing.Bitmap($src)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Inside the arch is an arched rectangle:
# Top is an arc from (110, 160) to (530, 160)
# Height is from 160 to 1100
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc(115, 150, 410, 360, 180, 180) # top rounded arch
$path.AddLine(525, 330, 525, 1120)
$path.AddLine(525, 1120, 115, 1120)
$path.AddLine(115, 1120, 115, 330)
$path.CloseFigure()

# Linear gradient from top deep purple to bottom glowing violet:
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 150)),
    (New-Object System.Drawing.Point(0, 1120)),
    [System.Drawing.Color]::FromArgb(250, 56, 19, 78), # top deep twilight purple
    [System.Drawing.Color]::FromArgb(245, 102, 38, 112) # bottom rosy violet
)

# Soft feathering blend factors
$blend = New-Object System.Drawing.Drawing2D.ColorBlend(4)
$blend.Colors = @(
    [System.Drawing.Color]::FromArgb(250, 48, 16, 68),
    [System.Drawing.Color]::FromArgb(255, 68, 24, 92),
    [System.Drawing.Color]::FromArgb(255, 96, 36, 110),
    [System.Drawing.Color]::FromArgb(250, 128, 48, 126)
)
$blend.Positions = @(0.0, 0.35, 0.7, 1.0)
$brush.InterpolationColors = $blend

$g.FillPath($brush, $path)

# Subtle glowing center highlight (bokeh glow inside the arch)
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowRect = New-Object System.Drawing.Rectangle(150, 300, 340, 500)
$glowPath.AddEllipse($glowRect)
$pbr = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$pbr.CenterColor = [System.Drawing.Color]::FromArgb(90, 244, 114, 182) # soft pink glow
$pbr.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 244, 114, 182))
$g.FillEllipse($pbr, $glowRect)

$pbr.Dispose()
$glowPath.Dispose()
$brush.Dispose()
$path.Dispose()
$g.Dispose()

$out = "c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\scenes\scene-01-clean.jpg"
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Host "Created beautiful seamless scene-01-clean.jpg"

