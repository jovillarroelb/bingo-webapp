import React from 'react';
import { ExternalLink, Heart, Github, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer
      id="app-footer"
      className={`print:hidden max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 border-t border-amber-200/70 text-slate-500 text-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left side: Copyright & MIT License */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1.5">
          <span className="font-bold text-slate-700">
            © {currentYear} {t.footerCopyright}
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-slate-500">
            {t.footerRights}
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
            <Scale className="w-3 h-3 text-amber-700" />
            <span>{t.footerCreatedUnder} {t.footerMitLicense}</span>
          </span>
        </div>

        {/* Right side: Developer credit & GitHub Repo link */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 font-bold text-slate-600">
          {/* GitHub Repository link */}
          <a
            id="footer-github-link"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold hover:text-slate-950 transition-colors border border-slate-200"
            title={t.footerGithubRepo}
          >
            <Github className="w-3.5 h-3.5 text-slate-700" />
            <span>GitHub</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
          </a>

          {/* Smera Credit */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-normal">{t.footerDevelopedWith}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="text-slate-500 font-normal">{t.footerBy}</span>
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
      </div>
    </footer>
  );
};

