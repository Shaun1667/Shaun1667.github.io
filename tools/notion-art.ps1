# Notion 페이지에 쓰는 도트 그림을 만든다 (몇 번 실행해도 같은 결과로 덮어씀).
#   실행: powershell -ExecutionPolicy Bypass -File tools/notion-art.ps1
#   결과: notion/*.png  →  GitHub Pages에 올리면 https://shaun1667.github.io/notion/… 로 Notion이 불러온다.
# 낮은 해상도에 정수 좌표로만 그린 뒤 최근접 방식으로 정수배 확대해서 도트를 유지한다.
# 영문 · 숫자 = 아래 5×7 도트 글꼴, 한글 = 굴림 1비트(안티앨리어싱 없음).
# 게임 목록(id · 제목 · 색 · 표지)은 data/games.js에서 읽는다 → 새 게임을 넣고 다시 실행하면 카드가 생긴다.

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
$Out  = Join-Path $Root "notion"
New-Item -ItemType Directory -Force $Out | Out-Null

function C([string]$hex) { [Drawing.ColorTranslator]::FromHtml($hex) }
function Mix($a, $b, [double]$t) {
  [Drawing.Color]::FromArgb(255, [int]($a.R + ($b.R - $a.R) * $t), [int]($a.G + ($b.G - $a.G) * $t), [int]($a.B + ($b.B - $a.B) * $t))
}
$BG = C "#0d0b1a"; $BG2 = C "#17142b"; $PANEL = C "#1c1934"; $INK = C "#05040b"; $LINE = C "#3a3463"
$TEXT = C "#f2efff"; $MUTED = C "#9a93c2"; $MINT = C "#7cf2c8"; $RED = C "#ff5d73"
$YEL = C "#ffd23f"; $YEL_D = C "#c99a12"; $YEL_L = C "#fff0a8"; $NONE = [Drawing.Color]::Transparent

# ── 5×7 도트 글꼴 ('>' = ▶, '~' = ▼) ──
$Glyphs = @{
  'A'='.###.|#...#|#...#|#####|#...#|#...#|#...#'; 'B'='####.|#...#|#...#|####.|#...#|#...#|####.'
  'C'='.###.|#...#|#....|#....|#....|#...#|.###.'; 'D'='####.|#...#|#...#|#...#|#...#|#...#|####.'
  'E'='#####|#....|#....|####.|#....|#....|#####'; 'F'='#####|#....|#....|####.|#....|#....|#....'
  'G'='.###.|#...#|#....|#.###|#...#|#...#|.####'; 'H'='#...#|#...#|#...#|#####|#...#|#...#|#...#'
  'I'='.###.|..#..|..#..|..#..|..#..|..#..|.###.'; 'J'='..###|...#.|...#.|...#.|...#.|#..#.|.##..'
  'K'='#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#'; 'L'='#....|#....|#....|#....|#....|#....|#####'
  'M'='#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#'; 'N'='#...#|#...#|##..#|#.#.#|#..##|#...#|#...#'
  'O'='.###.|#...#|#...#|#...#|#...#|#...#|.###.'; 'P'='####.|#...#|#...#|####.|#....|#....|#....'
  'Q'='.###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#'; 'R'='####.|#...#|#...#|####.|#.#..|#..#.|#...#'
  'S'='.####|#....|#....|.###.|....#|....#|####.'; 'T'='#####|..#..|..#..|..#..|..#..|..#..|..#..'
  'U'='#...#|#...#|#...#|#...#|#...#|#...#|.###.'; 'V'='#...#|#...#|#...#|#...#|#...#|.#.#.|..#..'
  'W'='#...#|#...#|#...#|#.#.#|#.#.#|#.#.#|.#.#.'; 'X'='#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#'
  'Y'='#...#|#...#|.#.#.|..#..|..#..|..#..|..#..'; 'Z'='#####|....#|...#.|..#..|.#...|#....|#####'
  '0'='.###.|#...#|#..##|#.#.#|##..#|#...#|.###.'; '1'='..#..|.##..|..#..|..#..|..#..|..#..|.###.'
  '2'='.###.|#...#|....#|...#.|..#..|.#...|#####'; '3'='####.|....#|....#|.###.|....#|....#|####.'
  '4'='...#.|..##.|.#.#.|#..#.|#####|...#.|...#.'; '5'='#####|#....|####.|....#|....#|#...#|.###.'
  '6'='.###.|#....|#....|####.|#...#|#...#|.###.'; '7'='#####|....#|...#.|..#..|.#...|.#...|.#...'
  '8'='.###.|#...#|#...#|.###.|#...#|#...#|.###.'; '9'='.###.|#...#|#...#|.####|....#|....#|.###.'
  '.'='.....|.....|.....|.....|.....|.....|..#..'; '/'='....#|....#|...#.|..#..|.#...|#....|#....'
  ':'='.....|..#..|..#..|.....|..#..|..#..|.....'; '-'='.....|.....|.....|#####|.....|.....|.....'
  '!'='..#..|..#..|..#..|..#..|..#..|.....|..#..'; '>'='#....|##...|###..|####.|###..|##...|#....'
  '~'='#####|.###.|..#..|.....|.....|.....|.....'; '&'='.##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#'
}

