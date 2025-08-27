import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import reiwa6_blackwhite from "@/assets/reiwa_6_blackwhite.png";

gsap.registerPlugin(ScrollTrigger);

const TINT = 0.55; // 黒の暗幕（0〜1）

const IntroductionVenue = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;

    if (!container || !title) return;

    const ctx = gsap.context(() => {
      // タイトルの各文字要素を初期状態で下に移動、透明にする
      const titleElements = title.children;
      gsap.set(titleElements, {
        y: 100,
        opacity: 0,
      });

      // スクロールトリガーでアニメーション実行
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // 文字要素を順番にアニメーション（下から浮かび上がるように）
      tl.to(titleElements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] lg:h-screen landscape:h-screen flex items-center justify-center text-white overflow-hidden py-12"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 w-full h-full bg-black bg-center bg-cover"
        style={{ backgroundImage: `url(${reiwa6_blackwhite})` }}
        aria-hidden="true"
      />
      {/* 黒幕 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: `rgba(0,0,0,${TINT})` }}
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="relative z-10 text-center max-w-[70vw]">
        <h1 ref={titleRef} className="font-extrabold leading-[1.1] tracking-wide">
          <p className="block text-red-800 text-[clamp(48px,10vw,110px)] opacity-70 relative top-4 md:top-8 z-10 scale-x-130 origin-center" style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}>
            横
          </p>
          <p className="inline-block text-[clamp(36px,10vw,100px)] relative z-0 leading-none scale-x-140 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>K ARENA</p>
          <br />
          <p className="inline-block text-[clamp(36px,10vw,100px)] leading-none scale-x-140 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>YOKOHAMA</p>
          <p className="block text-red-800 text-[clamp(48px,10vw,110px)] opacity-70 relative -top-6 md:-top-12 scale-x-130 origin-center" style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}>
            浜
          </p>
        </h1>
      </div>
    </div>
  );
};

export default IntroductionVenue;
