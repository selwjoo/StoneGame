import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crystals } from './crystalList';
import BackgroundEffect from './BackgroundEffect';
import { formatPieces } from './formatPieces';
import MoneyHeader from './MoneyHeader';
import BenefitRecord from './BenefitRecord'; // 기존 방식 컴포넌트 복원
import Crystal from './Crystal';
import { logout } from './auth';
import {
  modalBodyStyle,
  modalButtonRowStyle,
  modalHeaderStyle,
  modalStyle,
  modalTopGlowStyle,
  modalTitleStyle,
  overlayStyle,
  primaryDangerButtonStyle,
  primaryDangerButtonHoverStyle,
  secondaryButtonStyle,
} from './modalStyles';
import {
  HEADER_LEFT_ACTION_OFFSET,
  HEADER_MONEY_OFFSET,
  HEADER_TITLE_OFFSET,
  PLANET_FRAME_SIZE,
  PLANET_STAGE_LABEL_GAP,
  PLANET_STAGE_LABEL_STYLE,
  PLANET_STAGE_LABEL_MIN_HEIGHT,
  PLANET_STAGE_TOP_MARGIN,
} from './planetLayout';

export default function Start({
  money,
  setTotalMoney,
  unlockedCrystals,
  setUnlockedCrystals,
  selectedCrystal,
  setSelectedCrystal,
}) {
  const navigate = useNavigate();
  const [logoutHover, setLogoutHover] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutConfirmHover, setLogoutConfirmHover] = useState(false);

  function prev() { setSelectedCrystal(i => (i - 1 + crystals.length) % crystals.length); }
  function next() { setSelectedCrystal(i => (i + 1) % crystals.length); }

  const crystal = crystals[selectedCrystal];
  const isOwned = unlockedCrystals.includes(selectedCrystal);
  const canBuy  = isOwned || money >= crystal.price;
  const hasBenefit = Boolean(crystal.benefit);
  const hasRing = Boolean(crystal.hasRing);

  function handleBuy() {
    if (!canBuy) return;
    if (!isOwned) {
      setTotalMoney(prev => Math.max(0, prev - (crystal.price ?? 0)));
      setUnlockedCrystals(prev => (
        prev.includes(selectedCrystal) ? prev : [...prev, selectedCrystal]
      ));
    }
    navigate('/money');
  }

  return (
    <>
    <BackgroundEffect crystalName={crystal.name} />
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
      minHeight: "100dvh",
      padding: "calc(env(safe-area-inset-top,0px) + 20px) clamp(16px,5vw,28px) calc(env(safe-area-inset-bottom,0px) + 24px)",
      boxSizing: "border-box",
      position: "relative", zIndex: 1, width: "100%", maxWidth: 520, margin: "0 auto",
    }}>
      <MoneyHeader
        money={money}
        titleOffset={HEADER_TITLE_OFFSET}
        moneyOffset={HEADER_MONEY_OFFSET}
        leftSlot={
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            onMouseEnter={() => setLogoutHover(true)}
            onMouseLeave={() => setLogoutHover(false)}
            aria-label="로그아웃"
            style={{
              width: "clamp(44px,12vw,50px)",
              height: "clamp(44px,12vw,50px)",
              padding: 0,
              marginLeft: HEADER_LEFT_ACTION_OFFSET,
              border: "none",
              background: "transparent",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.15s ease",
              transform: logoutHover ? "translateY(10px) scale(1.1)" : "translateY(10px) scale(1)",
            }}
          >
            <img
              src="logout.png"
              alt="로그아웃"
              style={{
                width: 28,
                height: 28,
                objectFit: "contain",
                opacity: logoutHover ? 1 : 0.82,
                transition: "opacity 0.18s ease",
              }}
            />
          </button>
        }
      />

      <div style={contentColumnStyle}>
        <div style={stageLabelWrapStyle}>
          <p style={PLANET_STAGE_LABEL_STYLE}>
            탐사할 행성을 선택하세요
          </p>
        </div>

      {/* 슬라이더 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px,4vw,32px)", width: "100%", marginBottom: "clamp(22px,5vw,28px)" }}>
        <button type="button" onClick={prev} style={arrowBtn} aria-label="이전 탐사">
          <img src="/left.png" alt="" style={arrowImageStyle} />
        </button>

        <Crystal
          crystalStyle={crystal.style}
          crystalName={crystal.name}
          hasRing={hasRing}
          moss={0}
          crack={0}
          pressing={false}
          interactive={false}
          showOverlays={false}
          size={PLANET_FRAME_SIZE}
        />

        <button type="button" onClick={next} style={arrowBtn} aria-label="다음 탐사">
          <img src="/right.png" alt="" style={arrowImageStyle} />
        </button>
      </div>

      <div style={isOwned ? infoStackOwnedStyle : hasBenefit ? infoStackStyle : infoStackNoBenefitStyle}>
        <p style={nameStyle}>
          {crystal.name}
        </p>
        <p style={isOwned ? descriptionOwnedStyle : hasBenefit ? descriptionStyle : descriptionNoBenefitStyle}>
          {crystal.description}
        </p>
        {/* 기존에 쓰시던 오리지널 BenefitRecord 배치 구조 원상복구 */}
        <BenefitRecord benefit={crystal.benefit} />
      </div>

      <div style={isOwned ? actionStackOwnedStyle : hasBenefit ? actionStackStyle : actionStackNoBenefitStyle}>
        <p style={{ ...priceStyle, color: canBuy ? "#B8C7B1" : "#D96A6A" }}>
          {isOwned ? "개척 완료" : formatPieces(crystal.price)}
        </p>

        <button
          onClick={handleBuy} disabled={!canBuy}
          style={{
            padding: "14px 24px", borderRadius: 40,
            background: "transparent",
            border: "none",
            color: canBuy ? "#fff" : "rgba(255,255,255,0.3)",
            fontSize: "clamp(16px,4.2vw,18px)", fontWeight: 700,
            cursor: canBuy ? "pointer" : "not-allowed",
            letterSpacing: "0.05em", width: "min(100%,320px)",
          }}
        >
          {isOwned ? "워프 가동 ▶" : "개척 후 워프 ▶"}
        </button>
      </div>
      </div>
    </div>

    {showLogoutConfirm && (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <div style={modalTopGlowStyle} />
          <div style={modalHeaderStyle}>
            <h2 style={modalTitleStyle}>로그아웃 하시겠습니까?</h2>
          </div>
          <p style={modalBodyStyle}>
            현재 화면을 떠나 로그인 화면으로 돌아갑니다.
          </p>
          <div style={modalButtonRowStyle}>
            <button
              type="button"
              onClick={logout}
              onMouseEnter={() => setLogoutConfirmHover(true)}
              onMouseLeave={() => setLogoutConfirmHover(false)}
              style={{
                ...primaryDangerButtonStyle,
                ...(logoutConfirmHover ? primaryDangerButtonHoverStyle : null),
              }}
            >
              로그아웃
            </button>
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(false)}
              style={secondaryButtonStyle}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

const contentColumnStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0,
  marginTop: PLANET_STAGE_TOP_MARGIN,
};