function Rect($g, [int]$x, [int]$y, [int]$w, [int]$h, $color) {
  $b = New-Object Drawing.SolidBrush $color; $g.FillRectangle($b, $x, $y, $w, $h); $b.Dispose()
}
function PixWidth([string]$s, [int]$sc = 1) { $s.Length * 6 * $sc - $sc }
function PixText($g, [string]$s, [int]$x, [int]$y, $color, [int]$sc = 1) {
  $b = New-Object Drawing.SolidBrush $color
  $cx = $x
  foreach ($ch in $s.ToUpper().ToCharArray()) {
    $key = [string]$ch
    if ($Glyphs.ContainsKey($key)) {
      $rows = $Glyphs[$key].Split('|')
      for ($r = 0; $r -lt 7; $r++) { for ($c = 0; $c -lt 5; $c++) {
        if ($rows[$r][$c] -eq '#') { $g.FillRectangle($b, $cx + $c * $sc, $y + $r * $sc, $sc, $sc) }
      } }
    }
    $cx += 6 * $sc
  }
  $b.Dispose()
}
function PixShadow($g, [string]$s, [int]$x, [int]$y, $color, [int]$sc = 1) {
  PixText $g $s ($x + 1) ($y + 1) $INK $sc; PixText $g $s $x $y $color $sc
}

$KoFmt = [Drawing.StringFormat]::GenericTypographic
# 폭은 실제로 그려 보고 칠해진 마지막 열로 잰다 (MeasureString은 1비트 렌더와 폭이 달라서)
function KoWidth([string]$s, [int]$px = 12) {
  $bmp = New-Object Drawing.Bitmap 600, ($px * 2)
  $g = [Drawing.Graphics]::FromImage($bmp); $g.Clear([Drawing.Color]::Black)
  KoText $g $s 0 0 ([Drawing.Color]::White) $px
  $g.Dispose()
  $last = 0
  for ($x = 0; $x -lt $bmp.Width; $x++) { for ($y = 0; $y -lt $bmp.Height; $y++) {
    if ($bmp.GetPixel($x, $y).R -gt 0) { $last = $x + 1; break }
  } }
  $bmp.Dispose(); $last
}
function KoText($g, [string]$s, [int]$x, [int]$y, $color, [int]$px = 12) {
  $f = New-Object Drawing.Font("Gulim", [single]$px, [Drawing.GraphicsUnit]::Pixel)
  $b = New-Object Drawing.SolidBrush $color
  $g.TextRenderingHint = [Drawing.Text.TextRenderingHint]::SingleBitPerPixelGridFit
  $g.DrawString($s, $f, $b, [single]$x, [single]$y, $KoFmt)
  $f.Dispose(); $b.Dispose()
}

function New-Canvas([int]$w, [int]$h, $fill) {
  $bmp = New-Object Drawing.Bitmap $w, $h
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::None
  $g.Clear($fill)
  @{ B = $bmp; G = $g }
}
function Save-Scaled($cv, [int]$s, [string]$name, [switch]$Scan) {
  $src = $cv.B; $w = $src.Width * $s; $h = $src.Height * $s
  $dst = New-Object Drawing.Bitmap $w, $h
  $g = [Drawing.Graphics]::FromImage($dst)
  $g.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $g.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::Half
  $g.DrawImage($src, (New-Object Drawing.Rectangle 0, 0, $w, $h), 0, 0, $src.Width, $src.Height, [Drawing.GraphicsUnit]::Pixel)
  if ($Scan) {   # 주사선: 도트 한 줄마다 아래 1px을 살짝 어둡게
    $b = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(46, 0, 0, 0))
    for ($y = $s - 1; $y -lt $h; $y += $s) { $g.FillRectangle($b, 0, $y, $w, 1) }
    $b.Dispose()
  }
  $g.Dispose(); $cv.G.Dispose(); $src.Dispose()
  $p = Join-Path $Out $name
  $dst.Save($p, [Drawing.Imaging.ImageFormat]::Png); $dst.Dispose()
  "{0} {1}x{2} {3}KB" -f $name, $w, $h, [int]((Get-Item $p).Length / 1KB)
}

