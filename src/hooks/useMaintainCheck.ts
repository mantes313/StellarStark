import { useCallback, useEffect, useRef, useState } from "react";

export type MaintainCheckId = "backup" | "patch" | "uptime";

export const MAINTAIN_CHECK_IDS: MaintainCheckId[] = ["backup", "patch", "uptime"];

const STEP_MS = 450;

/** Drives the visitor-triggered "run a maintenance pass" mini-tool: ticks
 * the checklist items on one at a time, then flips back to idle so the
 * button reads "Run again". Pass reducedMotion so the whole sequence
 * resolves instantly instead of staggering. */
export function useMaintainCheck(onRun: (() => void) | undefined, reducedMotion: boolean) {
  const [running, setRunning] = useState(false);
  const [runId, setRunId] = useState(0);
  const [doneIds, setDoneIds] = useState<MaintainCheckId[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const runCheck = useCallback(() => {
    if (running) return;
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current = [];

    setRunning(true);
    setDoneIds([]);
    setRunId((n) => n + 1);
    onRun?.();

    const stepMs = reducedMotion ? 0 : STEP_MS;

    MAINTAIN_CHECK_IDS.forEach((id, index) => {
      const timeoutId = window.setTimeout(
        () => setDoneIds((prev) => [...prev, id]),
        stepMs * (index + 1)
      );
      timeouts.current.push(timeoutId);
    });

    const finalTimeout = window.setTimeout(() => {
      setRunning(false);
      setHasRun(true);
    }, stepMs * (MAINTAIN_CHECK_IDS.length + 1));
    timeouts.current.push(finalTimeout);
  }, [onRun, reducedMotion, running]);

  return { running, runId, doneIds, hasRun, runCheck } as const;
}
