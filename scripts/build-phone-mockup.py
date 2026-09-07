#!/usr/bin/env python3
"""Composite an iPhone screen recording into the mockup chassis.

The mockup PNG ships with a glossy white glare gradient painted over the screen
(alpha ramping 1 -> 235 top to bottom). Compositing under it would wash the video
out, so this keeps only the chassis and punches the screen out completely.

    python3 scripts/build-phone-mockup.py \
        "~/Desktop/Apple iPhone 15 Pro Black Titanium 1.png" \
        ~/Desktop/slab-packs.MP4 \
        public/work/slab-packs

Writes hover.mp4 (720px wide) and poster.webp next to each other.
"""
import subprocess, sys, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

OUT_W = 720          # ~1.67x the 430px on-screen slot
CRF = "28"
POSTER_AT = "6"      # seconds into the clip


def build_frame(mockup: Path, tmp: Path):
    im = Image.open(mockup).convert("RGBA")
    W, H = im.size
    px = im.load()

    # The chassis is dark; the glare is pure white at every alpha, so colour
    # separates them even where their alphas overlap.
    mask = Image.new("L", (W, H), 0)
    mp = mask.load()
    for y in range(H):
        for x in range(W):
            r, g, b, a = px[x, y]
            if a > 25 and max(r, g, b) < 200:
                mp[x, y] = 255

    # Flood the screen from the CENTRE. Flooding the outside instead leaks: the
    # chassis touches the canvas edge and seals pockets at the rounded corners.
    ImageDraw.floodfill(mask, (W // 2, H // 2), 64, thresh=0)

    screen = Image.new("L", (W, H), 0)
    sp = screen.load()
    for y in range(H):
        for x in range(W):
            if mp[x, y] == 64:
                sp[x, y] = 255

    frame = im.copy()
    fp = frame.load()
    for y in range(H):
        for x in range(W):
            if sp[x, y]:
                fp[x, y] = (0, 0, 0, 0)
    frame.save(tmp / "frame.png")

    # Grow the screen 3px so the chassis' anti-aliased inner rim blends over the
    # video, not over the page. Filling the mask's bounding box instead would
    # spill past the device's own rounded corner.
    matte = screen.filter(ImageFilter.MaxFilter(7))
    x0, y0, x1, y1 = matte.getbbox()
    matte.crop((x0, y0, x1, y1)).save(tmp / "matte.png")
    return W, H, x0, y0, x1 - x0, y1 - y0


def main():
    mockup, video, outdir = (Path(a).expanduser() for a in sys.argv[1:4])
    outdir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        W, H, ox, oy, mw, mh = build_frame(mockup, tmp)
        out_h = round(H * OUT_W / W / 2) * 2
        print(f"canvas {W}x{H}  screen {mw}x{mh} @ {ox},{oy}  -> {OUT_W}x{out_h}")
        hover = outdir / "hover.mp4"
        subprocess.run([
            "ffmpeg", "-y", "-v", "error", "-stats",
            "-i", str(video), "-i", str(tmp / "matte.png"), "-i", str(tmp / "frame.png"),
            "-filter_complex",
            # scale to COVER the matte preserving aspect, then crop — never stretch
            f"[0:v]scale={mw}:-2,crop={mw}:{mh},fps=30,setsar=1,format=rgba[v];"
            f"[1:v]format=gray[m];[v][m]alphamerge[va];"
            f"color=c=white:s={W}x{H}:r=30,format=rgba[bg];"
            f"[bg][va]overlay={ox}:{oy}:shortest=1[s1];"
            f"[s1][2:v]overlay=0:0,scale={OUT_W}:{out_h}:flags=lanczos,format=yuv420p[o]",
            "-map", "[o]", "-an", "-c:v", "libx264", "-crf", CRF,
            "-preset", "slow", "-movflags", "+faststart", str(hover),
        ], check=True)

        still = tmp / "poster.png"
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", POSTER_AT,
                        "-i", str(hover), "-frames:v", "1", str(still)], check=True)
        # ffmpeg here has no webp encoder; PIL does.
        Image.open(still).convert("RGB").save(
            outdir / "poster.webp", "WEBP", quality=80, method=6)
    print(f"{hover} {hover.stat().st_size / 1e6:.2f} MB")


if __name__ == "__main__":
    main()
