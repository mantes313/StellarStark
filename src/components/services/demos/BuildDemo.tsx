import type { CSSProperties } from "react";
import "./BuildDemo.css";
import { cx } from "../../../lib/classNames";
import { useLanguage } from "../../../i18n/LanguageContext";
import type { BuilderState } from "../../../hooks/useBuildYourOwn";

interface BuildDemoProps {
  reducedMotion: boolean;
  state: BuilderState;
  building: boolean;
}

/** Live mock page for the "build your own" tool: renders whatever the
 * visitor has typed/picked, in the chosen layout and accent, right inside
 * the shared mock-browser chrome. A brief shimmer sells the "it's building"
 * feeling whenever an edit lands. */
export function BuildDemo({ reducedMotion, state, building }: BuildDemoProps) {
  const { t } = useLanguage();
  const name = state.name.trim() || t.buildDefaultName;
  const tagline = state.tagline.trim() || t.buildDefaultTagline;
  const isPlaceholder = !state.name.trim() && !state.tagline.trim();

  return (
    <div
      className={cx("byo-demo", `byo-layout-${state.layout}`, building && !reducedMotion && "is-building")}
      style={{ "--byo-accent": state.accent } as CSSProperties}
    >
      <div className="byo-demo-bar">
        <span className="byo-demo-dot" />
        <span className={cx("byo-demo-name", isPlaceholder && "is-placeholder")}>{name}</span>
      </div>

      <div className="byo-demo-body">
        <div className="byo-demo-hero" aria-hidden="true" />
        <div className="byo-demo-text">
          <p className={cx("byo-demo-tagline", isPlaceholder && "is-placeholder")}>{tagline}</p>
          <div className="byo-demo-actions">
            <span className="byo-demo-btn">{t.buildMiniCta}</span>
            {state.layout !== "minimal" && (
              <span className="byo-demo-btn byo-demo-btn-ghost">{t.buildMiniCtaGhost}</span>
            )}
          </div>
        </div>
      </div>

      <div className="byo-demo-shimmer" aria-hidden="true" />
    </div>
  );
}
