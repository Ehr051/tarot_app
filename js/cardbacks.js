// 🔮 TAROT — Reversos de cartas SVG (uno por mazo)

let _cardBackCounter = 0;

const CARD_BACKS_TEMPLATES = {
  rider: (uid) => `
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rbg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a0a2e"/>
          <stop offset="50%" style="stop-color:#16213e"/>
          <stop offset="100%" style="stop-color:#1a0a2e"/>
        </linearGradient>
        <linearGradient id="rgd-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#b8860b"/>
          <stop offset="50%" style="stop-color:#d4af37"/>
          <stop offset="100%" style="stop-color:#f4d03f"/>
        </linearGradient>
      </defs>
      <rect width="200" height="320" rx="12" fill="url(#rbg-${uid})"/>
      <rect x="8" y="8" width="184" height="304" rx="8" fill="none" stroke="url(#rgd-${uid})" stroke-width="2"/>
      <rect x="16" y="16" width="168" height="288" rx="6" fill="none" stroke="url(#rgd-${uid})" stroke-width="1" opacity="0.5"/>
      <circle cx="100" cy="160" r="50" fill="none" stroke="url(#rgd-${uid})" stroke-width="2"/>
      <circle cx="100" cy="160" r="40" fill="none" stroke="url(#rgd-${uid})" stroke-width="1" opacity="0.7"/>
      <circle cx="100" cy="160" r="30" fill="none" stroke="url(#rgd-${uid})" stroke-width="1" opacity="0.5"/>
      <path d="M100 110 L103 120 L113 120 L105 126 L108 136 L100 130 L92 136 L95 126 L87 120 L97 120 Z" fill="url(#rgd-${uid})" opacity="0.8"/>
      <circle cx="100" cy="160" r="4" fill="url(#rgd-${uid})"/>
      <circle cx="100" cy="80" r="3" fill="url(#rgd-${uid})" opacity="0.6"/>
      <circle cx="100" cy="240" r="3" fill="url(#rgd-${uid})" opacity="0.6"/>
      <circle cx="40" cy="160" r="3" fill="url(#rgd-${uid})" opacity="0.6"/>
      <circle cx="160" cy="160" r="3" fill="url(#rgd-${uid})" opacity="0.6"/>
      <circle cx="55" cy="95" r="2" fill="url(#rgd-${uid})" opacity="0.4"/>
      <circle cx="145" cy="95" r="2" fill="url(#rgd-${uid})" opacity="0.4"/>
      <circle cx="55" cy="225" r="2" fill="url(#rgd-${uid})" opacity="0.4"/>
      <circle cx="145" cy="225" r="2" fill="url(#rgd-${uid})" opacity="0.4"/>
      <path d="M100 50 L100 70 M100 250 L100 270 M30 160 L50 160 M150 160 L170 160" stroke="url(#rgd-${uid})" stroke-width="1" opacity="0.3"/>
    </svg>
  `,
  
  marsella: (uid) => `
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mbg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d1810"/>
          <stop offset="50%" style="stop-color:#3d2817"/>
          <stop offset="100%" style="stop-color:#2d1810"/>
        </linearGradient>
        <linearGradient id="mrd-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8b0000"/>
          <stop offset="50%" style="stop-color:#c0392b"/>
          <stop offset="100%" style="stop-color:#8b0000"/>
        </linearGradient>
      </defs>
      <rect width="200" height="320" rx="12" fill="url(#mbg-${uid})"/>
      <rect x="8" y="8" width="184" height="304" rx="8" fill="none" stroke="url(#mrd-${uid})" stroke-width="3"/>
      <rect x="16" y="16" width="168" height="288" rx="6" fill="none" stroke="#c0392b" stroke-width="1" opacity="0.4"/>
      <path d="M100 40 L160 100 L100 160 L40 100 Z" fill="none" stroke="url(#mrd-${uid})" stroke-width="2"/>
      <path d="M100 160 L160 220 L100 280 L40 220 Z" fill="none" stroke="url(#mrd-${uid})" stroke-width="2"/>
      <circle cx="100" cy="100" r="20" fill="none" stroke="#c0392b" stroke-width="1.5"/>
      <circle cx="100" cy="220" r="20" fill="none" stroke="#c0392b" stroke-width="1.5"/>
      <path d="M70 100 L130 100 M100 70 L100 130" stroke="#c0392b" stroke-width="1" opacity="0.6"/>
      <path d="M70 220 L130 220 M100 190 L100 250" stroke="#c0392b" stroke-width="1" opacity="0.6"/>
      <circle cx="100" cy="160" r="8" fill="#c0392b" opacity="0.3"/>
      <circle cx="100" cy="160" r="3" fill="#c0392b" opacity="0.6"/>
      <path d="M30 30 L50 50 M150 30 L170 50 M30 290 L50 270 M150 290 L170 270" stroke="#c0392b" stroke-width="1" opacity="0.3"/>
    </svg>
  `,
  
  thoth: (uid) => `
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tbg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a1a"/>
          <stop offset="50%" style="stop-color:#1a0a2e"/>
          <stop offset="100%" style="stop-color:#0a0a1a"/>
        </linearGradient>
        <linearGradient id="tpu-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4a3f6b"/>
          <stop offset="50%" style="stop-color:#6b5b95"/>
          <stop offset="100%" style="stop-color:#8b7bb5"/>
        </linearGradient>
        <linearGradient id="tgd-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#b8860b"/>
          <stop offset="50%" style="stop-color:#d4af37"/>
          <stop offset="100%" style="stop-color:#f4d03f"/>
        </linearGradient>
      </defs>
      <rect width="200" height="320" rx="12" fill="url(#tbg-${uid})"/>
      <rect x="8" y="8" width="184" height="304" rx="8" fill="none" stroke="url(#tpu-${uid})" stroke-width="2"/>
      <polygon points="100,30 170,90 170,230 100,290 30,230 30,90" fill="none" stroke="url(#tgd-${uid})" stroke-width="1.5"/>
      <polygon points="100,50 155,95 155,225 100,270 45,225 45,95" fill="none" stroke="url(#tpu-${uid})" stroke-width="1" opacity="0.6"/>
      <circle cx="100" cy="160" r="35" fill="none" stroke="url(#tgd-${uid})" stroke-width="1.5"/>
      <path d="M100 125 L100 195 M65 160 L135 160" stroke="url(#tgd-${uid})" stroke-width="1" opacity="0.8"/>
      <circle cx="100" cy="160" r="15" fill="none" stroke="url(#tpu-${uid})" stroke-width="1"/>
      <path d="M85 145 L100 125 L115 145 L100 165 Z" fill="url(#tgd-${uid})" opacity="0.3"/>
      <circle cx="100" cy="160" r="5" fill="url(#tgd-${uid})" opacity="0.6"/>
      <circle cx="100" cy="60" r="4" fill="url(#tgd-${uid})" opacity="0.5"/>
      <circle cx="100" cy="260" r="4" fill="url(#tgd-${uid})" opacity="0.5"/>
      <circle cx="40" cy="160" r="4" fill="url(#tgd-${uid})" opacity="0.5"/>
      <circle cx="160" cy="160" r="4" fill="url(#tgd-${uid})" opacity="0.5"/>
      <path d="M60 70 L70 80 M130 70 L140 80 M60 250 L70 260 M130 250 L140 260" stroke="url(#tpu-${uid})" stroke-width="1" opacity="0.4"/>
      <text x="100" y="165" text-anchor="middle" font-family="serif" font-size="12" fill="url(#tgd-${uid})" opacity="0.7">☽</text>
    </svg>
  `,
  
  valle: (uid) => `
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vbg-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a2e1a"/>
          <stop offset="50%" style="stop-color:#2e3d2e"/>
          <stop offset="100%" style="stop-color:#1a2e1a"/>
        </linearGradient>
        <linearGradient id="vgd-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#b8860b"/>
          <stop offset="50%" style="stop-color:#d4af37"/>
          <stop offset="100%" style="stop-color:#f4d03f"/>
        </linearGradient>
        <linearGradient id="vgr-${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d5a27"/>
          <stop offset="50%" style="stop-color:#4a8b3f"/>
          <stop offset="100%" style="stop-color:#2d5a27"/>
        </linearGradient>
      </defs>
      <rect width="200" height="320" rx="12" fill="url(#vbg-${uid})"/>
      <rect x="8" y="8" width="184" height="304" rx="8" fill="none" stroke="url(#vgd-${uid})" stroke-width="2"/>
      <path d="M100 40 Q130 80 130 120 Q130 160 100 180 Q70 160 70 120 Q70 80 100 40" fill="none" stroke="url(#vgd-${uid})" stroke-width="1.5"/>
      <path d="M100 140 Q140 180 140 220 Q140 260 100 280 Q60 260 60 220 Q60 180 100 140" fill="none" stroke="url(#vgr-${uid})" stroke-width="1.5"/>
      <circle cx="100" cy="120" r="15" fill="none" stroke="url(#vgd-${uid})" stroke-width="1"/>
      <circle cx="100" cy="220" r="15" fill="none" stroke="url(#vgr-${uid})" stroke-width="1"/>
      <path d="M100 105 L100 135 M85 120 L115 120" stroke="url(#vgd-${uid})" stroke-width="1" opacity="0.6"/>
      <path d="M100 205 L100 235 M85 220 L115 220" stroke="url(#vgr-${uid})" stroke-width="1" opacity="0.6"/>
      <circle cx="100" cy="160" r="6" fill="url(#vgd-${uid})" opacity="0.4"/>
      <path d="M50 50 Q60 70 50 90 M150 50 Q140 70 150 90 M50 230 Q60 250 50 270 M150 230 Q140 250 150 270" stroke="url(#vgr-${uid})" stroke-width="1" opacity="0.3"/>
      <circle cx="100" cy="60" r="3" fill="url(#vgd-${uid})" opacity="0.5"/>
      <circle cx="100" cy="260" r="3" fill="url(#vgr-${uid})" opacity="0.5"/>
      <circle cx="40" cy="160" r="3" fill="url(#vgd-${uid})" opacity="0.5"/>
      <circle cx="160" cy="160" r="3" fill="url(#vgr-${uid})" opacity="0.5"/>
    </svg>
  `
};

function getCardBackSVG(deck) {
  _cardBackCounter++;
  const uid = 'cb' + _cardBackCounter;
  const template = CARD_BACKS_TEMPLATES[deck] || CARD_BACKS_TEMPLATES.rider;
  return template(uid);
}
