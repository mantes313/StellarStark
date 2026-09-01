import { useEffect, useState } from "react";
import "./Nav.css";
import { useLanguage } from "../i18n/LanguageContext";

export function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav-scrolled" : ""}`}>
      <a className="wordmark" href="#top" aria-label="StellarStark home">
        <svg className="mark" viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
          <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" fill="currentColor" />
        </svg>
        StellarStark
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="#services">{t.navServices}</a>
        <a href="#work">{t.navWork}</a>
        <a href="#care">{t.navCare}</a>
      </nav>
      <a className="btn btn-primary btn-small" href="#contact">
        {t.navStart}
      </a>
    </header>
  );
}
