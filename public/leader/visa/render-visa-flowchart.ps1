Add-Type -AssemblyName System.Drawing
function U($text) { return ('"' + $text + '"' | ConvertFrom-Json) }

$width = 1600
$height = 1180
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$bmp.SetResolution(144, 144)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::FromArgb(248, 250, 252))

$fontTitle = New-Object System.Drawing.Font('Microsoft YaHei UI', 34, [System.Drawing.FontStyle]::Bold)
$fontNode = New-Object System.Drawing.Font('Microsoft YaHei UI', 22, [System.Drawing.FontStyle]::Bold)
$fontEdge = New-Object System.Drawing.Font('Microsoft YaHei UI', 17, [System.Drawing.FontStyle]::Regular)
$fontNote = New-Object System.Drawing.Font('Microsoft YaHei UI', 17, [System.Drawing.FontStyle]::Regular)
$ink = [System.Drawing.Color]::FromArgb(27, 43, 59)
$muted = [System.Drawing.Color]::FromArgb(86, 103, 120)

function RoundedPath($x, $y, $w, $h, $r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function DrawNode($x, $y, $w, $h, $text, $fill, $stroke) {
  $path = RoundedPath $x $y $w $h 22
  $brush = New-Object System.Drawing.SolidBrush($fill)
  $pen = New-Object System.Drawing.Pen($stroke, 3)
  $g.FillPath($brush, $path)
  $g.DrawPath($pen, $path)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($text, $fontNode, (New-Object System.Drawing.SolidBrush($ink)), (New-Object System.Drawing.RectangleF($x, $y, $w, $h)), $format)
  $brush.Dispose(); $pen.Dispose(); $path.Dispose(); $format.Dispose()
}

function DrawArrow($x1, $y1, $x2, $y2, $label = '', $dashed = $false) {
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 91, 111), 3)
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor
  if ($dashed) { $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash }
  $g.DrawLine($pen, $x1, $y1, $x2, $y2)
  if ($label -ne '') {
    $size = $g.MeasureString($label, $fontEdge)
    $mx = ($x1 + $x2) / 2 - $size.Width / 2
    $my = ($y1 + $y2) / 2 - $size.Height - 7
    $back = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(248, 250, 252))
    $g.FillRectangle($back, $mx - 8, $my, $size.Width + 16, $size.Height)
    $g.DrawString($label, $fontEdge, (New-Object System.Drawing.SolidBrush($muted)), $mx, $my)
    $back.Dispose()
  }
  $pen.Dispose()
}

function DrawDashedSegment($x1, $y1, $x2, $y2) {
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 91, 111), 3)
  $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
  $g.DrawLine($pen, $x1, $y1, $x2, $y2)
  $pen.Dispose()
}

$titleFormat = New-Object System.Drawing.StringFormat
$titleFormat.Alignment = [System.Drawing.StringAlignment]::Center
$g.DrawString((U '\u7b7e\u8bc1\u72b6\u6001\u6d41\u8f6c\u6d41\u7a0b'), $fontTitle, (New-Object System.Drawing.SolidBrush($ink)), (New-Object System.Drawing.RectangleF(0, 38, $width, 70)), $titleFormat)

$blueFill = [System.Drawing.Color]::FromArgb(234, 241, 255)
$blueStroke = [System.Drawing.Color]::FromArgb(38, 120, 255)
$yellowFill = [System.Drawing.Color]::FromArgb(255, 245, 215)
$yellowStroke = [System.Drawing.Color]::FromArgb(196, 154, 44)
$greenFill = [System.Drawing.Color]::FromArgb(233, 248, 241)
$greenStroke = [System.Drawing.Color]::FromArgb(32, 166, 106)
$redFill = [System.Drawing.Color]::FromArgb(253, 236, 239)
$redStroke = [System.Drawing.Color]::FromArgb(200, 63, 73)
$grayFill = [System.Drawing.Color]::FromArgb(246, 234, 234)
$grayStroke = [System.Drawing.Color]::FromArgb(164, 84, 84)

DrawNode 570 135 460 92 (U '\u7528\u6237\u9996\u6b21\u63d0\u4ea4\u7b7e\u8bc1') $blueFill $blueStroke
DrawNode 570 290 460 92 (U '\u5f85\u5ba1\u6838') $yellowFill $yellowStroke
DrawNode 570 445 460 92 (U '\u540e\u53f0\u5de5\u4f5c\u4eba\u5458\u5ba1\u6838') $blueFill $blueStroke
DrawNode 220 625 400 92 (U '\u6709\u6548') $greenFill $greenStroke
DrawNode 980 625 400 92 (U '\u5df2\u9a73\u56de') $redFill $redStroke
DrawNode 220 805 400 92 (U '\u5df2\u8fc7\u671f') $grayFill $grayStroke
DrawNode 500 965 600 92 (U '\u4efb\u610f\u72b6\u6001\uff1a\u7528\u6237\u91cd\u65b0\u521b\u5efa') $blueFill $blueStroke

DrawArrow 800 227 800 290
DrawArrow 800 382 800 445
DrawArrow 650 537 420 625 (U '\u5ba1\u6838\u901a\u8fc7')
DrawArrow 950 537 1180 625 (U '\u5ba1\u6838\u4e0d\u901a\u8fc7')
DrawArrow 420 717 420 805 (U '\u8d85\u8fc7\u6709\u6548\u671f')

DrawDashedSegment 1100 1011 1400 1011
DrawDashedSegment 1400 1011 1400 336
DrawArrow 1400 336 1030 336 (U '\u8986\u76d6\u539f\u4fe1\u606f\u5e76\u56de\u5230\u5f85\u5ba1\u6838') $true

$note = U '\u5168\u5c40\u89c4\u5219\uff1a\u4efb\u4f55\u72b6\u6001\u4e0b\u91cd\u65b0\u521b\u5efa\u7b7e\u8bc1\uff0c\u90fd\u4f1a\u8986\u76d6\u539f\u4fe1\u606f\u5e76\u53d8\u66f4\u4e3a\u201c\u5f85\u5ba1\u6838\u201d\u3002'
$noteBrush = New-Object System.Drawing.SolidBrush($muted)
$g.DrawString($note, $fontNote, $noteBrush, 330, 1100)

$output = Join-Path $env:TEMP 'visa-status-flowchart.jpg'
$bmp.Save($output, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$noteBrush.Dispose(); $titleFormat.Dispose(); $fontTitle.Dispose(); $fontNode.Dispose(); $fontEdge.Dispose(); $fontNote.Dispose(); $g.Dispose(); $bmp.Dispose()
Write-Output $output
