import { useLayoutEffect, useRef, useState } from "react";

import type { TopsVisualProps } from "@/types";
import reiwa2 from "@/assets/top1.jpg";
import tops_visual_1 from "@/assets/top1_mobile.jpg";

const TopsVisual = ({ resetSignal = 0, active = true }: TopsVisualProps) => {
  const [primed, setPrimed] = useState<boolean>(false);
  const raf1 = useRef<number | null>(null);
  const raf2 = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!active) return;
    setPrimed(false);
    raf1.current = window.requestAnimationFrame(() => {
      raf2.current = window.requestAnimationFrame(() => setPrimed(true));
    });
    return () => {
      if (raf1.current) cancelAnimationFrame(raf1.current);
      if (raf2.current) cancelAnimationFrame(raf2.current);
      raf1.current = raf2.current = null;
    };
  }, [resetSignal, active]);

  return (
    <div
      className={[
        "relative w-full bg-black h-screen landscape:h-screen",
        primed ? "opacity-100" : "opacity-0",
        "transition-opacity duration-0",
      ].join(" ")}
    >
      {/* 画像ステージ */}
      <div className="relative w-full h-full">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <picture className="absolute inset-0">
            <source media="(max-width: 440px)" srcSet={tops_visual_1} />
            <img
              src={reiwa2}
              alt="Top Visual"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default TopsVisual;
