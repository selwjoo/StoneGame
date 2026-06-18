export default function MoneyHeader({
  money,
  topOffset = "calc(env(safe-area-inset-top, 0px) + 32px)",
  titleOffset = 0,
  moneyOffset = 28,
}) {
  return (
    <div style={{ ...headerWrapStyle, top: topOffset }}>
      <div style={{ ...titleStyle, transform: `translateY(${titleOffset}px)` }}>Tap & Crack</div>
      <div style={{ ...moneyAreaStyle, marginTop: moneyOffset }}>
        <div style={moneyValueRowStyle}>
          <span style={moneyValueStyle}>{money.toLocaleString()}</span>
          <span style={moneyUnitStyle}>조각</span>
        </div>
        <div style={moneyRuleStyle} />
      </div>
    </div>
  );
}

const headerWrapStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(88vw, 320px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 10,
  pointerEvents: "none",
  zIndex: 2,
};

const titleStyle = {
  textAlign: "center",
  pointerEvents: "none",
  color: "rgba(241, 235, 221, 0.92)",
  fontSize: "clamp(18px, 4.9vw, 24px)",
  fontWeight: 800,
  letterSpacing: "0.12em",
  paddingLeft: "0.12em",
  whiteSpace: "nowrap",
  textShadow: "0 10px 30px rgba(0, 0, 0, 0.22)",
};

const moneyAreaStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 5,
};

const moneyValueRowStyle = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "flex-end",
  gap: "clamp(4px, 1.1vw, 6px)",
  whiteSpace: "nowrap",
};

const moneyValueStyle = {
  color: "rgba(183, 181, 177, 0.92)",
  fontSize: "clamp(14px, 3.8vw, 17px)",
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  fontVariantNumeric: "tabular-nums",
};

const moneyUnitStyle = {
  color: "rgba(168, 166, 162, 0.84)",
  fontSize: "clamp(12px, 3vw, 14px)",
  fontWeight: 700,
  letterSpacing: "0.04em",
};

const moneyRuleStyle = {
  width: "min(46vw, 148px)",
  height: 2,
  background: "rgba(168, 166, 162, 0.16)",
};
