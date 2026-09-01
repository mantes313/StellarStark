import type { RefObject } from "react";
import "./DeployBar.css";

interface DeployBarProps {
  deployBarRef: RefObject<HTMLDivElement>;
}

export function DeployBar({ deployBarRef }: DeployBarProps) {
  return <div className="deploy-bar" ref={deployBarRef} aria-hidden="true" />;
}
