import React from 'react';

// 3D Golden Emergency Bell with Red Badge
export const SOSBellIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bellGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffb300" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bellBody" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="25%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="bellRim" x1="15" y1="75" x2="105" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
      <filter id="shadowBell" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.5" />
      </filter>
    </defs>
    
    <circle cx="60" cy="60" r="48" fill="url(#bellGlow)" />
    
    <g filter="url(#shadowBell)">
      <path d="M54 22C54 18.6863 56.6863 16 60 16C63.3137 16 66 18.6863 66 22V26H54V22Z" fill="#ca8a04" />
      <path d="M60 25C44 25 36 44 34 68C33 72 26 76 26 80C26 84 32 86 60 86C88 86 94 84 94 80C94 76 87 72 86 68C84 44 76 25 60 25Z" fill="url(#bellBody)" />
      <path d="M48 34C43 42 41 55 42 70" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M52 32C50 36 49 44 50 54" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      <ellipse cx="60" cy="81" rx="34" ry="7" fill="url(#bellRim)" />
      <ellipse cx="60" cy="87" rx="10" ry="8" fill="#a16207" />
      <ellipse cx="60" cy="86" rx="8" ry="6" fill="#facc15" />
      <circle cx="86" cy="30" r="14" fill="#ef4444" />
      <circle cx="86" cy="30" r="14" fill="url(#bellGlow)" opacity="0.3" />
      <text x="86" y="35" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="Outfit, sans-serif">1</text>
    </g>
  </svg>
);

// 3D Yellow Tow Truck Illustration
export const TowTruckIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="yellowCarGrad" x1="0" y1="0" x2="100" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="70" rx="42" ry="7" fill="#000" fillOpacity="0.4" />
    <path d="M12 52L82 46L86 58L10 60Z" fill="#334155" />
    <path d="M14 36C14 33 16 31 19 31H34L44 45V58H14V36Z" fill="url(#yellowCarGrad)" />
    <path d="M22 35H32L39 45H22V35Z" fill="url(#windowGrad)" />
    <path d="M24 37L35 44" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.6" />
    
    <g transform="translate(38, 20) rotate(-6)">
      <path d="M6 24C6 22 8 20 11 19L24 15L36 18L44 24V32H6V24Z" fill="#fbbf24" />
      <path d="M14 20L22 17L30 19L33 24H12L14 20Z" fill="#0f172a" />
      <circle cx="14" cy="32" r="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="36" cy="32" r="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
    </g>

    <path d="M46 30L62 14L66 18L50 34Z" fill="#eab308" />
    <line x1="62" y1="16" x2="74" y2="30" stroke="#f59e0b" strokeWidth="2.5" />

    <circle cx="24" cy="60" r="8" fill="#090d16" stroke="#475569" strokeWidth="2" />
    <circle cx="24" cy="60" r="4" fill="#facc15" />
    <circle cx="70" cy="58" r="8" fill="#090d16" stroke="#475569" strokeWidth="2" />
    <circle cx="70" cy="58" r="4" fill="#facc15" />
    <circle cx="82" cy="57" r="8" fill="#090d16" stroke="#475569" strokeWidth="2" />
    <circle cx="82" cy="57" r="4" fill="#facc15" />
  </svg>
);

// 3D Yellow Repairs / Mechanic Bonnet Open Illustration
export const RepairsIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="repBody" x1="0" y1="0" x2="100" y2="80">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="68" rx="40" ry="7" fill="#000" fillOpacity="0.4" />
    <path d="M18 54L22 42C24 35 30 30 38 29L64 30C72 30 78 35 80 42L84 54C85 58 82 62 78 62H24C20 62 17 58 18 54Z" fill="url(#repBody)" />
    <path d="M36 34H66L72 44H30L36 34Z" fill="#0f172a" />
    <path d="M22 42L12 24L38 22L36 34Z" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5" />
    
    <g transform="translate(18, 30)">
      <rect x="0" y="4" width="12" height="10" rx="2" fill="#334155" />
      <circle cx="6" cy="9" r="2" fill="#ef4444" />
      <path d="M14 0L10 8L12 10L16 2Z" fill="#e2e8f0" />
      <circle cx="8" cy="-4" r="3" fill="#94a3b8" fillOpacity="0.6" />
      <circle cx="4" cy="-8" r="4" fill="#94a3b8" fillOpacity="0.4" />
    </g>

    <circle cx="32" cy="60" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
    <circle cx="70" cy="60" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
    <path d="M74 22L84 32M84 22L74 32" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3D Yellow Flat Tyre Illustration
