import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import "./ServicesCompass.css";
import { cx } from "../../lib/classNames";

export interface CompassPoint {
  key: string;
  label: string;
}

interface ServicesCompassProps {
  points: CompassPoint[];
  activeIndex: number;
  onSelect: (index: number) => void;
  angleForIndex: (index: number) => number;
}

export function ServicesCompass({ points, activeIndex, onSelect, angleForIndex }: ServicesCompassProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // The needle div points "up" (0deg = north) by default, while
  // angleForIndex uses the cos()/sin() convention where 0deg = east.
  // Rotating the needle by (angle + 90) lines the two conventions up.
  const needleAngle = angleForIndex(activeIndex) + 90;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % points.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + points.length) % points.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = points.length - 1;

    if (next !== null) {
      event.preventDefault();
      onSelect(next);
      buttonRefs.current[next]?.focus();
    }
  }

  return (
    <div className="compass" style={{ "--needle-angle": `${needleAngle}deg` } as CSSProperties}>
      <svg className="compass-dial" viewBox="0 0 200 200" aria-hidden="true">
        <circle className="compass-ring" cx="100" cy="100" r="88" />
        <circle className="compass-ticks" cx="100" cy="100" r="96" />
        <circle className="compass-hub" cx="100" cy="100" r="5" />
      </svg>

      <div className="compass-needle" aria-hidden="true" />

      <div className="compass-points" role="group" aria-label="Services">
        {points.map((point, index) => (
          <button
            key={point.key}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            className={cx("compass-point", index === activeIndex && "active")}
            style={{ "--angle": `${angleForIndex(index)}deg` } as CSSProperties}
            aria-pressed={index === activeIndex}
            aria-label={point.label}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onSelect(index)}
            onFocus={() => onSelect(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {point.label}
          </button>
        ))}
      </div>
    </div>
  );
}
