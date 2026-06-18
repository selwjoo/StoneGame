export const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
  padding: "clamp(16px, 5vw, 24px)",
  boxSizing: "border-box",
};

export const modalStyle = {
  width: "min(100%, 360px)",
  background: "#1b1b1b",
  color: "#fff",
  padding: "clamp(18px, 5vw, 24px)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  textAlign: "center",
  boxSizing: "border-box",
};
