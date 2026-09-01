import { useCallback, useState } from "react";

export type UpdateRequestId = "menu" | "hours" | "phone" | "photo";

export interface UpdateRequest {
  id: UpdateRequestId;
  icon: string;
  labelKey: "updateReqMenuLabel" | "updateReqHoursLabel" | "updateReqPhoneLabel" | "updateReqPhotoLabel";
  headlineKey: "updateReqMenuHeadline" | "updateReqHoursHeadline" | "updateReqPhoneHeadline" | "updateReqPhotoHeadline";
  bodyKey: "updateReqMenuBody" | "updateReqHoursBody" | "updateReqPhoneBody" | "updateReqPhotoBody";
}

export const UPDATE_REQUESTS: UpdateRequest[] = [
  {
    id: "menu",
    icon: "🍽️",
    labelKey: "updateReqMenuLabel",
    headlineKey: "updateReqMenuHeadline",
    bodyKey: "updateReqMenuBody"
  },
  {
    id: "hours",
    icon: "🎄",
    labelKey: "updateReqHoursLabel",
    headlineKey: "updateReqHoursHeadline",
    bodyKey: "updateReqHoursBody"
  },
  {
    id: "phone",
    icon: "📞",
    labelKey: "updateReqPhoneLabel",
    headlineKey: "updateReqPhoneHeadline",
    bodyKey: "updateReqPhoneBody"
  },
  {
    id: "photo",
    icon: "📸",
    labelKey: "updateReqPhotoLabel",
    headlineKey: "updateReqPhotoHeadline",
    bodyKey: "updateReqPhotoBody"
  }
];

/** Drives the "ship a change" mini-tool in the Update service panel. Each
 * pick swaps in that request's content and bumps `runId` so the mock page's
 * wipe-reveal animation replays from scratch (see UpdateDemo.css). */
export function useUpdateShip(onShip?: () => void) {
  const [activeId, setActiveId] = useState<UpdateRequestId | null>(null);
  const [runId, setRunId] = useState(0);

  const ship = useCallback(
    (id: UpdateRequestId) => {
      setActiveId(id);
      setRunId((n) => n + 1);
      onShip?.();
    },
    [onShip]
  );

  const active = UPDATE_REQUESTS.find((r) => r.id === activeId) ?? null;

  return { active, runId, ship } as const;
}
