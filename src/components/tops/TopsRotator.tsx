import { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import TopsCatch from "@/components/tops/TopsCatch";
import TopsVisual from "@/components/tops/TopsVisual";
import logo_ja from "@/assets/logo_ja.png";
import logo_en from "@/assets/logo_en.png";

interface Slot {
  key: "catch" | "visual";
  durationMs: number;
}

const SLOTS: Slot[] = [
  { key: "catch",  durationMs: 7500 },
  { key: "visual", durationMs: 15000 },
];

const TopsRotator = () => {
  const [idx, setIdx] = useState<number>(0);
  const [visualCycle, setVisualCycle] = useState<number>(0);
  const logoRef = useRef<HTMLDivElement>(null);
  // 個別のロゴへの参照を追加
  const logoJaRef = useRef<HTMLImageElement>(null);
  const logoEnRef = useRef<HTMLImageElement>(null);

  const current = useMemo(() => SLOTS[idx], [idx]);

  useLayoutEffect(() => {
    const logoContainer = logoRef.current;
    const logoJa = logoJaRef.current;
    const logoEn = logoEnRef.current;

    if (!logoContainer || !logoJa || !logoEn) return;


    const individualLogos = [logoEn, logoJa];

    const ctx = gsap.context(() => {

      gsap.set(logoContainer, {
        x: "-300%",
        y: "-300%",
        opacity: 0,
        scale: 0.3,
        rotation: -150,
      });

      gsap.set(individualLogos, { opacity: 0 });


      const tl = gsap.timeline({
        delay: 1,
      });

      tl.to(logoContainer, {
        x: "0%",
        y: "0%",
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "expo.out",
      });

      tl.to(logoEn, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.7");


      tl.to(logoJa, {
        opacity: 1,
        y: -5,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.2");

      tl.to(logoJa, {
        y: 0,
        duration: 0.3,
        ease: "bounce.out",
        yoyo: true,
        repeat: 1,
      }, "<0.1");

    }, logoContainer);

    return () => ctx.revert();
  }, []);

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
    <div className="relative w-screen h-screen landscape:h-screen">
      <div className={[ "absolute inset-0 transition-opacity duration-1500 ease-linear", isCatch ? "opacity-100" : "opacity-0"].join(" ")}>
        <TopsCatch />
      </div>

      <div className={[ "relative transition-opacity duration-1500 ease-linear", isVisual ? "opacity-100" : "opacity-0"].join(" ")}>
        <TopsVisual key={visualCycle} resetSignal={visualCycle} active={isVisual} />
      </div>

      {/* ロゴを下部に配置 */}
      <div
        ref={logoRef}
        className="absolute bottom-15  md:bottom-20 lg:bottom-25 left-1/2 transform -translate-x-1/2 z-10"
      >
        <img
          ref={logoEnRef} // refを追加
          src={logo_en}
          alt="Logo English"
          className="absolute bottom-0 left-0 h-22 w-50 md:h-20 md:w-48 lg:h-40 lg:w-80"
        />
        <img
          ref={logoJaRef} // refを追加
          src={logo_ja}
          alt="Logo Japanese"
          className="relative mt-1 h-22 w-50 md:h-20 md:w-48 lg:h-40 lg:w-80"
        />
      </div>
    </div>
  );
};

export default TopsRotator;