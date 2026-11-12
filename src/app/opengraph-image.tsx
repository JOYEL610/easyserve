import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.legalName}: government certificates and online applications`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#06350f",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, fontStyle: "italic" }}>
            <span>Easy</span>
            <span style={{ color: "#86d68f" }}>Serve</span>
          </div>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#cfe9cf" }}>ONLINE CENTRE</div>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
          Government certificates and applications, done from wherever you are.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#cfe9cf" }}>
          <span>Nallamkallu, Edakkazhiyur, Keralam</span>
          <span style={{ color: "#f5c518", fontWeight: 800 }}>WhatsApp {site.phoneDisplay}</span>
        </div>
      </div>
    ),
    size,
  );
}
