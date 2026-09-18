import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#101214",
        color: "#ffffff",
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: "-3px",
        borderBottom: "8px solid #c9151e",
      }}
    >
      CR
    </div>,
    size,
  );
}
