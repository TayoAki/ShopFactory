"""Cut the brand video for the homepage hero.

Outputs, in <out-dir>:
  hero-desktop.{webm,mp4}   the full 16:9 frame at 1920x1080
  hero-mobile.{webm,mp4}    a 9:16 cut (608x1080), reframed shot by shot around each subject
  hero-{desktop,mobile}-poster.webp       first frame (shown while the video loads)
  hero-{desktop,mobile}-end.webp          last frame (shown to visitors who already watched it this session)
Video is VP9 + Opus in WebM, H.264 + AAC in MP4. Pass --no-audio to drop the soundtrack.

Usage: python3 scripts/encode-hero-video.py <source.mp4> <shots.json> <out-dir> [--no-audio]
shots.json: {"cuts_s": [0, 1.5333, ..., end], "mobile_centres": [0.55, ...]}: shot boundaries in seconds (timestamps,
not frame numbers, so dropped frames in the source don't shift them) and one centre per shot (0-1, the subject's
horizontal position). Find cuts with:
  ffmpeg -i src.mp4 -filter:v "select='gt(scene,0.25)',showinfo" -an -f null - 2>&1 | grep -o "pts_time:[0-9.]*"
Needs ffmpeg with libx264, libvpx-vp9 and libopus.
"""
import json, os, subprocess, sys

SRC, SHOTS, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
AUDIO = "--no-audio" not in sys.argv
cfg = json.load(open(SHOTS))
CUTS, CENTRES = cfg["cuts_s"], cfg["mobile_centres"]
assert len(CENTRES) == len(CUTS) - 1, "one mobile centre per shot"
W, H = 1920, 1080
os.makedirs(OUT, exist_ok=True)

def mobile_graph(cw=608):
    """One crop whose x position switches at each cut time. Nothing is split or re-joined, so every frame and
    timestamp of the source is kept (trim + concat dropped the last shot when the source had dropped frames)."""
    xs = []
    for c in CENTRES:
        x = int(min(max(c * W - cw / 2, 0), W - cw))
        xs.append(x - x % 2)
    expr = str(xs[-1])
    for i in range(len(xs) - 2, -1, -1):
        expr = f"if(lt(t,{CUTS[i + 1]}),{xs[i]},{expr})"
    return f"[0:v]crop=w={cw}:h={H}:x='{expr}':y=0,format=yuv420p[v]"

def run(args):
    print("->", args[-1], flush=True)
    subprocess.run(args, check=True)

# Quality per cut (lower CRF = higher quality, bigger file). Phones get slightly more compression to save data.
CRF = {"desktop": {"x264": 26, "vp9": 37}, "mobile": {"x264": 27, "vp9": 38}}

for name, graph in [("desktop", "[0:v]scale=1920:1080:flags=lanczos,format=yuv420p[v]"), ("mobile", mobile_graph())]:
    base = ["ffmpeg", "-v", "error", "-y", "-i", SRC, "-filter_complex", graph, "-map", "[v]"]
    base += ["-map", "0:a?"] if AUDIO else ["-an"]
    run(base + ["-c:v", "libx264", "-preset", "slow", "-crf", str(CRF[name]["x264"]), "-profile:v", "high"]
        + (["-c:a", "aac", "-b:a", "128k"] if AUDIO else []) + ["-movflags", "+faststart", f"{OUT}/hero-{name}.mp4"])
    run(base + ["-c:v", "libvpx-vp9", "-crf", str(CRF[name]["vp9"]), "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2"]
        + (["-c:a", "libopus", "-b:a", "96k"] if AUDIO else []) + [f"{OUT}/hero-{name}.webm"])
    run(["ffmpeg", "-v", "error", "-y", "-i", f"{OUT}/hero-{name}.mp4", "-frames:v", "1", "-c:v", "libwebp", "-quality", "80",
         f"{OUT}/hero-{name}-poster.webp"])
    # Decode the video's last half second, keep overwriting one PNG (which leaves the final frame), then convert it.
    # Seek from the video stream's own duration: the audio can run a little longer.
    vdur = float(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=duration", "-of", "csv=p=0",
                                 f"{OUT}/hero-{name}.mp4"], capture_output=True, text=True, check=True).stdout.strip())
    last = f"{OUT}/hero-{name}-end.png"
    run(["ffmpeg", "-v", "error", "-y", "-ss", f"{max(vdur - 0.5, 0):.3f}", "-i", f"{OUT}/hero-{name}.mp4", "-an", "-update", "1",
         "-f", "image2", last])
    run(["ffmpeg", "-v", "error", "-y", "-i", last, "-c:v", "libwebp", "-quality", "80", f"{OUT}/hero-{name}-end.webp"])
    os.remove(last)
