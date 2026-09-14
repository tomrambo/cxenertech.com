#!/usr/bin/env python3
"""Generate WebP variants and compress oversized JPEG/PNG sources."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public"


def fit(image: Image.Image, max_width: int) -> Image.Image:
    if image.width <= max_width:
        return image
    height = round(image.height * max_width / image.width)
    return image.resize((max_width, height), Image.Resampling.LANCZOS)


def as_rgb(image: Image.Image) -> Image.Image:
    if image.mode in {"RGB", "L"}:
        return image.convert("RGB")
    if image.mode in {"RGBA", "LA", "P"}:
        canvas = Image.new("RGB", image.size, (11, 11, 11))
        rgba = image.convert("RGBA")
        canvas.paste(rgba, mask=rgba.split()[-1])
        return canvas
    return image.convert("RGB")


def save_webp(image: Image.Image, dest: Path, quality: int = 78) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, "WEBP", quality=quality, method=6)
    print(f"  webp {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KiB)")


def save_jpeg(image: Image.Image, dest: Path, quality: int = 78) -> None:
    as_rgb(image).save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  jpeg {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KiB)")


def save_png(image: Image.Image, dest: Path) -> None:
    image.save(dest, "PNG", optimize=True)
    print(f"  png  {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KiB)")


def variants(src: Path, widths: list[int], max_jpeg: int, jpeg_quality: int = 78) -> None:
    print(src.relative_to(ROOT))
    with Image.open(src) as raw:
        image = raw.convert("RGB") if raw.mode != "RGB" else raw.copy()

    stem = src.with_suffix("")
    for width in widths:
        resized = fit(image, width)
        save_webp(resized, Path(f"{stem}-{width}.webp"))

    largest = fit(image, widths[-1])
    save_webp(largest, stem.with_suffix(".webp"))
    save_jpeg(fit(image, max_jpeg), src, jpeg_quality)


def logo(src: Path, width: int) -> None:
    print(src.relative_to(ROOT))
    with Image.open(src) as raw:
        image = raw.convert("RGBA")
    resized = fit(image, width)
    save_webp(resized, src.with_suffix(".webp"), quality=82)
    save_png(resized, src)


def main() -> None:
    variants(
        ROOT / "images/hero-campus.jpg",
        widths=[800, 1280, 1920],
        max_jpeg=1920,
        jpeg_quality=76,
    )

    for name in (
        "project-factory-rooftop.jpg",
        "project-warehouse-epc.jpg",
        "project-dc-station.jpg",
        "project-fleet-depot.jpg",
        "project-mall-ev-hub.jpg",
        "project-residential-solar.jpg",
    ):
        variants(
            ROOT / "images/projects" / name,
            widths=[640, 960, 1280],
            max_jpeg=1280,
            jpeg_quality=76,
        )

    for name in (
        "cx-station-s4.jpg",
        "cx-station-s10.jpg",
        "cx-station-hub.jpg",
    ):
        variants(
            ROOT / "images/packages" / name,
            widths=[640, 960, 1280],
            max_jpeg=1280,
            jpeg_quality=76,
        )

    logo(ROOT / "logo-on-dark.png", 360)
    logo(ROOT / "logo.png", 360)
    logo(ROOT / "logo-mark.png", 128)


if __name__ == "__main__":
    main()
