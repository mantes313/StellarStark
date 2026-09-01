import "./UpdateControls.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { cx } from "../../lib/classNames";
import { UPDATE_REQUESTS, type UpdateRequest } from "../../hooks/useUpdateShip";
import type { Dictionary } from "../../i18n/translations";

interface UpdateControlsProps {
  active: UpdateRequest | null;
  onShip: (id: UpdateRequest["id"]) => void;
}

export function UpdateControls({ active, onShip }: UpdateControlsProps) {
  const { t } = useLanguage();
  const statusText = active
    ? `${t[active.labelKey as keyof Dictionary]} ${t.updateStatusLiveSuffix}`
    : t.updatePromptDefault;

  return (
    <div className="update-controls">
      <p className="update-controls-intro">
        <span className="update-controls-intro-label">{t.updateTryLabel}</span>
        {t.updateTrySub}
      </p>
      <div className="update-requests" role="group" aria-label={t.updateRequestAria}>
        {UPDATE_REQUESTS.map((request) => (
          <button
            key={request.id}
            type="button"
            className={cx("update-request-chip", active?.id === request.id && "active")}
            aria-pressed={active?.id === request.id}
            onClick={() => onShip(request.id)}
          >
            <span aria-hidden="true">{request.icon}</span>
            {t[request.labelKey]}
          </button>
        ))}
      </div>
      <p className={cx("update-status", active && "shipped")} aria-live="polite">
        {statusText}
      </p>
    </div>
  );
}
