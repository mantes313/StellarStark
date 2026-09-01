import type { ReactNode } from "react";
import "./DemoBrowserFrame.css";

interface DemoBrowserFrameProps {
  children: ReactNode;
}

/** Purely decorative mock-browser chrome shared by every service mini-demo.
 * Hidden from assistive tech: the real, accessible copy for the active
 * service lives next to it in ServiceDemoStage. */
export function DemoBrowserFrame({ children }: DemoBrowserFrameProps) {
  return (
    <div className="demo-browser" aria-hidden="true">
      <div className="demo-browser-bar">
        <span className="demo-browser-dot" />
        <span className="demo-browser-dot" />
        <span className="demo-browser-dot" />
        <span className="demo-browser-url" />
      </div>
      <div className="demo-browser-viewport">{children}</div>
    </div>
  );
}
