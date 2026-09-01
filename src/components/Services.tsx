import "./Services.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useServicesCompass } from "../hooks/useServicesCompass";
import { useBuildYourOwn, BUILDER_PRESETS } from "../hooks/useBuildYourOwn";
import { useUpdateShip } from "../hooks/useUpdateShip";
import { useMaintainCheck } from "../hooks/useMaintainCheck";
import { cx } from "../lib/classNames";
import { ServicesCompass } from "./services/ServicesCompass";
import { ServiceDemoStage, type ServiceDemoKey } from "./services/ServiceDemoStage";
import type { BuilderHandoff } from "./Contact";

interface ServicePoint {
  key: ServiceDemoKey;
  label: string;
  description: string;
}

interface ServicesProps {
  onDeploy: () => void;
  onBuilderSubmit: (handoff: BuilderHandoff) => void;
}

export function Services({ onDeploy, onBuilderSubmit }: ServicesProps) {
  const { t } = useLanguage();
  const heading = useInView<HTMLHeadingElement>();
  const compassReveal = useInView<HTMLDivElement>();
  const stageReveal = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  const points: ServicePoint[] = [
    { key: "build", label: t.buildH3, description: t.buildP },
    { key: "update", label: t.updateH3, description: t.updateP },
    { key: "maintain", label: t.maintainH3, description: t.maintainP }
  ];

  const { activeIndex, setActiveIndex, angleForIndex } = useServicesCompass(points.length);
  const active = points[activeIndex];

  const { state: builderState, building, patch, applyPreset } = useBuildYourOwn(onDeploy);
  const { active: updateActive, runId: updateRunId, ship } = useUpdateShip(onDeploy);
  const {
    running: maintainRunning,
    runId: maintainRunId,
    doneIds: maintainDoneIds,
    hasRun: maintainHasRun,
    runCheck
  } = useMaintainCheck(onDeploy, reducedMotion);

  function handleApplyPreset(id: string) {
    const preset = BUILDER_PRESETS.find((p) => p.id === id);
    if (preset) applyPreset(preset);
  }

  function handleStart() {
    if (active.key !== "build") return;
    const name = builderState.name.trim();
    const tagline = builderState.tagline.trim();
    if (name || tagline) onBuilderSubmit({ name, tagline });
  }

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 ref={heading.ref} className={cx("reveal", heading.inView && "in")}>
          {t.servicesH2}
        </h2>
        <div className="services-compass-layout">
          <div
            ref={compassReveal.ref}
            className={cx("services-compass-wrap", "reveal", compassReveal.inView && "in")}
          >
            <ServicesCompass
              points={points.map((point) => ({ key: point.key, label: point.label }))}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              angleForIndex={angleForIndex}
            />
          </div>
          <div
            ref={stageReveal.ref}
            className={cx("services-stage-wrap", "reveal", stageReveal.inView && "in")}
          >
            <ServiceDemoStage
              activeKey={active.key}
              title={active.label}
              description={active.description}
              builder={{ state: builderState, building, onChange: patch, onApplyPreset: handleApplyPreset }}
              update={{ active: updateActive, runId: updateRunId, onShip: ship }}
              maintain={{
                running: maintainRunning,
                runId: maintainRunId,
                doneIds: maintainDoneIds,
                hasRun: maintainHasRun,
                onRun: runCheck
              }}
              onStart={handleStart}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
