import { useEffect, useRef, useState } from "react";

type WakeLockSentinelLike = EventTarget & {
  released: boolean;
  release: () => Promise<void>;
};

type WakeLockNavigator = Navigator & {
  wakeLock?: {
    request: (type: "screen") => Promise<WakeLockSentinelLike>;
  };
};

export function useWakeLock(active: boolean) {
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null);
  const [isHeld, setIsHeld] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const release = async () => {
      if (sentinelRef.current && !sentinelRef.current.released) {
        await sentinelRef.current.release();
      }
      sentinelRef.current = null;
      if (!cancelled) setIsHeld(false);
    };

    const request = async () => {
      const wakeLock = (navigator as WakeLockNavigator).wakeLock;
      if (!active || !wakeLock || document.visibilityState !== "visible") return;

      try {
        const sentinel = await wakeLock.request("screen");
        if (cancelled) {
          await sentinel.release();
          return;
        }
        sentinelRef.current = sentinel;
        setIsHeld(true);
        sentinel.addEventListener("release", () => setIsHeld(false), { once: true });
      } catch (error) {
        console.error("Screen wake lock could not be acquired.", error);
        setIsHeld(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void request();
      }
    };

    if (active) {
      void request();
      document.addEventListener("visibilitychange", handleVisibilityChange);
    } else {
      void release();
    }

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      void release();
    };
  }, [active]);

  return isHeld;
}
