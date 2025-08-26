import { useEffect, useMemo, useState } from "react";
import TopsCatch from "@/components/top/TopsCatch";
import TopsVisual from "@/components/top/TopsVisual";

interface Slot {
  key: "catch" | "visual";
  durationMs: number;
}

const SLOTS: Slot[] = [
  { key: "catch",  durationMs: 10000 },
  { key: "visual", durationMs: 20000 },
];

const TopsRotator = () => {
  const [idx, setIdx] = useState(0);
  const [visualCycle, setVisualCycle] = useState(0); // リセットトークン
  const current = useMemo(() => SLOTS[idx], [idx]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (idx + 1) % SLOTS.length;
      if (SLOTS[next].key === "visual") setVisualCycle(v => v + 1);
      setIdx(next);
    }, current.durationMs);
    return () => clearTimeout(timer);
  }, [idx, current.durationMs]);

  const isCatch  = current.key === "catch";
  const isVisual = current.key === "visual";

  return (
    <div className="relative w-full h-[40vh] sm:h-[100vh]">
      <div
        className={[
          "absolute inset-0 transition-opacity duration-1500 ease-linear",
          isCatch ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <TopsCatch />
      </div>

      <div
        className={[
          "absolute inset-0 transition-opacity duration-1500 ease-linear",
          isVisual ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {/* key で毎回クリーンマウント、active で内部制御 */}
        <TopsVisual key={visualCycle} resetSignal={visualCycle} active={isVisual} />
      </div>
    </div>
  );
};

export default TopsRotator;
