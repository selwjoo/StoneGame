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
  background: "linear-gradient(180deg, rgba(22,24,30,0.98), rgba(14,16,22,0.98))",
  color: "#fff",
  padding: "clamp(20px, 5vw, 28px)",
  borderRadius: "20px",
  border: "0.5px solid rgba(214,205,190,0.12)",
  boxShadow: "0 24px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)",
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
  background: "linear-gradient(90deg, rgba(214,205,190,0), rgba(214,205,190,0.42), rgba(214,205,190,0))",
};

export const modalHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
};

export const modalEyebrowStyle = {
  margin: 0,
  color: "rgba(214,205,190,0.52)",
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  paddingLeft: "0.22em",
};

export const modalTitleStyle = {
  margin: 0,
  fontSize: "clamp(18px, 4.8vw, 22px)",
  color: "rgba(255,255,255,0.96)",
  letterSpacing: "-0.02em",
};

export const modalBodyStyle = {
  margin: 0,
  color: "rgba(255,255,255,0.58)",
  fontSize: "clamp(13px, 3.4vw, 15px)",
  lineHeight: 1.5,
};

export const modalSectionStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "0.5px solid rgba(214,205,190,0.12)",
  borderRadius: 12,
  padding: "10px 16px",
  boxSizing: "border-box",
};

export const modalAccentStyle = {
  ...modalSectionStyle,
  fontSize: "clamp(13px, 3.4vw, 14px)",
  color: "rgba(226, 214, 184, 0.92)",
};

export const modalIconStyle = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "linear-gradient(180deg, rgba(214,205,190,0.12), rgba(214,205,190,0.04))",
  border: "0.5px solid rgba(214,205,190,0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

export const modalIconCoreStyle = {
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: "rgba(214,205,190,0.7)",
  boxShadow: "0 0 12px rgba(214,205,190,0.22)",
};

export const modalButtonRowStyle = {
  display: "flex",
  gap: 12,
};

export const primaryActionButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "0.5px solid rgba(214,205,190,0.2)",
  borderRadius: "12px",
  background: "rgba(214,205,190,0.14)",
  color: "rgba(241,235,221,0.96)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 700,
};

export const primaryDangerButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "1px solid rgba(255, 92, 92, 0.1)",
  borderRadius: "12px",
  background: "linear-gradient(180deg, #6A4B4E 0%, #573D40 100%)",
  color: "#E7D2D2",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 700,
  transition: "background 0.18s ease, border-color 0.18s ease, color 0.18s ease",
};

export const primaryDangerButtonHoverStyle = {
  background: "linear-gradient(180deg, #735255 0%, #604346 100%)",
  borderColor: "rgba(255, 92, 92, 0.14)",
  color: "#F0DEDE",
};

export const secondaryButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "0.5px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.035)",
  color: "rgba(255,255,255,0.62)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 600,
};
