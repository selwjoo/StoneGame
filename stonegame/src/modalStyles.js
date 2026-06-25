export const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(4, 6, 10, 0.78)",
  backdropFilter: "blur(10px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
  padding: "clamp(16px, 5vw, 24px)",
  boxSizing: "border-box",
};

export const modalStyle = {
  width: "min(100%, 360px)",
  background: "#101116",
  color: "#eef1f5",
  padding: "clamp(20px, 5vw, 28px)",
  borderRadius: "20px",
  border: "0.5px solid #2B2D34",
  boxShadow: "0 24px 60px rgba(0,0,0,0.38)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  textAlign: "center",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
};

export const modalTopGlowStyle = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "72%",
  height: 1,
  background: "linear-gradient(90deg, rgba(190,196,206,0), rgba(190,196,206,0.18), rgba(190,196,206,0))",
};

export const modalHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
};

export const modalEyebrowStyle = {
  margin: 0,
  color: "rgba(176,182,194,0.52)",
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  paddingLeft: "0.22em",
};

export const modalTitleStyle = {
  margin: 0,
  fontSize: "clamp(18px, 4.8vw, 22px)",
  color: "#eef1f5",
  letterSpacing: "-0.02em",
};

export const modalBodyStyle = {
  margin: 0,
  color: "rgba(186,192,203,0.58)",
  fontSize: "clamp(13px, 3.4vw, 15px)",
  lineHeight: 1.5,
};

export const modalNumberStyle = {
  color: "#f1ebdd",
  fontWeight: 700,
};

export const modalSectionStyle = {
  background: "#16181d",
  border: "0.5px solid #2B2D34",
  borderRadius: 12,
  padding: "10px 16px",
  boxSizing: "border-box",
};

export const modalAccentStyle = {
  ...modalSectionStyle,
  fontSize: "clamp(13px, 3.4vw, 14px)",
  color: "rgba(210, 215, 224, 0.92)",
};

export const modalIconStyle = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "#16181d",
  border: "0.5px solid #2B2D34",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
};

export const modalIconCoreStyle = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "rgba(190,196,206,0.7)",
};

export const modalButtonRowStyle = {
  display: "flex",
  gap: 12,
};

export const primaryActionButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "0.5px solid #343740",
  borderRadius: "12px",
  background: "#1b1e25",
  color: "rgba(214, 219, 227, 0.92)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 700,
};

export const primaryDangerButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "1px solid #343740",
  borderRadius: "12px",
  background: "#1b1e25",
  color: "rgba(214, 219, 227, 0.92)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 700,
  transition: "background 0.18s ease, border-color 0.18s ease, color 0.18s ease",
};

export const primaryDangerButtonHoverStyle = {
  background: "#20242c",
  borderColor: "#3b404b",
  color: "#eef1f5",
};

export const secondaryButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "0.5px solid #2B2D34",
  borderRadius: "12px",
  background: "#16181d",
  color: "rgba(176,182,194,0.62)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 600,
};
