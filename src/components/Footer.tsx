import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="app-footer"
      className={`print:hidden max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 border-t border-amber-200/70 text-slate-500 text-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Left side: Copyright statement */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-bold text-slate-600">
            © {currentYear} ¡Bingo Familiar!
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="font-semibold text-slate-500">
            Todos los derechos reservados.
          </span>
        </div>

        {/* Right side: Developer credit & Link */}
        <div className="flex items-center gap-1.5 font-bold text-slate-600">
          <span>Desarrollado con</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>por</span>
          <a
            id="footer-developer-link"
            href="https://www.smera.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/70 hover:bg-amber-200/80 text-amber-900 font-extrabold hover:text-amber-950 transition-colors underline decoration-amber-400 underline-offset-2"
            title="Visitar sitio oficial de Smera"
          >
            <span>Smera</span>
            <ExternalLink className="w-3 h-3 text-amber-700" />
          </a>
        </div>
      </div>
    </footer>
  );
};
