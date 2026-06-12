import { MossOverlay } from "./Moss";
import { CrackOverlay } from "./Crack";

export default function Crystal({
  crystalStyle,
  moss,
  crack,
  pressing,
  onClick,
  onPressStart,
  onPressEnd,
  children,
}) {
  return (
    <div
      onClick={onClick}
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onMouseLeave={onPressEnd}
      style={{
        position: "relative",
        width: "min(62vw, 260px)",
        aspectRatio: "1 / 1",
        cursor: "pointer",
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
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            ...crystalStyle,
          }}
        />
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
        <div
          style={{
            position: "absolute",
            top: "14%",
            left: "20%",
            width: "35%",
            height: "22%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.28)",
            filter: "blur(6px)",
            pointerEvents: "none",
          }}
        />
      </div>
      {children}
    </div>
  );
}