const stageLabelWrapStyle = {
  minHeight: PLANET_STAGE_LABEL_MIN_HEIGHT,
  marginBottom: PLANET_STAGE_LABEL_GAP,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const infoStackStyle = {
  width: "min(100%, 320px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 11,
  textAlign: "center",
  marginBottom: 14,
};

const infoStackNoBenefitStyle = {
  ...infoStackStyle,
  gap: 10,
  marginBottom: 18,
};

const infoStackOwnedStyle = {
  ...infoStackStyle,
  gap: 9,
  marginBottom: 12,
};

const nameStyle = {
  color: "#fff",
  fontSize: "clamp(18px,4.8vw,22px)",
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
};

const descriptionStyle = {
  color: "rgba(255,255,255,0.42)",
  fontSize: "clamp(12px,3vw,14px)",
  margin: 0,
  lineHeight: 1.52,
  maxWidth: "min(100%, 264px)",
};

const descriptionNoBenefitStyle = {
  ...descriptionStyle,
  lineHeight: 1.56,
  maxWidth: "min(100%, 240px)",
};

const descriptionOwnedStyle = {
  ...descriptionNoBenefitStyle,
  maxWidth: "min(100%, 220px)",
};

const actionStackStyle = {
  width: "min(100%, 320px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
};

const actionStackNoBenefitStyle = {
  ...actionStackStyle,
  gap: 5,
};

const actionStackOwnedStyle = {
  ...actionStackStyle,
  gap: 2,
};

const priceStyle = {
  fontSize: "clamp(14px,3.8vw,16px)",
  fontWeight: 600,
  margin: 0,
  textAlign: "center",
  lineHeight: 1.35,
};

const arrowBtn = {
  width: "clamp(42px,11vw,48px)", height: "clamp(42px,11vw,48px)", borderRadius: "50%",
  background: "transparent",
  border: "none",
  boxShadow: "none",
  backdropFilter: "none",
  cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const arrowImageStyle = {
  width: 24,
  height: 24,
  objectFit: "contain",
  display: "block",
  opacity: 0.98,
  filter: "brightness(1.25)",
};
