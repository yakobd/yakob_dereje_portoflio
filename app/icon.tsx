import { ImageResponse } from "next/og";

// Edge runtime: the Node build of next/og in Next 14 resolves its bundled
// font/wasm paths incorrectly on Windows and fails the build.
export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Fraunces to match the "YD" avatar. Without a browser user agent, Google Fonts
// serves TTF, which ImageResponse can read. Falls back to the default font.
async function loadFraunces(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@600&text=YD",
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await fetch(url).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function Icon() {
  const fraunces = await loadFraunces();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#B5651D",
          color: "#FAF7F2",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: -0.5,
          fontFamily: fraunces ? "Fraunces" : undefined,
        }}
      >
        YD
      </div>
    ),
    {
      ...size,
      fonts: fraunces
        ? [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }]
        : undefined,
    },
  );
}
