export const crystals = [
  {
    name: "달",
    price: 0,
    description: "은은한 빛을 내는 지구의 위성",
    benefit: "",
    mossSpeedMult: 1,
    crackMin: 0.3, crackMax: 5.5,
    rewardMult: 1,
    comboWindowMs: 500,
    style: {
      // 핵심 수정: 투명도를 적절히 살리되, 안쪽 어둠(0.35)과 아래쪽 반사 테두리(rgba(255,255,255,0.3) 1px 느낌)를 겹쳐 푹 파인 홈을 시각화
      background: `
        radial-gradient(circle at 21% 26%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 6%, rgba(255,255,255,0.25) 7%, transparent 10%),
        radial-gradient(circle at 63% 35%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 9%, rgba(255,255,255,0.3) 10%, transparent 14%),
        radial-gradient(circle at 40% 68%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 5%, rgba(255,255,255,0.2) 6%, transparent 9%),
        radial-gradient(circle at 73% 62%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 5%, rgba(255,255,255,0.2) 6%, transparent 9%),
        radial-gradient(circle at 30% 25%, #ffffff 0%, #dddddd 15%, #7a7a7a 50%, #202020 85%, #080808 100%)
      `,
      boxShadow: "0 0 35px rgba(255,255,255,0.15), inset -22px -22px 40px rgba(0,0,0,0.98), inset 12px 12px 22px rgba(255,255,255,0.35)",
    },
  },
  {
    name: "수성",
    price: 30000,
    description: "태양과 가장 가까운 황량한 암석형 내부 행성",
    benefit: "균열 속도 -30%",
    mossSpeedMult: 0.7,
    crackMin: 0.2, crackMax: 4.1,
    rewardMult: 1.0,
    comboWindowMs: 500,
    style: {
      background: `
        radial-gradient(circle at 55% 55%, rgba(45,22,5,0.3) 0%, transparent 35%),
        radial-gradient(circle at 25% 40%, rgba(0,0,0,0.15) 0%, transparent 25%),
        radial-gradient(circle at 30% 25%, #f4e1d2 0%, #b8977e 25%, #5c4033 65%, #120702 100%)
      `,
      boxShadow: "0 0 35px rgba(184,151,126,0.25), inset -18px -18px 40px rgba(0,0,0,0.95), inset 12px 12px 18px rgba(244,225,210,0.3)",
    },
  },
  {
    name: "화성",
    price: 100000,
    description: "붉은 사막과 산화철로 뒤덮인 행성",
    benefit: "수익 x1.4",
    mossSpeedMult: 1,
    crackMin: 0.22, crackMax: 4.1,
    rewardMult: 1.4,
    comboWindowMs: 500,
    style: {
      background: `
        radial-gradient(circle at 45% 4%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 15%),
        radial-gradient(ellipse at 35% 65%, rgba(66,10,0,0.4) 0%, transparent 50%),
        radial-gradient(circle at 70% 35%, rgba(0,0,0,0.25) 0%, transparent 40%),
        radial-gradient(circle at 32% 24%, #ffab91 0%, #d84315 35%, #420a00 75%, #0d0100 100%)
      `,
      boxShadow: "0 0 40px rgba(216,67,21,0.3), inset -20px -20px 40px rgba(0,0,0,0.95), inset 12px 12px 20px rgba(255,171,145,0.35)",
    },
  },
  {
    name: "목성",
    price: 500000,
    description: "거대한 가스 소용돌이와 고리를 가진 행성",
    benefit: "수익 x2, 균열 +20%",
    mossSpeedMult: 1.2,
    crackMin: 0.35, crackMax: 6.0,
    rewardMult: 2.0,
    comboWindowMs: 500,
    style: {
      background: `
        radial-gradient(circle at 68% 62%, rgba(121,55,30,0.6) 0%, rgba(121,55,30,0) 14%),
        repeating-linear-gradient(15deg, transparent, transparent 6px, rgba(111,44,20,0.06) 6px, rgba(111,44,20,0.06) 12px),
        repeating-linear-gradient(-5deg, transparent, transparent 10px, rgba(255,243,224,0.05) 10px, rgba(255,243,224,0.05) 20px),
        radial-gradient(circle at 28% 25%, #ffffff 0%, #ffe0b2 15%, #b15d2e 45%, #2e1105 85%, #0f0300 100%)
      `,
      boxShadow: "0 0 45px rgba(177,93,46,0.3), inset -25px -25px 45px rgba(0,0,0,0.95), inset 12px 12px 22px rgba(255,243,224,0.25)",
    },
    hasRing: true,
  },
  {
    name: "해왕성",
    price: 2000000,
    description: "메탄 가스로 빛나는 영하의 푸른 얼음 행성",
    benefit: "균열 속도 -50%",
    mossSpeedMult: 0.5,
    crackMin: 0.18, crackMax: 3.2,
    rewardMult: 1.0,
    comboWindowMs: 500,
    style: {
      background: `
        radial-gradient(ellipse at 42% 52%, rgba(0,36,71,0.4) 0%, transparent 35%),
        repeating-linear-gradient(35deg, transparent, transparent 20px, rgba(0,105,92,0.06) 20px, rgba(0,105,92,0.06) 40px),
        radial-gradient(circle at 30% 25%, #e0f7fa 0%, #00b0ff 25%, #00695c 60%, #000714 100%)
      `,
      boxShadow: "0 0 45px rgba(0,176,255,0.4), inset -22px -22px 45px rgba(0,0,0,0.95), inset 14px 14px 20px rgba(224,247,250,0.35)",
    },
  },
  {
    name: "태양",
    price: 8000000,
    description: "스스로 빛과 강력한 에너지를 내는 항성",
    benefit: "수익 x3.5, 균열 +70%",
    mossSpeedMult: 1.7,
    crackMin: 0.45, crackMax: 8.0,
    rewardMult: 3.5,
    comboWindowMs: 600,
    style: {
      background: `
        radial-gradient(circle at 75% 42%, rgba(74,0,0,0.5) 0%, transparent 12%),
        radial-gradient(circle at 25% 63%, rgba(122,0,0,0.4) 0%, transparent 16%),
        radial-gradient(ellipse at center, transparent 25%, rgba(255,61,0,0.15) 50%, transparent 80%),
        radial-gradient(circle at 50% 50%, #ffffff 0%, #ffeb3b 25%, #ff9100 55%, #ff3d00 85%, #4a0000 100%)
      `,
      boxShadow: "0 0 60px rgba(255,145,0,0.75), 0 0 25px rgba(255,61,0,0.4), inset 0 0 20px rgba(255,255,255,0.8)",
    },
  },
  {
    name: "은하",
    price: 30000000,
    description: "수천억 개의 별이 소용돌이치는 거대한 계",
    benefit: "수익 x2.2, 균열 -25%",
    mossSpeedMult: 0.75,
    crackMin: 0.1, crackMax: 2.0,
    rewardMult: 2.2,
    comboWindowMs: 700,
    style: {
      background: `
        repeating-radial-gradient(circle at center, transparent, transparent 15px, rgba(234,128,252,0.05) 15px, rgba(234,128,252,0.05) 35px),
        radial-gradient(circle at 50% 50%, #ffffff 0%, #f3e5f5 15%, #e040fb 40%, #6a1b9a 75%, #0a0014 100%)
      `,
      boxShadow: "0 0 55px rgba(224,64,251,0.6), 0 0 20px rgba(106,27,154,0.4), inset 0 0 25px rgba(255,255,255,0.7)",
    },
  },
];