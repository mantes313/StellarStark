import "./MaintainControls.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { cx } from "../../lib/classNames";
import { MAINTAIN_CHECK_IDS, type MaintainCheckId } from "../../hooks/useMaintainCheck";
import type { Dictionary } from "../../i18n/translations";

const CHECK_LABEL_KEYS: Record<MaintainCheckId, keyof Dictionary> = {
  backup: "maintainCheckBackup",
  patch: "maintainCheckPatch",
  uptime: "maintainCheckUptime"
};

interface MaintainControlsProps {
  running: boolean;
  doneIds: MaintainCheckId[];
  hasRun: boolean;
  onRun: () => void;
}

export function MaintainControls({ running, doneIds, hasRun, onRun }: MaintainControlsProps) {
  const { t } = useLanguage();
  const buttonLabel = running ? t.maintainRunningBtn : hasRun ? t.maintainRunAgainBtn : t.maintainRunBtn;

  return (
    <div className="maintain-controls">
      <p className="maintain-controls-intro">
        <span className="maintain-controls-intro-label">{t.maintainTryLabel}</span>
        {t.maintainTrySub}
      </p>
      <ul className="maintain-checklist">
        {MAINTAIN_CHECK_IDS.map((id) => (
          <li key={id} className={cx("maintain-checklist-item", doneIds.includes(id) && "done")}>
            <span className="maintain-checklist-mark" aria-hidden="true" />
            {t[CHECK_LABEL_KEYS[id]]}
          </li>
        ))}
      </ul>
      <div className="maintain-controls-footer">
        <button type="button" className="btn btn-ghost btn-small" disabled={running} onClick={onRun}>
          {buttonLabel}
        </button>
        <p className={cx("maintain-status", hasRun && !running && "done")} aria-live="polite">
          {hasRun && !running ? t.maintainStatusDone : t.maintainStatusIdle}
        </p>
      </div>
    </div>
  );
}
