import { useCallback, useRef, useState } from "react";

export type BuildLayout = "bold" | "split" | "minimal";

export interface BuilderState {
  name: string;
  tagline: string;
  accent: string;
  layout: BuildLayout;
}

export interface BuilderPreset {
  id: string;
  icon: string;
  labelKey: "buildPresetAuto" | "buildPresetSalon" | "buildPresetMassage" | "buildPresetRepair";
  name: string;
  tagline: string;
  accent: string;
  layout: BuildLayout;
}

export const ACCENT_OPTIONS = ["#F2B84B", "#5EA2FF", "#FF7A9E", "#58D6A9"];

export const BUILDER_PRESETS: BuilderPreset[] = [
  {
    id: "auto",
    icon: "❄️",
    labelKey: "buildPresetAuto",
    name: "AutoCool Service",
    tagline: "AC repair & diagnostics, same day.",
    accent: "#5EA2FF",
    layout: "split"
  },
  {
    id: "salon",
    icon: "💅",
    labelKey: "buildPresetSalon",
    name: "Bloom Beauty Salon",
    tagline: "Manicures and gel polish, booked online.",
    accent: "#FF7A9E",
    layout: "bold"
  },
  {
    id: "massage",
    icon: "💆",
    labelKey: "buildPresetMassage",
    name: "MasaRena Studio",
    tagline: "Therapeutic massage, 15+ years experience.",
    accent: "#58D6A9",
    layout: "minimal"
  },
  {
    id: "repair",
    icon: "🔧",
    labelKey: "buildPresetRepair",
    name: "V.M. Repair Workshop",
    tagline: "Appliance repair with honest pricing.",
    accent: "#F2B84B",
    layout: "split"
  }
];

const DEFAULT_STATE: BuilderState = {
  name: "",
  tagline: "",
  accent: ACCENT_OPTIONS[0],
  layout: "bold"
};

const BUILDING_TIMEOUT_MS = 650;

/** Drives the "build your own page" mini-tool in the Services section.
 * Any patch flips `building` on and debounces it back off, so the preview
 * gets a brief "constructing" pulse while edits are still coming in. */
export function useBuildYourOwn(onChange?: () => void) {
  const [state, setState] = useState<BuilderState>(DEFAULT_STATE);
  const [building, setBuilding] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const patch = useCallback(
    (next: Partial<BuilderState>) => {
      setState((prev) => ({ ...prev, ...next }));
      setBuilding(true);
      onChange?.();
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setBuilding(false), BUILDING_TIMEOUT_MS);
    },
    [onChange]
  );

  const applyPreset = useCallback(
    (preset: BuilderPreset) => {
      patch({ name: preset.name, tagline: preset.tagline, accent: preset.accent, layout: preset.layout });
    },
    [patch]
  );

  return { state, building, patch, applyPreset } as const;
}