# 실제 표지를 작게 줄이고 색 수를 줄여 도트 그림처럼 만든다
function Q([int]$v) { [Math]::Min(255, [int]([Math]::Round($v / 36.0) * 36)) }
function Pixelate([string]$path, [int]$w, [int]$h) {
  $img = [Drawing.Image]::FromFile($path)
  $ar = $w / $h; $sw = $img.Width; $sh = [int]($sw / $ar)
  if ($sh -gt $img.Height) { $sh = $img.Height; $sw = [int]($sh * $ar) }
  $sx = [int](($img.Width - $sw) / 2); $sy = [int](($img.Height - $sh) / 2)
  $bmp = New-Object Drawing.Bitmap $w, $h
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [Drawing.Drawing2D.PixelOffsetMode]::Half
  $g.DrawImage($img, (New-Object Drawing.Rectangle 0, 0, $w, $h), $sx, $sy, $sw, $sh, [Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $img.Dispose()
  for ($y = 0; $y -lt $h; $y++) { for ($x = 0; $x -lt $w; $x++) {
    $c = $bmp.GetPixel($x, $y); $bmp.SetPixel($x, $y, [Drawing.Color]::FromArgb(255, (Q $c.R), (Q $c.G), (Q $c.B)))
  } }
  $bmp
}
function Checker($g, [int]$x, [int]$y, [int]$w, [int]$h, $base, $tint, [int]$cell) {
  Rect $g $x $y $w $h $base
  $alt = Mix $base $tint 0.22
  for ($yy = 0; $yy -lt $h; $yy += $cell) { for ($xx = 0; $xx -lt $w; $xx += $cell) {
    if ((($xx / $cell) + ($yy / $cell)) % 2 -eq 0) { Rect $g ($x + $xx) ($y + $yy) ([Math]::Min($cell, $w - $xx)) ([Math]::Min($cell, $h - $yy)) $alt }
  } }
}

# ── 게임 목록 ──
$js = Get-Content (Join-Path $Root "data/games.js") -Raw -Encoding UTF8
$games = @([regex]::Matches($js, 'id:\s*"([^"]+)"[^\n]*\n\s*title:\s*"([^"]+)"[\s\S]*?theme:\s*"([^"]+)"[\s\S]*?cover:\s*"([^"]*)"') | ForEach-Object {
  [pscustomobject]@{ Id = $_.Groups[1].Value; Title = $_.Groups[2].Value; Theme = (C $_.Groups[3].Value); Cover = $_.Groups[4].Value }
})
"games: $($games.Count)"

# ── 1. 표지 (375×75 → ×4 = 1500×300). Notion 표지는 위아래가 잘리므로 내용은 가운데 띠에 ──
$cv = New-Canvas 375 75 $BG; $g = $cv.G
for ($y = 4; $y -lt 75; $y += 8) { for ($x = 4; $x -lt 375; $x += 8) { Rect $g $x $y 1 1 $LINE } }
foreach ($p in @(@(40,9),@(118,62),@(150,18),@(214,8),@(300,64),@(352,14),@(96,40),@(256,58))) { Rect $g $p[0] $p[1] 1 1 $TEXT }
foreach ($p in @(@(70,64),@(190,12),@(330,40))) { Rect $g $p[0] $p[1] 1 1 $MINT }
PixShadow $g "GAME" 16 13 $TEXT 2
PixShadow $g "SELECT" (16 + 5 * 12) 13 $MINT 2
KoText $g "Unity 게임 클라이언트 개발자" 16 33 $MUTED 11
PixShadow $g ">PRESS START" 16 50 $YEL 1
$n = [Math]::Min(10, $games.Count); $sw = 16; $gap = 3
$x0 = 375 - 12 - ($n * $sw + ($n - 1) * $gap)
Rect $g ($x0 - 4) 53 ($n * $sw + ($n - 1) * $gap + 8) 1 $LINE
for ($i = 0; $i -lt $n; $i++) {
  $gm = $games[$i]; $x = $x0 + $i * ($sw + $gap); $act = ($i -eq 0); $y = $(if ($act) { 26 } else { 29 })
  Rect $g ($x + 1) ($y + 1) $sw 22 $INK
  Rect $g $x $y $sw 22 $INK
  Rect $g ($x + 1) ($y + 1) ($sw - 2) 20 $(if ($act) { $gm.Theme } else { $LINE })
  if ($gm.Cover -and (Test-Path (Join-Path $Root $gm.Cover))) {
    $px = Pixelate (Join-Path $Root $gm.Cover) 12 12; $g.DrawImageUnscaled($px, $x + 2, $y + 2); $px.Dispose()
  } else { Checker $g ($x + 2) ($y + 2) 12 12 $BG2 $gm.Theme 2 }
  if (-not $act) { $veil = New-Object Drawing.SolidBrush ([Drawing.Color]::FromArgb(90, 13, 11, 26)); $g.FillRectangle($veil, $x + 2, $y + 2, 12, 12); $veil.Dispose() }
  Rect $g ($x + 2) ($y + 15) 12 5 $BG2
  Rect $g ($x + 3) ($y + 17) 10 1 $gm.Theme
}
PixText $g "~" ($x0 + 5) 17 $YEL 1
Save-Scaled $cv 4 "cover.png" -Scan

# ── 2. 시작 버튼 (375×36 → 1500×144, 바탕 투명) ──
$cv = New-Canvas 375 36 $NONE; $g = $cv.G
Rect $g 4 4 369 29 $INK
Rect $g 1 1 369 29 $INK
Rect $g 2 2 367 27 $YEL
Rect $g 2 2 367 1 $YEL_L
Rect $g 2 26 367 3 $YEL_D
PixText $g ">" 12 9 $INK 2
PixText $g "PRESS START" 30 9 $INK 2
Rect $g 172 7 1 17 $YEL_D
KoText $g "포트폴리오 사이트 열기" 184 4 $INK 12
PixText $g "SHAUN1667.GITHUB.IO" 184 17 $INK 1
Rect $g 338 8 24 15 $INK
PixText $g ">" 348 12 $YEL 1
Save-Scaled $cv 4 "start.png"

# ── 3. 섹션 제목 (375×18 → 1500×72, 바탕 투명) ──
$banners = @(
  @("player",   "PLAYER",      "프로필"),
  @("games",    "SELECT GAME", "대표 프로젝트"),
  @("career",   "CAREER",      "학력 · 경력"),
  @("skills",   "SKILLS",      "기술"),
  @("save",     "SAVE DATA",   "프로젝트 기록"),
  @("quest",    "QUEST LOG",   "활동 · 학습 기록")
)
foreach ($bn in $banners) {
  $cv = New-Canvas 375 18 $NONE; $g = $cv.G
  $lw = (PixWidth $bn[1]) + 14
  Rect $g 2 4 $lw 13 $INK
  Rect $g 0 2 $lw 13 $INK
  Rect $g 1 3 ($lw - 2) 11 $MINT
  PixText $g ">" 4 5 $INK 1
  PixText $g $bn[1] 11 5 $INK 1
  $kx = $lw + 8; KoText $g $bn[2] $kx 4 $MUTED 12
  $lx = $kx + (KoWidth $bn[2] 12) + 8
  for ($x = $lx; $x -lt 372; $x += 5) { Rect $g $x 9 3 1 $LINE }
  Save-Scaled $cv 4 ("banner_" + $bn[0] + ".png")
}

# ── 4. 플레이어 아이콘 (40×40 → ×8 = 320×320, 바탕 투명) ──
$cv = New-Canvas 40 40 $NONE; $g = $cv.G
Rect $g 3 3 36 36 $INK
Rect $g 1 1 36 36 $INK
Rect $g 2 2 34 34 $MINT
PixText $g "P1" 8 6 $INK 2
Rect $g 7 22 26 11 $INK
Rect $g 8 23 24 9 $PANEL
Rect $g 11 27 5 1 $TEXT; Rect $g 13 25 1 5 $TEXT
Rect $g 24 25 2 2 $YEL; Rect $g 28 28 2 2 $RED
Save-Scaled $cv 8 "avatar.png"

# ── 5. 게임 카드 (80×45 → ×4 = 320×180) ──
for ($i = 0; $i -lt $games.Count; $i++) {
  $gm = $games[$i]
  $cv = New-Canvas 80 45 $INK; $g = $cv.G
  Rect $g 1 1 78 43 $gm.Theme
  if ($gm.Cover -and (Test-Path (Join-Path $Root $gm.Cover))) {
    $px = Pixelate (Join-Path $Root $gm.Cover) 76 41; $g.DrawImageUnscaled($px, 2, 2); $px.Dispose()
  } else {
    Checker $g 2 2 76 41 $BG2 $gm.Theme 4
    $light = Mix $gm.Theme $TEXT 0.35
    if ($gm.Title -match '^[\x20-\x7E]+$') {          # 영문 제목 = 도트 글꼴 (11글자까지 한 줄)
      $tw = PixWidth $gm.Title 1; $tx = [int]((80 - $tw) / 2)
      PixShadow $g $gm.Title $tx 20 $light 1
    } else {                                          # 한글 제목 = 굴림 12px
      $tw = KoWidth $gm.Title 12; $tx = [int]((80 - $tw) / 2)
      KoText $g $gm.Title ($tx + 1) 18 $INK 12
      KoText $g $gm.Title $tx 17 $light 12
    }
  }
  $num = "{0:D2}" -f ($i + 1)
  Rect $g 2 2 15 11 $INK
  PixText $g $num 4 4 $gm.Theme 1
  Save-Scaled $cv 4 ("card_" + $gm.Id + ".png")
}
