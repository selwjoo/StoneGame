import "./App.css";
import { MossOverlay } from "./Moss";
import { CrackOverlay } from "./Crack";
import { PLANET_FRAME_SIZE } from "./planetLayout";

export default function Crystal({
  crystalStyle,
  crystalName,
  hasRing = false,
  moss,
  crack,
  pressing,
  onClick,
  onPressStart,
  onPressEnd,
  interactive = true,
  showOverlays = true,
  size = PLANET_FRAME_SIZE,
  children,
}) {
  const isMoon = crystalName === "달";
  const showSurfaceHighlight = crystalName !== "목성";
  return (
    <div
      onClick={onClick}
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onMouseLeave={onPressEnd}
      style={{
        position: "relative",
        width: size,
        aspectRatio: "1 / 1",
        cursor: interactive ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      <div
        style={{
          transform: pressing ? "scale(0.93)" : "scale(1)",
          transition: "transform 0.12s cubic-bezier(0.34,1.56,0.64,1)",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {hasRing && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "152%",
              height: "29%",
              border: "6px solid rgba(232, 208, 177, 0.74)",
              boxShadow: "0 0 8px rgba(150, 112, 70, 0.18), inset 0 0 8px rgba(118, 78, 44, 0.2)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%) rotate(-22deg)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            ...crystalStyle,
            animation: crystalName === "태양" ? "solarFlare 2.5s infinite ease-in-out" : "none",
          }}
        />
        {showOverlays ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <MossOverlay moss={moss} />
            <CrackOverlay crack={crack} />
          </div>
        ) : null}
        {showSurfaceHighlight ? (
          <div
            style={{
              position: "absolute",
              top: isMoon ? "10%" : "14%",
              left: isMoon ? "13%" : "20%",
              width: isMoon ? "24%" : "35%",
              height: isMoon ? "14%" : "22%",
              borderRadius: "50%",
              background: isMoon ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.28)",
              filter: isMoon ? "blur(3px)" : "blur(6px)",
              pointerEvents: "none",
            }}
          />
        ) : null}
        {hasRing && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "152%",
              height: "29%",
              border: "6px solid rgba(242, 222, 196, 0.92)",
              boxShadow: "0 0 10px rgba(168, 132, 92, 0.22), inset 0 0 7px rgba(132, 88, 52, 0.22)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%) rotate(-22deg)",
              clipPath: "inset(39% 0 31% 0)",
              pointerEvents: "none",
              zIndex: 4,
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
}
