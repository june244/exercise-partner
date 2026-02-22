import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeParam } = await params;
  const size = parseInt(sizeParam) || 192;
  const radius = Math.round(size * 0.22);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
          borderRadius: radius,
        }}
      >
        <div
          style={{
            fontSize: Math.round(size * 0.58),
            lineHeight: 1,
          }}
        >
          💪
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
