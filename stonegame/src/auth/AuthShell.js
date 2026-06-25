export const authFieldGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

export const authLabelStyle = {
  color: "rgba(216, 211, 199, 0.62)",
  fontSize: "13px",
  letterSpacing: "0.06em",
};

export const authInputStyle = {
  padding: "6px 0 6px 6px",
  border: "none",
  borderBottom: "1px solid #2B2D34",
  background: "transparent",
  color: "#f1eee7",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
  width: "100%",
};

export const authButtonStyle = {
  padding: "13px 16px",
  borderRadius: "14px",
  border: "1px solid #343740",
  background: "#1b1e25",
  color: "rgba(216, 211, 199, 0.62)",
  fontWeight: 800,
  fontSize: "15px",
  letterSpacing: "0.05em",
  cursor: "pointer",
};

export const authErrorStyle = {
  color: "#d99b94",
  fontSize: "13px",
  margin: 0,
  textAlign: "center",
  lineHeight: 1.45,
};

export const authLinkStyle = {
  color: "rgba(216, 211, 199, 0.82)",
  textDecoration: "none",
  borderBottom: "1px solid rgba(216,211,199,0.18)",
  paddingBottom: "1px",
};

export default function AuthShell({ title, subtitle, footer, leftAction, children }) {
  return (
    <div style={shellStyle}>
      <div style={topBrandWrapStyle}>
        <div style={brandSlotStyle}>{leftAction}</div>
        <div style={topBrandStyle}>Tap & Crack</div>
        <div style={brandSlotStyle} />
      </div>

      <div style={contentStyle}>
        <div style={headingStackStyle}>
          <h1 style={titleStyle}>{title}</h1>
          {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
        </div>

        <div style={formAreaStyle}>{children}</div>

        {footer ? <div style={footerStyle}>{footer}</div> : null}
      </div>
    </div>
  );
}

const shellStyle = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  padding:
    "calc(env(safe-area-inset-top, 0px) + 80px) 20px calc(env(safe-area-inset-bottom, 0px) + 24px)",
  boxSizing: "border-box",
  background: "#0a0a0f",
};

const contentStyle = {
  position: "relative",
  width: "min(100%, 320px)",
  marginTop: 70,
};

const topBrandWrapStyle = {
  position: "absolute",
  top: "calc(env(safe-area-inset-top, 0px) + 100px)",
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(78vw, 290px)",
  display: "grid",
  gridTemplateColumns: "36px 1fr 36px",
  alignItems: "center",
  zIndex: 1,
  pointerEvents: "auto",
};

const brandSlotStyle = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const headingStackStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: 9,
  marginBottom: 8,
  paddingTop: 0,
};

const topBrandStyle = {
  textAlign: "center",
  color: "#D8D3C7",
  fontSize: "clamp(13px, 3.8vw, 17px)",
  fontWeight: 800,
  letterSpacing: "0.12em",
  paddingLeft: "0.12em",
  whiteSpace: "nowrap",
  textShadow: "0 10px 30px rgba(0, 0, 0, 0.22)",
};

const titleStyle = {
  margin: 0,
  color: "#D8D3C7",
  fontFamily: '"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif',
  fontSize: "clamp(20px, 5vw, 23px)",
  lineHeight: 1.06,
  letterSpacing: "-0.02em",
  fontWeight: 700,
};

const subtitleStyle = {
  margin: 0,
  color: "rgba(216, 211, 199, 0.44)",
  fontSize: "12px",
  lineHeight: 1.5,
  maxWidth: 260,
};

const formAreaStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  marginTop: 60,
};

const footerStyle = {
  position: "relative",
  marginTop: 22,
  color: "rgba(216, 211, 199, 0.56)",
  fontSize: "13px",
  textAlign: "center",
  lineHeight: 1.5,
};
