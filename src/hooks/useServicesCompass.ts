import { useCallback, useState } from "react";

// Angle convention here matches CSS cos()/sin(): 0deg = east (3 o'clock),
// positive = clockwise (screen Y grows downward). Starting at -90deg puts
// the first point at the top (12 o'clock), then points are spaced evenly
// around the full circle.
const START_ANGLE_DEG = -90;

export function useServicesCompass(pointCount: number) {
  const [activeIndex, setActiveIndexState] = useState(0);

  const angleForIndex = useCallback(
    (index: number) => START_ANGLE_DEG + index * (360 / pointCount),
    [pointCount]
  );

  const setActiveIndex = useCallback(
    (index: number) => {
      setActiveIndexState(((index % pointCount) + pointCount) % pointCount);
    },
    [pointCount]
  );

  return { activeIndex, setActiveIndex, angleForIndex } as const;
}
