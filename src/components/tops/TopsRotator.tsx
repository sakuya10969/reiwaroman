import { useEffect, useMemo, useState } from "react";

import TopsCatch from "@/components/tops/TopsCatch";
import TopsVisual from "@/components/tops/TopsVisual";
import logo5 from "@/assets/logo_5.png";

interface Slot {
  key: "catch" | "visual";
  durationMs: number;
}

const SLOTS: Slot[] = [
  { key: "catch",  durationMs: 5000 },
  { key: "visual", durationMs: 10000 },
];

const TopsRotator = () => {
  const [idx, setIdx] = useState<number>(0);
  const [visualCycle, setVisualCycle] = useState<number>(0);
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
    <div className="relative w-screen h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen">
      <div className={[ "absolute inset-0 transition-opacity duration-1500 ease-linear", isCatch ? "opacity-100" : "opacity-0"].join(" ")}>
        <TopsCatch />
      </div>

      <div className={[ "relative transition-opacity duration-1500 ease-linear", isVisual ? "opacity-100" : "opacity-0"].join(" ")}>
        <TopsVisual key={visualCycle} resetSignal={visualCycle} active={isVisual} />
      </div>

      {/* ロゴを下部に配置 */}
      <div className="absolute bottom-10 sm:bottom-15 md:bottom-20 lg:bottom-25 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src={logo5} 
          alt="Logo"
          className="h-18 w-40 md:h-20 md:w-48 lg:h-40 lg:w-80"
        />
      </div>
    </div>
  );
};

export default TopsRotator;
