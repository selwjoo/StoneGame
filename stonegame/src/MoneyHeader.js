import TapCrackBrand from "./TapCrackBrand";

export default function MoneyHeader({
  money,
  topOffset = "calc(env(safe-area-inset-top, 0px) + 32px)",
  titleOffset = 0,
  moneyOffset = 22,
  leftSlot = null,
  rightSlot = null,
}) {
  return (
    <div style={{ ...headerWrapStyle, top: topOffset }}>
      <div style={topRowStyle}>
        <div style={slotStyle}>{leftSlot}</div>
        <TapCrackBrand style={{ transform: `translateY(${titleOffset}px)`, color: "rgba(241, 235, 221, 0.92)" }} />
        <div style={slotStyle}>{rightSlot}</div>
      </div>
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
  width: "min(70vw, 256px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 6,
  pointerEvents: "none",
  zIndex: 2,
};

const topRowStyle = {
  display: "grid",
  gridTemplateColumns: "35px 1fr 35px",
  alignItems: "center",
};

const slotStyle = {
  width: 35,
  height: 35,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto",
};

const moneyAreaStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 4,
};

const moneyValueRowStyle = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "flex-end",
  gap: "clamp(3px, 0.9vw, 5px)",
  whiteSpace: "nowrap",
};

const moneyValueStyle = {
  color: "rgba(183, 181, 177, 0.92)",
  fontSize: "clamp(11px, 3vw, 14px)",
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  fontVariantNumeric: "tabular-nums",
};

const moneyUnitStyle = {
  color: "rgba(168, 166, 162, 0.84)",
  fontSize: "clamp(10px, 2.4vw, 11px)",
  fontWeight: 700,
  letterSpacing: "0.04em",
};

const moneyRuleStyle = {
  width: "min(37vw, 118px)",
  height: 2,
  background: "rgba(168, 166, 162, 0.16)",
};
