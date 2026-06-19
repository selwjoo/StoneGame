export default function BenefitRecord({ benefit, compact = false }) {
  if (!benefit) return null;

  return (
    <div style={{ ...wrapStyle, ...(compact ? compactWrapStyle : null) }}>
      <div style={lineStyle} />
      <p style={{ ...textStyle, ...(compact ? compactTextStyle : null) }}>
        {benefit}
      </p>
      <div style={lineStyle} />
    </div>
  );
}

const wrapStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  width: "100%",
  maxWidth: 320,
};

const compactWrapStyle = {
  gap: 8,
  maxWidth: 280,
};

const lineStyle = {
  width: 26,
  height: 2,
  borderRadius: 999,
  background: "linear-gradient(90deg, rgba(214,205,190,0), rgba(214,205,190,0.42), rgba(214,205,190,0))",
};

const textStyle = {
  margin: 0,
  color: "rgba(226, 220, 208, 0.84)",
  fontSize: "clamp(13px, 3.2vw, 14px)",
  fontWeight: 500,
  lineHeight: 1.35,
  letterSpacing: "0.02em",
  textShadow: "0 6px 18px rgba(0, 0, 0, 0.18)",
  whiteSpace: "nowrap",
};

const compactTextStyle = {
  fontSize: "clamp(12px, 2.9vw, 13px)",
};
