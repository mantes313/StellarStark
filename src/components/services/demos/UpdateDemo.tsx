import "./UpdateDemo.css";
import { cx } from "../../../lib/classNames";
import { useLanguage } from "../../../i18n/LanguageContext";
import type { UpdateRequest } from "../../../hooks/useUpdateShip";

interface UpdateDemoProps {
  reducedMotion: boolean;
  active: UpdateRequest | null;
  runId: number;
}

/** Mock page for the "ship a change" tool: an old, muted version of the
 * page sits underneath; picking a request wipes in fresh headline/body
 * text for that request, replaying the reveal each time (see runId key). */
export function UpdateDemo({ reducedMotion, active, runId }: UpdateDemoProps) {
  const { t } = useLanguage();

  return (
    <div className={cx("update-demo", reducedMotion && "is-static", active && "is-revealed")}>
      <div className="update-demo-old">
        <p className="update-demo-h">{t.updateOldHeadline}</p>
        <p className="update-demo-b">{t.updateOldBody}</p>
      </div>
      {active && (
        <div key={runId} className="update-demo-new">
          <p className="update-demo-h">{t[active.headlineKey]}</p>
          <p className="update-demo-b">{t[active.bodyKey]}</p>
        </div>
      )}
      {active && !reducedMotion && <div key={`sweep-${runId}`} className="update-demo-sweep" />}
    </div>
  );
}
