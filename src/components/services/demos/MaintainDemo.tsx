import "./MaintainDemo.css";
import { cx } from "../../../lib/classNames";
import { useLanguage } from "../../../i18n/LanguageContext";

interface MaintainDemoProps {
  reducedMotion: boolean;
  running: boolean;
  runId: number;
  hasRun: boolean;
}

/** Mock page for the "run a maintenance pass" tool: resting state shows an
 * un-patched version; pressing the button in MaintainControls plays a
 * version bump, a shield locking in, and the content quietly refreshing. */
export function MaintainDemo({ reducedMotion, running, runId, hasRun }: MaintainDemoProps) {
  const { t } = useLanguage();
  const settled = hasRun && !running;
  const animating = running && !reducedMotion;

  return (
    <div className={cx("maintain-demo", reducedMotion && "is-static", settled && "is-done")}>
      <div className="maintain-demo-topbar">
        <div className="maintain-demo-version">
          <span key={runId} className={cx("maintain-demo-version-track", animating && "is-running-anim")}>
            <span>v2.3</span>
            <span>v2.4</span>
          </span>
        </div>
        <svg className="maintain-demo-shield" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            key={`path-${runId}`}
            className={cx("maintain-demo-shield-path", animating && "is-running-anim")}
            d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            pathLength={100}
          />
          <path
            key={`check-${runId}`}
            className={cx("maintain-demo-shield-check", animating && "is-running-anim")}
            d="M8.5 12 L11 14.5 L16 9"
            stroke="currentColor"
            strokeWidth="1.5"
            pathLength={100}
          />
        </svg>
      </div>
      <div className="maintain-demo-content">
        <p key={`old-${runId}`} className={cx("maintain-demo-line", "maintain-demo-line-old", animating && "is-running-anim")}>
          {t.maintainContentOld}
        </p>
        <p key={`new-${runId}`} className={cx("maintain-demo-line", "maintain-demo-line-new", animating && "is-running-anim")}>
          {t.maintainContentNew}
        </p>
      </div>
    </div>
  );
}
