export default function TopRightIconButton({ src, alt, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "calc(env(safe-area-inset-top, 0px) + 4px)",
        right: "clamp(10px, 3vw, 16px)",
        width: "clamp(40px, 11vw, 44px)",
        height: "clamp(40px, 11vw, 44px)",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: 26,
          height: 26,
          objectFit: "contain",
          opacity: 0.9,
        }}
      />
    </button>
  );
}
