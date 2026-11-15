Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\VINAY\OneDrive\Desktop\divya's\reference\divya-10-screen-reference.png"
$img = [System.Drawing.Image]::FromFile($srcPath)

# Phone 1 is roughly at X: 8 to 184, Y: 12 to 395.
# Inside Phone 1:
# The Safari address bar ends around Y: 56.
# The bottom bar / home bar ends around Y: 380.
# So the web content is from Y: 58 to 376 (height ~ 318).
# Width of the screen inside bezel is from X: 16 to 176 (width ~ 160).

Write-Host "Image size: $($img.Width) x $($img.Height)"

# Let's write a small crop test for Phone 1 web content only (without browser chrome):
$rect = New-Object System.Drawing.Rectangle(16, 56, 160, 320)
$crop = New-Object System.Drawing.Bitmap(160, 320)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, 160, 320)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$crop.Save("c:\Users\VINAY\OneDrive\Desktop\divya's\public\images\test-crop-01.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$crop.Dispose()
$img.Dispose()

Write-Host "Saved test-crop-01.jpg"

