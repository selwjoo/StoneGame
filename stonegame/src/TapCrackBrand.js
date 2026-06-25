export const tapCrackBrandStyle = {
  textAlign: "center",
  color: "#D8D3C7",
  fontSize: "clamp(12px, 3.4vw, 15px)",
  fontWeight: 800,
  letterSpacing: "0.12em",
  paddingLeft: "0.12em",
  whiteSpace: "nowrap",
  textShadow: "0 10px 30px rgba(0, 0, 0, 0.22)",
};

export default function TapCrackBrand({ style }) {
  return <div style={{ ...tapCrackBrandStyle, ...style }}>Tap & Crack</div>;
}
