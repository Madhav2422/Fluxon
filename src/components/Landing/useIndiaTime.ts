"use client";

import { useEffect, useState } from "react";

/**
 * Current time in India (e.g. "11:05 AM"), refreshed every 30 seconds.
 * Returns null during server rendering and until the first tick, so hydration is safe.
 * Pass `active = false` to stop ticking (e.g. while the element is off-screen).
 */
export function useIndiaTime(active = true) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const format = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(format.format(new Date()).toUpperCase());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [active]);

  return time;
}
