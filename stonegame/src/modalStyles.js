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
  background: "linear-gradient(180deg, rgba(20,22,28,0.98), rgba(14,16,22,0.98))",
  color: "#fff",
  padding: "clamp(20px, 5vw, 28px)",
  borderRadius: "20px",
  border: "0.5px solid rgba(255,255,255,0.1)",
  boxShadow: "0 24px 60px rgba(0,0,0,0.38)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  textAlign: "center",
  boxSizing: "border-box",
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

export const modalAccentStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "0.5px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  padding: "10px 16px",
  fontSize: "clamp(13px, 3.4vw, 14px)",
  color: "#fffaaa",
};

export const modalIconStyle = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "rgba(231,76,60,0.15)",
  border: "0.5px solid rgba(231,76,60,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  fontSize: 24,
};

export const modalButtonRowStyle = {
  display: "flex",
  gap: 12,
};

export const primaryDangerButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #b64036, #e74c3c)",
  color: "#fff",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 700,
};

export const secondaryButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "0.5px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  color: "rgba(255,255,255,0.7)",
  cursor: "pointer",
  fontSize: "clamp(14px, 3.8vw, 15px)",
  fontWeight: 600,
};