export const FlatTyreIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="68" rx="40" ry="7" fill="#000" fillOpacity="0.4" />
    
    <g transform="rotate(-7 50 50)">
      <path d="M18 52L24 38C26 33 32 29 40 29L66 30C74 30 79 35 82 41L86 52C87 56 84 60 80 60H22C18 60 16 56 18 52Z" fill="#facc15" />
      <path d="M34 33H68L73 42H28L34 33Z" fill="#0f172a" />
      <circle cx="72" cy="56" r="8" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
      <circle cx="72" cy="56" r="3" fill="#facc15" />
      <ellipse cx="28" cy="58" rx="9" ry="5" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
      <circle cx="28" cy="57" r="2.5" fill="#facc15" />
      <path d="M14 55C10 52 8 50 6 52" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 60C11 60 8 62 6 60" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 3D Yellow Dead Battery Illustration
export const DeadBatteryIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="68" rx="40" ry="7" fill="#000" fillOpacity="0.4" />
    
    <path d="M20 54L26 40C28 35 34 31 42 31H64C72 31 78 35 80 40L86 54C87 58 84 62 80 62H24C20 62 18 58 20 54Z" fill="#facc15" />
    <path d="M36 35H66L72 44H30L36 35Z" fill="#0f172a" />
    
    <g transform="translate(38, 14)">
      <rect x="0" y="6" width="24" height="16" rx="3" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
      <rect x="4" y="2" width="4" height="4" rx="1" fill="#ef4444" />
      <rect x="16" y="2" width="4" height="4" rx="1" fill="#3b82f6" />
      <path d="M13 8L9 14H13L11 20L17 13H13L15 8H13Z" fill="#facc15" />
      <circle cx="-3" cy="6" r="1.5" fill="#60a5fa" />
      <path d="M-5 2L-2 6L-6 8" stroke="#60a5fa" strokeWidth="1.5" />
      <circle cx="28" cy="8" r="1.5" fill="#facc15" />
    </g>
    
    <circle cx="32" cy="60" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
    <circle cx="72" cy="60" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
  </svg>
);

// 3D Yellow Fluid Leakage Illustration
export const FluidLeakageIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="48" cy="68" rx="44" ry="8" fill="#1e1b18" stroke="#d97706" strokeWidth="1.5" />
    <ellipse cx="44" cy="67" rx="20" ry="4" fill="#d97706" fillOpacity="0.4" />
    
    <path d="M20 52L26 38C28 33 34 29 42 29H64C72 29 78 33 80 38L86 52C87 56 84 60 80 60H24C20 60 18 56 20 52Z" fill="#facc15" />
    <path d="M36 33H66L72 42H30L36 33Z" fill="#0f172a" />
    
    <circle cx="48" cy="56" r="2.5" fill="#f59e0b" />
    <circle cx="48" cy="62" r="2" fill="#ea580c" />
    <circle cx="38" cy="58" r="1.5" fill="#f59e0b" />
    
    <circle cx="30" cy="58" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
    <circle cx="74" cy="58" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
  </svg>
);

// 3D Yellow Brake Failure Illustration
export const BrakeFailureIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="68" rx="40" ry="7" fill="#000" fillOpacity="0.4" />
    
    <path d="M20 52L26 38C28 33 34 29 42 29H64C72 29 78 33 80 38L86 52C87 56 84 60 80 60H24C20 60 18 56 20 52Z" fill="#facc15" />
    <path d="M36 33H66L72 42H30L36 33Z" fill="#0f172a" />
    
    <g transform="translate(68, 48)">
      <circle cx="6" cy="6" r="10" fill="#ef4444" fillOpacity="0.2" />
      <circle cx="6" cy="6" r="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2.5" />
      <path d="M-1 0H7V6H-1Z" fill="#dc2626" />
      <circle cx="6" cy="6" r="3" fill="#ef4444" />
    </g>
    
    <circle cx="30" cy="58" r="7" fill="#090d16" stroke="#ca8a04" strokeWidth="2" />
    <path d="M48 12L56 26H40L48 12Z" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
    <circle cx="48" cy="23" r="1" fill="#fff" />
    <line x1="48" y1="17" x2="48" y2="20" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3D Cute Yellow Mechanic Mascot ("Filled all your details?")
