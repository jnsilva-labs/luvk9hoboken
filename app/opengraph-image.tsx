import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Luv K9 — Dog Daycare, Grooming & Walking in Hoboken, NJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Load the logo as base64
  const logoPath = join(
    process.cwd(),
    "public/images/brand/logo-combined-hires.png"
  );
  const logoBuffer = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  // Load font
  const fontPath = join(process.cwd(), "public/fonts/Outfit-Bold.ttf");
  let fontData: ArrayBuffer | undefined;
  try {
    const fontBuffer = await readFile(fontPath);
    fontData = fontBuffer.buffer.slice(
      fontBuffer.byteOffset,
      fontBuffer.byteOffset + fontBuffer.byteLength
    );
  } catch {
    // Font not available — Satori will use fallback
  }

  // Generate scattered stars
  const stars = Array.from({ length: 80 }, (_, i) => ({
    left: `${(i * 17 + 31) % 100}%`,
    top: `${(i * 23 + 13) % 100}%`,
    size: (i % 3) + 1,
    opacity: 0.3 + ((i * 7) % 5) * 0.14,
  }));

  // Generate scattered paw prints
  const paws = [
    { left: "5%", top: "15%", rotate: "-20deg", opacity: 0.12, size: 40 },
    { left: "88%", top: "10%", rotate: "15deg", opacity: 0.1, size: 35 },
    { left: "15%", top: "75%", rotate: "25deg", opacity: 0.08, size: 45 },
    { left: "82%", top: "80%", rotate: "-10deg", opacity: 0.12, size: 38 },
    { left: "45%", top: "8%", rotate: "5deg", opacity: 0.06, size: 30 },
    { left: "70%", top: "70%", rotate: "-30deg", opacity: 0.09, size: 42 },
    { left: "30%", top: "85%", rotate: "35deg", opacity: 0.07, size: 32 },
    { left: "92%", top: "45%", rotate: "20deg", opacity: 0.1, size: 36 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0d0615 50%, #07040C 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background:
                star.opacity > 0.5
                  ? "#D4AF37"
                  : star.opacity > 0.4
                    ? "#C9A0DC"
                    : "#ffffff",
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Paw prints */}
        {paws.map((paw, i) => (
          <div
            key={`paw-${i}`}
            style={{
              position: "absolute",
              left: paw.left,
              top: paw.top,
              fontSize: paw.size,
              opacity: paw.opacity,
              transform: `rotate(${paw.rotate})`,
              display: "flex",
            }}
          >
            🐾
          </div>
        ))}

        {/* Subtle gold vignette glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          width={280}
          height={280}
          style={{
            objectFit: "contain",
            marginBottom: -10,
            filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.25em",
              color: "#D4AF37",
              textTransform: "uppercase" as const,
              fontFamily: "sans-serif",
              display: "flex",
            }}
          >
            Hoboken&apos;s Premier Dog Care
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #B8860B 100%)",
              backgroundClip: "text",
              color: "transparent",
              fontFamily: fontData ? "Outfit" : "sans-serif",
              textAlign: "center" as const,
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            Where Every Dog Is Royalty
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(245, 240, 232, 0.6)",
              marginTop: 8,
              fontFamily: "sans-serif",
              display: "flex",
            }}
          >
            PlayCare · Grooming · Dog Walking · Boarding
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Outfit", data: fontData, style: "normal" as const, weight: 700 as const }]
        : [],
    }
  );
}
