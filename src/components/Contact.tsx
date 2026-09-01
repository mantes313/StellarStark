import "./Contact.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import { cx } from "../lib/classNames";

export interface BuilderHandoff {
  name: string;
  tagline: string;
}

interface ContactProps {
  handoff: BuilderHandoff | null;
}

function buildMailtoHref(handoff: BuilderHandoff | null): string {
  if (!handoff || (!handoff.name && !handoff.tagline)) {
    return "mailto:hello@stellarstark.com";
  }
  const who = handoff.name || "my business";
  const subject = `New project: ${handoff.name || "my page"}`;
  const body = [
    "Hi StellarStark,",
    "",
    `I started building a page for "${who}"${handoff.tagline ? ` — "${handoff.tagline}"` : ""} on your site and want to make it real.`,
    ""
  ].join("\n");
  return `mailto:hello@stellarstark.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact({ handoff }: ContactProps) {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="contact" id="contact">
      <div ref={ref} className={cx("container", "contact-inner", "reveal", inView && "in")}>
        <h2>{t.contactH2}</h2>
        <p>{t.contactP}</p>
        {handoff && (handoff.name || handoff.tagline) && (
          <p className="contact-builder-note">{t.contactBuilderNote}</p>
        )}
        <a className="btn btn-primary btn-big" href={buildMailtoHref(handoff)}>
          hello@stellarstark.com
        </a>
      </div>
    </section>
  );
}
