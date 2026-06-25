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
      <div style={contentStyle}>
        {leftAction ? <div style={leftActionWrapStyle}>{leftAction}</div> : null}

        <div style={headingStackStyle}>
          <div style={eyebrowStyle}>Tap & Crack</div>
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
    "calc(env(safe-area-inset-top, 0px) + 88px) 20px calc(env(safe-area-inset-bottom, 0px) + 24px)",
  boxSizing: "border-box",
  background: "#0a0a0f",
};

const contentStyle = {
  position: "relative",
  width: "min(100%, 320px)",
};

const leftActionWrapStyle = {
  position: "absolute",
  top: -2,
  left: -6,
  zIndex: 1,
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

const eyebrowStyle = {
  color: "rgba(216, 211, 199, 0.52)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  paddingLeft: "0.14em",
  textTransform: "uppercase",
};

const titleStyle = {
  margin: 0,
  color: "#f1eee7",
  fontSize: "clamp(26px, 7vw, 31px)",
  lineHeight: 1,
  letterSpacing: "-0.04em",
  fontWeight: 800,
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
