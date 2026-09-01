import "./Care.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import { useCarePulse } from "../hooks/useCarePulse";
import { cx } from "../lib/classNames";

export function Care() {
  const { t } = useLanguage();
  const pulse = useCarePulse();
  const heading = useInView<HTMLHeadingElement>();
  const facts = useInView<HTMLDivElement>();

  return (
    <section className={cx("care", pulse.inView && "in-view")} id="care" ref={pulse.ref}>
      <svg className="pulse" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          id="pulsePath"
          d="M0,60 L280,60 L310,60 L330,24 L352,96 L372,60 L420,60 L680,60 L710,60 L730,30 L752,90 L772,60 L1200,60"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
        />
      </svg>
      <div className="container care-inner">
        <h2
          ref={heading.ref}
          className={cx("reveal", heading.inView && "in")}
          dangerouslySetInnerHTML={{ __html: t.careH2 }}
        />
        <div ref={facts.ref} className={cx("care-facts", "reveal", facts.inView && "in")}>
          <div className="fact">
            <h3>{t.fact1H3}</h3>
            <p>{t.fact1P}</p>
          </div>
          <div className="fact">
            <h3>{t.fact2H3}</h3>
            <p>{t.fact2P}</p>
          </div>
          <div className="fact">
            <h3>{t.fact3H3}</h3>
            <p>{t.fact3P}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
