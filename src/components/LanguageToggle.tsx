import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { playSound } from '../utils/audio';

interface LanguageToggleProps {
  className?: string;
  soundEnabled?: boolean;
}

// Crisp Vector Flag for Chile 🇨🇱
export const ChileFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 600 400"
    className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Red bottom stripe */}
    <rect width="600" height="400" fill="#D52B1E" />
    {/* White top stripe */}
    <rect width="600" height="200" fill="#FFFFFF" />
    {/* Blue canton top-left */}
    <rect width="200" height="200" fill="#0039A6" />
    {/* White five-pointed star */}
    <polygon
      fill="#FFFFFF"
      points="100,38 118,92 174,92 129,126 146,180 100,146 54,180 71,126 26,92 82,92"
    />
  </svg>
);

// Crisp Vector Flag for United Kingdom 🇬🇧 (Union Jack)
export const UKFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 60 30"
    className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}
    aria-hidden="true"
  >
    <clipPath id="uk-flag-clip">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="uk-flag-diagonal-clip">
      <path d="M0,0 L60,30 M60,0 L0,30" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      {/* Blue background */}
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      {/* White Diagonals */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      {/* Red Diagonals */}
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#uk-flag-diagonal-clip)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      {/* White cross */}
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      {/* Red cross */}
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

// Crisp Vector Flag for Italy 🇮🇹 (Tricolore)
export const ItalyFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 300 200"
    className={`inline-block rounded-xs shadow-xs flex-shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Green stripe */}
    <rect width="100" height="200" x="0" fill="#009246" />
    {/* White stripe */}
    <rect width="100" height="200" x="100" fill="#FFFFFF" />
    {/* Red stripe */}
    <rect width="100" height="200" x="200" fill="#CE2B37" />
  </svg>
);

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  soundEnabled = true,
}) => {
  const { lang, setLang } = useLanguage();

  const handleSelect = (selectedLang: 'es' | 'en' | 'it') => {
    if (selectedLang !== lang) {
      playSound('click', soundEnabled);
      setLang(selectedLang);
    }
  };

  return (
    <div
      id="language-toggle"
      className={`inline-flex items-center p-1 rounded-2xl bg-slate-100 border-2 border-amber-200/90 shadow-xs select-none ${className}`}
      role="group"
      aria-label="Seleccionar idioma / Select language / Seleziona lingua"
    >
      {/* Chile Button (ES) */}
      <button
        id="lang-btn-es"
        type="button"
        onClick={() => handleSelect('es')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
          lang === 'es'
            ? 'bg-white text-slate-900 shadow-sm border border-amber-300 scale-102'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 opacity-80'
        }`}
        title="Español (Chile)"
        aria-pressed={lang === 'es'}
      >
        <ChileFlag className="w-5 h-3.5 border border-slate-300/60" />
        <span>ES</span>
      </button>

      {/* UK Button (EN) */}
      <button
        id="lang-btn-en"
        type="button"
        onClick={() => handleSelect('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
          lang === 'en'
            ? 'bg-white text-slate-900 shadow-sm border border-amber-300 scale-102'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 opacity-80'
        }`}
        title="English (UK)"
        aria-pressed={lang === 'en'}
      >
        <UKFlag className="w-5 h-3.5 border border-slate-300/60" />
        <span>EN</span>
      </button>

      {/* Italy Button (IT) */}
      <button
        id="lang-btn-it"
        type="button"
        onClick={() => handleSelect('it')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
          lang === 'it'
            ? 'bg-white text-slate-900 shadow-sm border border-amber-300 scale-102'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 opacity-80'
        }`}
        title="Italiano"
        aria-pressed={lang === 'it'}
      >
        <ItalyFlag className="w-5 h-3.5 border border-slate-300/60" />
        <span>IT</span>
      </button>
    </div>
  );
};