export const CuteMechanicMascot: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mascotBody" x1="20" y1="20" x2="80" y2="90">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="mascotEye" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>
    
    <ellipse cx="50" cy="88" rx="36" ry="6" fill="#000000" fillOpacity="0.45" />
    <rect x="22" y="32" width="56" height="46" rx="20" fill="url(#mascotBody)" />
    
    <path d="M26 34C26 22 36 14 50 14C64 14 74 22 74 34H26Z" fill="#eab308" />
    <path d="M20 34C20 30 32 28 50 28C68 28 80 30 80 34L76 38H24L20 34Z" fill="#ca8a04" />
    <path d="M44 20L56 20" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
    
    <ellipse cx="38" cy="48" rx="10" ry="12" fill="url(#mascotEye)" stroke="#1e293b" strokeWidth="2" />
    <circle cx="40" cy="48" r="6" fill="#0f172a" />
    <circle cx="38" cy="45" r="2.5" fill="#ffffff" />
    
    <ellipse cx="62" cy="48" rx="10" ry="12" fill="url(#mascotEye)" stroke="#1e293b" strokeWidth="2" />
    <circle cx="60" cy="48" r="6" fill="#0f172a" />
    <circle cx="58" cy="45" r="2.5" fill="#ffffff" />
    
    <path d="M42 66C46 71 54 71 58 66" stroke="#713f12" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="28" cy="60" r="4" fill="#f87171" fillOpacity="0.6" />
    <circle cx="72" cy="60" r="4" fill="#f87171" fillOpacity="0.6" />
    <ellipse cx="18" cy="74" rx="6" ry="10" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
    <ellipse cx="82" cy="74" rx="6" ry="10" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
  </svg>
);

// Photo-Realistic Vector Red Tow Truck (Screen 3 Provider Card)
export const RedTowTruckVector: React.FC<{ className?: string }> = ({ className = 'w-24 h-16' }) => (
  <svg className={className} viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="redCab" x1="10" y1="20" x2="60" y2="70">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="40%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="chromeGrill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
    </defs>
    
    <ellipse cx="80" cy="80" rx="72" ry="7" fill="#000000" fillOpacity="0.6" />
    <rect x="52" y="44" width="98" height="12" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1" />
    <line x1="56" y1="48" x2="146" y2="48" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" />
    <rect x="144" y="40" width="8" height="20" rx="1" fill="#334155" />
    <path d="M12 66V48C12 44 15 42 18 42H28L36 24C38 20 42 18 48 18H58C62 18 66 21 66 26V66H12Z" fill="url(#redCab)" />
    <path d="M38 26H56V42H30L38 26Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
    <path d="M42 28L54 40" stroke="#93c5fd" strokeWidth="1.5" strokeOpacity="0.7" />
    <rect x="10" y="46" width="6" height="20" rx="1" fill="url(#chromeGrill)" />
    <circle cx="13" cy="50" r="1.5" fill="#fef08a" />
    <rect x="62" y="10" width="3" height="30" rx="1" fill="#cbd5e1" />
    <path d="M62 10C62 8 64 6 66 6H68" stroke="#cbd5e1" strokeWidth="2" />
    <rect x="42" y="15" width="14" height="3" rx="1" fill="#f59e0b" />
    <circle cx="45" cy="16" r="1" fill="#fef08a" />
    <circle cx="53" cy="16" r="1" fill="#fef08a" />
    <circle cx="30" cy="70" r="11" fill="#0f172a" stroke="#334155" strokeWidth="3" />
    <circle cx="30" cy="70" r="5" fill="#94a3b8" />
    <circle cx="98" cy="70" r="11" fill="#0f172a" stroke="#334155" strokeWidth="3" />
    <circle cx="98" cy="70" r="5" fill="#94a3b8" />
    <circle cx="126" cy="70" r="11" fill="#0f172a" stroke="#334155" strokeWidth="3" />
    <circle cx="126" cy="70" r="5" fill="#94a3b8" />
  </svg>
);

