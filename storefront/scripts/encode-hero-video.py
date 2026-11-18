"""Cut the brand video for the homepage hero: a full-frame 16:9 desktop version and a 9:16 phone version
reframed shot by shot, each as H.264 MP4 and VP9 WebM with no audio, plus a poster from the first frame.

Usage: python3 scripts/encode-hero-video.py <source.mp4> <out-dir>. Needs ffmpeg with libx264 and libvpx-vp9."""
import subprocess, sys, os

SRC = sys.argv[1]
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# Shot boundaries in frames (30 fps), from scene detection, and the subject's horizontal centre (0-1) per shot.
# DESK_C only matters if the desktop crop is narrower than the full 1920-px frame.
CUTS = [0, 50, 69, 94, 123, 153, 200, 264, 313, 371, 454]
DESK_C = [0.50, 0.60, 0.42, 0.32, 0.33, 0.40, 0.56, 0.36, 0.48, 0.57]
MOB_C = [0.52, 0.42, 0.42, 0.32, 0.33, 0.38, 0.56, 0.36, 0.45, 0.585]
W, H = 1920, 1080

def graph(cw, centres, scale):
    parts, labels = [], []
    for i, c in enumerate(centres):
        x = int(min(max(c * W - cw / 2, 0), W - cw))
        x -= x % 2
        parts.append(f"[0:v]trim=start_frame={CUTS[i]}:end_frame={CUTS[i+1]},setpts=PTS-STARTPTS,crop={cw}:{H}:{x}:0[s{i}]")
        labels.append(f"[s{i}]")
    parts.append("".join(labels) + f"concat=n={len(centres)}:v=1:a=0,scale={scale}:flags=lanczos,format=yuv420p[v]")
    return ";".join(parts)

def run(args):
    print(" ".join(args[-3:]), flush=True)
    subprocess.run(args, check=True)

for name, cw, centres, scale in [("desktop", 1920, DESK_C, "1920:1080"), ("mobile", 608, MOB_C, "608:1080")]:
    g = graph(cw, centres, scale)
    base = ["ffmpeg", "-v", "error", "-y", "-i", SRC, "-filter_complex", g, "-map", "[v]", "-an"]
    run(base + ["-c:v", "libx264", "-preset", "slow", "-crf", "23", "-profile:v", "high",
                "-movflags", "+faststart", f"{OUT}/hero-{name}.mp4"])
    run(base + ["-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
                f"{OUT}/hero-{name}.webm"])
    # Poster: the first frame of this cut.
    run(["ffmpeg", "-v", "error", "-y", "-i", f"{OUT}/hero-{name}.mp4", "-frames:v", "1", "-c:v", "libwebp", "-quality", "78",
         f"{OUT}/hero-{name}-poster.webp"])
