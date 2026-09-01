import { useEffect, useState } from "react";
import "./Work.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import { cx } from "../lib/classNames";
import type { Dictionary } from "../i18n/translations";

interface OwnExample {
  id: string;
  file: string;
  icon: string;
  h3Key: "demo1H3" | "demo2H3" | "demo3H3" | "demo4H3";
  tagKey: "demo1Tag" | "demo2Tag" | "demo3Tag" | "demo4Tag";
  pKey: "demo1P" | "demo2P" | "demo3P" | "demo4P";
}

const OWN_EXAMPLES: OwnExample[] = [
  {
    id: "auto-ac",
    file: "/psl/auto-kondicionieriai-interaktyvus.html",
    icon: "❄️",
    h3Key: "demo1H3",
    tagKey: "demo1Tag",
    pKey: "demo1P"
  },
  {
    id: "beauty-salon",
    file: "/psl/grozio-salonas-sasnavos.html",
    icon: "💅",
    h3Key: "demo2H3",
    tagKey: "demo2Tag",
    pKey: "demo2P"
  },
  {
    id: "masarena",
    file: "/psl/masarena-interaktyvus.html",
    icon: "💆",
    h3Key: "demo3H3",
    tagKey: "demo3Tag",
    pKey: "demo3P"
  },
  {
    id: "vm-remontas",
    file: "/psl/vm-remonto-dirbtuves.html",
    icon: "🔧",
    h3Key: "demo4H3",
    tagKey: "demo4Tag",
    pKey: "demo4P"
  }
];

interface ClientProject {
  id: string;
  name: string;
  url: string;
}

// Add real client sites here as they're ready to show: { id, name, url }
const CLIENT_PROJECTS: ClientProject[] = [];

interface PreviewTarget {
  title: string;
  src: string;
}

function PreviewModal({
  target,
  onClose,
  t
}: {
  target: PreviewTarget;
  onClose: () => void;
  t: Dictionary;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="work-modal-backdrop" onClick={onClose}>
      <div className="work-modal" onClick={(e) => e.stopPropagation()}>
        <div className="work-modal-bar">
          <span className="work-modal-title">{target.title}</span>
          <div className="work-modal-actions">
            <a
              className="btn btn-ghost btn-small"
              href={target.src}
              target="_blank"
              rel="noreferrer"
            >
              {t.workOpenNewTab}
            </a>
            <button
              className="work-modal-close"
              onClick={onClose}
              aria-label={t.workCloseAria}
              type="button"
            >
              ×
            </button>
          </div>
        </div>
        <iframe className="work-modal-frame" src={target.src} title={target.title} />
      </div>
    </div>
  );
}

function OwnExampleCard({ item, onOpen }: { item: OwnExample; onOpen: (t: PreviewTarget) => void }) {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      className={cx("work-tile", "reveal", inView && "in")}
      onClick={() => onOpen({ title: t[item.h3Key], src: item.file })}
      aria-label={`${t.workOpenAria}: ${t[item.h3Key]}`}
    >
      <span className="work-tile-icon" aria-hidden="true">
        {item.icon}
      </span>
      <span className="work-tile-body">
        <span className="work-tile-tag">{t[item.tagKey]}</span>
        <span className="work-tile-h3">{t[item.h3Key]}</span>
        <span className="work-tile-p">{t[item.pKey]}</span>
      </span>
    </button>
  );
}

function ClientProjectRow({
  item,
  onOpen
}: {
  item: ClientProject;
  onOpen: (t: PreviewTarget) => void;
}) {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      className={cx("work-client-row", "reveal", inView && "in")}
      onClick={() => onOpen({ title: item.name, src: item.url })}
      aria-label={`${t.workOpenAria}: ${item.name}`}
    >
      <span className="work-client-name">{item.name}</span>
      <span className="work-client-url">{item.url.replace(/^https?:\/\//, "")}</span>
    </button>
  );
}

export function Work() {
  const { t } = useLanguage();
  const heading = useInView<HTMLHeadingElement>();
  const [preview, setPreview] = useState<PreviewTarget | null>(null);

  return (
    <section className="work" id="work">
      <div className="container">
        <h2 ref={heading.ref} className={cx("reveal", heading.inView && "in")}>
          {t.workH2}
        </h2>
        <div className="work-columns">
          <div className="work-own">
            <h3 className="work-col-h3">{t.workOwnLabel}</h3>
            <p className="work-col-sub">{t.workOwnSub}</p>
            <div className="work-tile-grid">
              {OWN_EXAMPLES.map((item) => (
                <OwnExampleCard key={item.id} item={item} onOpen={setPreview} />
              ))}
            </div>
          </div>
          <div className="work-clients">
            <h3 className="work-col-h3">{t.workClientLabel}</h3>
            <p className="work-col-sub">{t.workClientSub}</p>
            <div className="work-client-list">
              {CLIENT_PROJECTS.length === 0 ? (
                <p className="work-client-empty">{t.workClientComingSoon}</p>
              ) : (
                CLIENT_PROJECTS.map((item) => (
                  <ClientProjectRow key={item.id} item={item} onOpen={setPreview} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {preview && <PreviewModal target={preview} onClose={() => setPreview(null)} t={t} />}
    </section>
  );
}
