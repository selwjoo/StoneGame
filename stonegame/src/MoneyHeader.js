export default function MoneyHeader({ money }) {
  return (
    <div style={moneyReadoutStyle}>
      <div style={moneyLabelStyle}>Tap & Crack</div>
      <div style={moneyValueStyle}>{money.toLocaleString()}원</div>
      <div style={moneyRuleStyle} />
    </div>
  );
}

const moneyReadoutStyle = {
  position: "absolute",
  top: "calc(env(safe-area-inset-top, 0px) + 34px)",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  pointerEvents: "none",
};

const moneyLabelStyle = {
  color: "rgba(255,255,255,0.28)",
  fontSize: "clamp(12px, 3.1vw, 13px)",
  fontWeight: 700,
  letterSpacing: "0.22em",
  paddingLeft: "0.22em",
  whiteSpace: "nowrap",
};

const moneyValueStyle = {
  color: "#ebe6dc",
  fontSize: "clamp(24px, 6.4vw, 36px)",
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "-0.05em",
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};

const moneyRuleStyle = {
  width: "min(42vw, 172px)",
  height: 1,
  background: "rgba(255,255,255,0.14)",
};
