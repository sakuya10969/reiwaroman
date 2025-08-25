import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Slide, TopsVisualProps } from "@/types";
import reiwa2 from "@/assets/reiwa_2.png";
import reiwa2_mobile from "@/assets/reiwa_2_mobile.png";
import reiwa3 from "@/assets/reiwa_3.png";
import reiwa3_mobile from "@/assets/reiwa_3_mobile.png";
import logo_5 from "@/assets/logo_5.png";

const slides: Slide[] = [
  { srcDesktop: reiwa2, srcMobile: reiwa2_mobile, alt: "Top Visual" },
  { srcDesktop: reiwa3, srcMobile: reiwa3_mobile, alt: "Top Performance" },
];

const TopsVisual = ({ resetSignal = 0, active = true }: TopsVisualProps) => {
  const [index, setIndex] = useState<number>(0);
  const [primed, setPrimed] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);
  const raf1 = useRef<number | null>(null);
  const raf2 = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!active) return;
    setPrimed(false);
    setIndex(0);
    raf1.current = window.requestAnimationFrame(() => {
      raf2.current = window.requestAnimationFrame(() => setPrimed(true));
    });
    return () => {
      if (raf1.current) cancelAnimationFrame(raf1.current);
      if (raf2.current) cancelAnimationFrame(raf2.current);
      raf1.current = raf2.current = null;
    };
  }, [resetSignal, active]);

  useEffect(() => {
    if (!active || !primed) return;
    timeoutRef.current = window.setTimeout(() => {
      setIndex(1);
      timeoutRef.current = null;
    }, 10000);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [active, primed]);

  return (
    <div
      className={[
        "relative w-full bg-black",
        primed ? "opacity-100" : "opacity-0",
        "transition-opacity duration-0",
      ].join(" ")}
    >
      {/* 1) ヘッダーと重ならないための 64px スペーサー（黒帯） */}
      {/* <div className="w-full h-4 bg-black" aria-hidden /> */}

      {/* 2) 画像ステージ（ここから画像が始まる） */}
      <div className="relative w-full min-h-[50vh]">
        {/* 背景画像をステージ全面に敷く */}
        <div className="absolute inset-0 z-0">
          {slides.map((s, i) => (
            <picture key={i} className="absolute inset-0">
              <source media="(max-width: 400px)" srcSet={s.srcMobile ?? s.srcDesktop} />
              <img
                src={s.srcDesktop}
                alt={s.alt}
                className={[
                  "w-full h-full",
                  "object-cover sm:object-cover max-sm:object-contain max-sm:object-center",
                  "transition-opacity duration-1500 ease-linear",
                  i === index ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />
            </picture>
          ))}
        </div>

        {/* 3) ロゴ：画像の“下部あたり”に重ねる（中央下寄せ） */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-10">
          <img
            src={logo_5}
            alt="REIWAROMAN"
            className="w-44 md:w-48 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TopsVisual;