// High-definition vehicle silhouettes for car switcher
export const VehicleGraphic: React.FC<{ modelId: string; className?: string }> = ({ modelId, className = 'w-full h-48' }) => {
  switch (modelId) {
    case 'porsche-taycan':
      return (
        <svg className={className} viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="taycanPaint" x1="20" y1="20" x2="320" y2="140">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="35%" stopColor="#94a3b8" />
              <stop offset="85%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="neonCyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <ellipse cx="170" cy="140" rx="145" ry="12" fill="#000" fillOpacity="0.7" />
          <ellipse cx="170" cy="140" rx="120" ry="6" fill="#38bdf8" fillOpacity="0.15" />
          <path d="M25 108C25 102 32 94 48 92L82 88L130 52C145 42 165 38 195 38H230C258 38 275 48 290 68L318 94C326 98 330 104 330 110L326 122C324 126 318 128 310 128H40C30 128 25 120 25 108Z" fill="url(#taycanPaint)" />
          <path d="M125 56L185 44H225C248 44 262 52 274 68L290 86H105L125 56Z" fill="#090d16" stroke="#334155" strokeWidth="1" />
          <path d="M140 54L260 76" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M308 94L322 96L316 102L304 98Z" fill="#38bdf8" />
          <circle cx="312" cy="97" r="2" fill="#ffffff" />
          <path d="M288 98L270 116" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 104H140" stroke="#f1f5f9" strokeWidth="1" strokeOpacity="0.4" />
          
          <g transform="translate(75, 122)">
            <circle cx="0" cy="0" r="24" fill="#090d16" stroke="#475569" strokeWidth="4" />
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#f8fafc" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#38bdf8" strokeWidth="2" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#38bdf8" strokeWidth="2" />
          </g>
          <g transform="translate(265, 122)">
            <circle cx="0" cy="0" r="24" fill="#090d16" stroke="#475569" strokeWidth="4" />
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#f8fafc" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#38bdf8" strokeWidth="2" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#38bdf8" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'bmw-3':
    case 'bmw-7':
      return (
        <svg className={className} viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bmwPaint" x1="20" y1="20" x2="320" y2="140">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="40%" stopColor="#1d4ed8" />
              <stop offset="85%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0b132b" />
            </linearGradient>
            <linearGradient id="kidneyGrill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          <ellipse cx="170" cy="140" rx="145" ry="12" fill="#000" fillOpacity="0.7" />
          <path d="M22 108C22 100 28 92 45 90L85 86L135 48C148 40 170 36 200 36H240C265 36 280 44 294 62L320 88C328 94 332 100 332 108L328 122C325 126 318 128 310 128H40C28 128 22 120 22 108Z" fill="url(#bmwPaint)" />
          <path d="M130 52L190 42H235C255 42 268 48 278 62L292 82H110L130 52Z" fill="#090d16" stroke="#475569" strokeWidth="1" />
          <path d="M142 50L265 74" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.5" />
          <rect x="318" y="90" width="10" height="14" rx="4" fill="url(#kidneyGrill)" stroke="#1e293b" strokeWidth="1" />
          <path d="M304 88L316 90L312 94L300 92Z" fill="#fef08a" />
          
          <g transform="translate(75, 122)">
            <circle cx="0" cy="0" r="24" fill="#090d16" stroke="#475569" strokeWidth="4" />
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#3b82f6" />
          </g>
          <g transform="translate(265, 122)">
            <circle cx="0" cy="0" r="24" fill="#090d16" stroke="#475569" strokeWidth="4" />
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#3b82f6" />
          </g>
        </svg>
      );

    case 'tata-nexon-ev':
      return (
        <svg className={className} viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nexonPaint" x1="20" y1="20" x2="320" y2="140">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="45%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>
          </defs>
          <ellipse cx="170" cy="140" rx="145" ry="12" fill="#000" fillOpacity="0.7" />
          <path d="M25 104C25 94 34 86 50 84L90 80L125 44C138 34 158 32 185 32H235C258 32 272 40 284 56L315 84C324 90 328 98 328 106L324 122C322 126 315 128 305 128H45C32 128 25 118 25 104Z" fill="url(#nexonPaint)" />
          <path d="M125 44C138 34 158 32 185 32H235C258 32 272 40 284 56L288 64H116L125 44Z" fill="#ffffff" />
          <path d="M128 50L185 40H230C250 40 262 46 272 58L285 76H112L128 50Z" fill="#0f172a" />
          <line x1="290" y1="84" x2="322" y2="88" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
          
          <g transform="translate(80, 122)">
            <circle cx="0" cy="0" r="25" fill="#090d16" stroke="#334155" strokeWidth="4" />
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#059669" />
          </g>
          <g transform="translate(260, 122)">
            <circle cx="0" cy="0" r="25" fill="#090d16" stroke="#334155" strokeWidth="4" />
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#059669" />
          </g>
        </svg>
      );

    default: // Hyundai Creta / Mahindra XUV700 SUV
      return (
        <svg className={className} viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="suvPaint" x1="20" y1="20" x2="320" y2="140">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="45%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <ellipse cx="170" cy="140" rx="145" ry="12" fill="#000" fillOpacity="0.7" />
          <path d="M22 102C22 92 30 84 48 82L88 80L122 42C136 32 156 30 188 30H242C266 30 280 38 292 54L320 84C328 90 332 98 332 106L328 122C324 126 316 128 306 128H42C30 128 22 118 22 102Z" fill="url(#suvPaint)" />
          <path d="M125 46L185 38H236C256 38 268 44 278 56L294 76H110L125 46Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <path d="M136 44L266 68" stroke="#fde047" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M130 26H250" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          <path d="M304 84L322 88L316 94L298 90Z" fill="#fef08a" />
          
          <g transform="translate(80, 122)">
            <circle cx="0" cy="0" r="26" fill="#090d16" stroke="#475569" strokeWidth="4" />
            <circle cx="0" cy="0" r="17" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="6" fill="#f59e0b" />
          </g>
          <g transform="translate(262, 122)">
            <circle cx="0" cy="0" r="26" fill="#090d16" stroke="#475569" strokeWidth="4" />
            <circle cx="0" cy="0" r="17" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="6" fill="#f59e0b" />
          </g>
        </svg>
      );
  }
};
