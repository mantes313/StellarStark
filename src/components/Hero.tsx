import "./Hero.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useHeroSlider } from "../hooks/useHeroSlider";

export function Hero() {
  const { t } = useLanguage();
  const { heroRef, handleRef, cut } = useHeroSlider();

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Finished layer (real, interactive) */}
      <div className="hero-layer hero-final">
        <div className="hero-inner">
          <h1 dangerouslySetInnerHTML={{ __html: t.heroH1 }} />
          <p className="hero-sub">{t.heroSub}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contact">
              {t.heroCtaStart}
            </a>
            <a className="btn btn-ghost" href="#work">
              {t.heroCtaWork}
            </a>
          </div>
        </div>
        <div className="hero-glow" aria-hidden="true" />
      </div>

      {/* Blueprint layer (decorative twin, clipped) */}
      <div className="hero-layer hero-draft" aria-hidden="true">
        <div className="hero-inner">
          <h1 className="draft-h1" dangerouslySetInnerHTML={{ __html: t.heroH1 }} />
          <p className="hero-sub draft-sub">{t.heroSub}</p>
          <div className="hero-ctas">
            <span className="btn draft-btn">{t.heroCtaStart}</span>
            <span className="btn draft-btn">{t.heroCtaWork}</span>
          </div>
          <span className="draft-note draft-note-h1">h1 / display / 800</span>
          <span className="draft-note draft-note-cta">primary action</span>
          <span className="draft-note draft-note-grid">grid: 12 col / 96 gutter</span>
        </div>
      </div>

      {/* Drag handle */}
      <div
        className="hero-handle"
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label={t.heroHandleAria}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(cut)}
      >
        <div className="handle-line" aria-hidden="true" />
        <div className="handle-grip" aria-hidden="true">
          <span className="grip-chev">&#8249;</span>
          <span className="grip-label">drag</span>
          <span className="grip-chev">&#8250;</span>
        </div>
      </div>
    </section>
  );
}
