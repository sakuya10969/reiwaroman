import { useEffect, useMemo, useState } from "react";

import TopsCatch from "@/components/tops/TopsCatch";
import TopsVisual from "@/components/tops/TopsVisual";
import logo5 from "@/assets/logo_5.png";

interface Slot {
  key: "catch" | "visual";
  durationMs: number;
}

const SLOTS: Slot[] = [
  { key: "catch",  durationMs: 10000 },
  { key: "visual", durationMs: 20000 },
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
    <div className="relative w-screen min-h-[40vh] sm:min-h-[60vh] md:min-h-[70vh] lg:h-screen">
      <div className={[ "absolute inset-0 transition-opacity duration-1500 ease-linear", isCatch ? "opacity-100" : "opacity-0"].join(" ")}>
        <TopsCatch />
      </div>

      <div className={[ "relative w-screen min-h-[40vh] sm:min-h-[60vh] md:min-h-[70vh] lg:h-screen transition-opacity duration-1500 ease-linear", isVisual ? "opacity-100" : "opacity-0"].join(" ")}>
        <TopsVisual key={visualCycle} resetSignal={visualCycle} active={isVisual} />
      </div>

      {/* ロゴを下部に配置 */}
      <div className="absolute bottom-5 sm:bottom-10 md:bottom-15 lg:bottom-30 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src={logo5} 
          alt="Logo"
          className="h-18 md:h-20 w-40 md:w-48"
        />
      </div>
    </div>
  );
};

export default TopsRotator;
