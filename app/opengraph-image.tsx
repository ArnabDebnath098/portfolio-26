import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arnab Debnath — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const gloock = fetch(
    new URL(
      "https://fonts.gstatic.com/s/gloock/v6/Iurb6YFw84WUY4N5jxylBrdRjQ.ttf"
    )
  ).then((res) => res.arrayBuffer());

  const fontData = await gloock;

  return new ImageResponse(
    (
      <div
        data-id="og-root"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fdf9f3",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ornamental border */}
        <div
          data-id="og-border"
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(200, 150, 42, 0.25)",
            display: "flex",
          }}
        />
        <div
          data-id="og-border-inner"
          style={{
            position: "absolute",
            inset: "26px",
            border: "1px solid rgba(200, 150, 42, 0.12)",
            display: "flex",
          }}
        />

        {/* Corner ornaments */}
        {[
          { top: "14px", left: "14px" },
          { top: "14px", right: "14px" },
          { bottom: "14px", left: "14px" },
          { bottom: "14px", right: "14px" },
        ].map((pos, i) => (
          <div
            key={i}
            data-id={`og-corner-${i}`}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              backgroundColor: "#c8962a",
              opacity: 0.4,
              borderRadius: "50%",
              ...pos,
              display: "flex",
            }}
          />
        ))}

        {/* Content */}
        <div
          data-id="og-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            padding: "0 80px",
          }}
        >
          {/* Availability badge */}
          <div
            data-id="og-availability"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: "#6b6b62",
            }}
          >
            <div
              data-id="og-ping"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "flex",
              }}
            />
            Available
          </div>

          {/* Headline */}
          <div
            data-id="og-headline"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "Gloock",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            <span
              data-id="og-line-1"
              style={{ fontSize: "56px", color: "#0a0a08" }}
            >
              The gap between
            </span>
            <div
              data-id="og-line-2"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                fontSize: "56px",
                color: "#4f4f48",
              }}
            >
              a designer
              <div
                data-id="og-accent-dash"
                style={{
                  width: "40px",
                  height: "5px",
                  backgroundColor: "#c8401a",
                  borderRadius: "2px",
                  display: "flex",
                }}
              />
            </div>
            <span
              data-id="og-line-3"
              style={{ fontSize: "56px", color: "#4f4f48" }}
            >
              and an engineer
            </span>
            <span
              data-id="og-line-4"
              style={{ fontSize: "56px", color: "#0a0a08" }}
            >
              is where I work.
            </span>
          </div>

          {/* Ornamental rule */}
          <div
            data-id="og-rule"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "28px 0",
              width: "320px",
            }}
          >
            <div
              data-id="og-rule-left"
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#c8962a",
                opacity: 0.3,
                display: "flex",
              }}
            />
            <div
              data-id="og-rule-diamond"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#c8962a",
                opacity: 0.5,
                transform: "rotate(45deg)",
                display: "flex",
              }}
            />
            <div
              data-id="og-rule-right"
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#c8962a",
                opacity: 0.3,
                display: "flex",
              }}
            />
          </div>

          {/* Subline */}
          <div
            data-id="og-subline"
            style={{
              fontSize: "20px",
              color: "#6b6b62",
              textAlign: "center",
              lineHeight: 1.5,
              maxWidth: "600px",
              display: "flex",
            }}
          >
            Product Designer II at JUSPAY. Building AI surfaces for payments
            and scaling the design system.
          </div>
        </div>

        {/* Bottom URL */}
        <div
          data-id="og-url"
          style={{
            position: "absolute",
            bottom: "36px",
            fontSize: "13px",
            letterSpacing: "0.1em",
            color: "#abab9d",
            textTransform: "uppercase" as const,
            display: "flex",
          }}
        >
          arnabdebnath.in
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Gloock",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
