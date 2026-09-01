import "./Footer.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useConstellation } from "../hooks/useConstellation";

export function Footer() {
  const { t } = useLanguage();
  const { containerRef, canvasRef } = useConstellation();

  return (
    <footer className="footer" ref={containerRef}>
      <canvas className="footer-constellation" ref={canvasRef} aria-hidden="true" />
      <div className="container footer-inner">
        <span className="wordmark wordmark-footer">
          <svg className="mark" viewBox="0 0 24 24" width={14} height={14} aria-hidden="true">
            <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" fill="currentColor" />
          </svg>
          StellarStark
        </span>
        <span className="footer-copy">{t.footerCopy}</span>
      </div>
    </footer>
  );
}
