export default function BenefitRecord({ benefit, compact = false }) {
  if (!benefit) return null;

  return (
    <div style={{ ...wrapStyle, ...(compact ? compactWrapStyle : null) }}>
      <div style={lineStyle} />
      <p style={{ ...valueStyle, ...(compact ? compactValueStyle : null) }}>
        {benefit}
      </p>
      <div style={lineStyle} />
    </div>
  );
}

const wrapStyle = {
  width: "auto",
  maxWidth: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const compactWrapStyle = {
  gap: 9,
};

const lineStyle = {
  width: 24,
  height: 2,
  borderRadius: 999,
  background: "linear-gradient(90deg, rgba(214,205,190,0), rgba(214,205,190,0.38), rgba(214,205,190,0))",
};

const valueStyle = {
  margin: 0,
  color: "rgba(226, 220, 208, 0.82)",
  fontSize: "clamp(13px, 3.2vw, 14px)",
  lineHeight: 1.4,
  letterSpacing: "0.03em",
  whiteSpace: "nowrap",
  fontWeight: 500,
  textShadow: "0 6px 18px rgba(0, 0, 0, 0.18)",
};

const compactValueStyle = {
  fontSize: "clamp(12px, 2.9vw, 13px)",
  letterSpacing: "0.02em",
};
