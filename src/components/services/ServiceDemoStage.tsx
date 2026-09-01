import "./ServiceDemoStage.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { DemoBrowserFrame } from "./DemoBrowserFrame";
import { BuildDemo } from "./demos/BuildDemo";
import { UpdateDemo } from "./demos/UpdateDemo";
import { MaintainDemo } from "./demos/MaintainDemo";
import { BuildControls } from "./BuildControls";
import { UpdateControls } from "./UpdateControls";
import { MaintainControls } from "./MaintainControls";
import type { BuilderState } from "../../hooks/useBuildYourOwn";
import type { UpdateRequest, UpdateRequestId } from "../../hooks/useUpdateShip";
import type { MaintainCheckId } from "../../hooks/useMaintainCheck";

export type ServiceDemoKey = "build" | "update" | "maintain";

interface BuilderBundle {
  state: BuilderState;
  building: boolean;
  onChange: (patch: Partial<BuilderState>) => void;
  onApplyPreset: (id: string) => void;
}

interface UpdateBundle {
  active: UpdateRequest | null;
  runId: number;
  onShip: (id: UpdateRequestId) => void;
}

interface MaintainBundle {
  running: boolean;
  runId: number;
  doneIds: MaintainCheckId[];
  hasRun: boolean;
  onRun: () => void;
}

interface ServiceDemoStageProps {
  activeKey: ServiceDemoKey;
  title: string;
  description: string;
  builder: BuilderBundle;
  update: UpdateBundle;
  maintain: MaintainBundle;
  onStart: () => void;
}

export function ServiceDemoStage({
  activeKey,
  title,
  description,
  builder,
  update,
  maintain,
  onStart
}: ServiceDemoStageProps) {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <div className="service-stage">
      <DemoBrowserFrame>
        {activeKey === "build" && (
          <BuildDemo reducedMotion={reducedMotion} state={builder.state} building={builder.building} />
        )}
        {activeKey === "update" && (
          <UpdateDemo reducedMotion={reducedMotion} active={update.active} runId={update.runId} />
        )}
        {activeKey === "maintain" && (
          <MaintainDemo
            reducedMotion={reducedMotion}
            running={maintain.running}
            runId={maintain.runId}
            hasRun={maintain.hasRun}
          />
        )}
      </DemoBrowserFrame>
      <div className="service-stage-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        {activeKey === "build" && (
          <BuildControls state={builder.state} onChange={builder.onChange} onApplyPreset={builder.onApplyPreset} />
        )}
        {activeKey === "update" && <UpdateControls active={update.active} onShip={update.onShip} />}
        {activeKey === "maintain" && (
          <MaintainControls
            running={maintain.running}
            doneIds={maintain.doneIds}
            hasRun={maintain.hasRun}
            onRun={maintain.onRun}
          />
        )}
        <a className="btn btn-primary" href="#contact" onClick={onStart}>
          {activeKey === "build" ? t.buildCtaStart : t.navStart}
        </a>
      </div>
    </div>
  );
}
