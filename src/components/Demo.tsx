import { useState, type CSSProperties } from "react";
import "./Demo.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import { cx } from "../lib/classNames";
import type { Dictionary } from "../i18n/translations";

type SwatchKey = "swatch1" | "swatch2" | "swatch3" | "swatch4";

interface Swatch {
  accent: string;
  key: SwatchKey;
}

const SWATCHES: Swatch[] = [
  { accent: "#F2B84B", key: "swatch1" },
  { accent: "#5EA2FF", key: "swatch2" },
  { accent: "#FF7A9E", key: "swatch3" },
  { accent: "#58D6A9", key: "swatch4" }
];

const DEFAULT_SWATCH: SwatchKey = "swatch1";

interface DemoProps {
  onDeploy: () => void;
}

export function Demo({ onDeploy }: DemoProps) {
  const { t } = useLanguage();
  const copy = useInView<HTMLDivElement>();
  const panel = useInView<HTMLDivElement>();
  const [selectedKey, setSelectedKey] = useState<SwatchKey>(DEFAULT_SWATCH);
  const [confirmed, setConfirmed] = useState(false);

  function pickSwatch(swatch: Swatch) {
    document.documentElement.style.setProperty("--accent", swatch.accent);
    setSelectedKey(swatch.key);
    setConfirmed(true);
    onDeploy();
  }

  const statusText = confirmed
    ? `${t[selectedKey as keyof Dictionary]} ${t.demoStatusLiveSuffix}`
    : t.demoStatusDefault;

  return (
    <section className="demo" id="demo">
      <div className="container demo-inner">
        <div ref={copy.ref} className={cx("demo-copy", "reveal", copy.inView && "in")}>
          <h2>{t.demoH2}</h2>
          <p>{t.demoP}</p>
        </div>
        <div ref={panel.ref} className={cx("demo-panel", "reveal", panel.inView && "in")}>
          <p className="demo-prompt">{t.demoPrompt}</p>
          <div className="swatches" role="group" aria-label="Accent color options">
            {SWATCHES.map((swatch) => (
              <button
                key={swatch.key}
                type="button"
                className="swatch"
                style={{ "--sw": swatch.accent } as CSSProperties}
                aria-pressed={selectedKey === swatch.key}
                onClick={() => pickSwatch(swatch)}
              >
                <span className="sw-dot" aria-hidden="true" />
                <span className="sw-label">{t[swatch.key]}</span>
              </button>
            ))}
          </div>
          <p className={cx("demo-status", confirmed && "confirmed")} aria-live="polite">
            {statusText}
          </p>
        </div>
      </div>
    </section>
  );
}
