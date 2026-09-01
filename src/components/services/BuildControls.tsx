import type { CSSProperties } from "react";
import "./BuildControls.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { cx } from "../../lib/classNames";
import {
  ACCENT_OPTIONS,
  BUILDER_PRESETS,
  type BuildLayout,
  type BuilderState
} from "../../hooks/useBuildYourOwn";

const LAYOUTS: { key: BuildLayout; labelKey: "buildLayoutBold" | "buildLayoutSplit" | "buildLayoutMinimal" }[] = [
  { key: "bold", labelKey: "buildLayoutBold" },
  { key: "split", labelKey: "buildLayoutSplit" },
  { key: "minimal", labelKey: "buildLayoutMinimal" }
];

interface BuildControlsProps {
  state: BuilderState;
  onChange: (patch: Partial<BuilderState>) => void;
  onApplyPreset: (presetId: string) => void;
}

export function BuildControls({ state, onChange, onApplyPreset }: BuildControlsProps) {
  const { t } = useLanguage();

  return (
    <div className="build-controls">
      <p className="build-controls-intro">
        <span className="build-controls-intro-label">{t.buildYourOwnLabel}</span>
        {t.buildYourOwnSub}
      </p>
      <div className="build-controls-presets" role="group" aria-label={t.buildPresetAria}>
        {BUILDER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="build-preset-chip"
            onClick={() => onApplyPreset(preset.id)}
          >
            <span aria-hidden="true">{preset.icon}</span>
            {t[preset.labelKey]}
          </button>
        ))}
      </div>

      <div className="build-controls-row">
        <label className="build-field">
          <span className="build-field-label">{t.buildNameLabel}</span>
          <input
            type="text"
            className="build-field-input"
            value={state.name}
            placeholder={t.buildNamePlaceholder}
            maxLength={40}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </label>
        <label className="build-field">
          <span className="build-field-label">{t.buildTaglineLabel}</span>
          <input
            type="text"
            className="build-field-input"
            value={state.tagline}
            placeholder={t.buildTaglinePlaceholder}
            maxLength={70}
            onChange={(e) => onChange({ tagline: e.target.value })}
          />
        </label>
      </div>

      <div className="build-controls-row build-controls-row-compact">
        <div className="build-layouts" role="group" aria-label={t.buildLayoutAria}>
          {LAYOUTS.map((layout) => (
            <button
              key={layout.key}
              type="button"
              className={cx("build-layout-btn", state.layout === layout.key && "active")}
              aria-pressed={state.layout === layout.key}
              onClick={() => onChange({ layout: layout.key })}
            >
              {t[layout.labelKey]}
            </button>
          ))}
        </div>

        <div className="build-accents" role="group" aria-label={t.buildAccentAria}>
          {ACCENT_OPTIONS.map((accent) => (
            <button
              key={accent}
              type="button"
              className={cx("build-accent-dot", state.accent === accent && "active")}
              style={{ "--dot": accent } as CSSProperties}
              aria-pressed={state.accent === accent}
              aria-label={accent}
              onClick={() => onChange({ accent })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
