import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { IntroductionCatchProps } from "@/types";
import { INTRODUCTION_CATCH_CONTENTS } from "@/constants";
import Catch_1 from "@/assets/top1_IntroductionCatch1.jpg";

gsap.registerPlugin(ScrollTrigger);

const IntroductionCatch = ({}: IntroductionCatchProps) => {
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const rePrefixRef = useRef<HTMLSpanElement>(null);
  const iwaromaRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const subtitle = subtitleRef.current;
    const rePrefix = rePrefixRef.current;
    const iwaroma = iwaromaRef.current;
    const content = contentRef.current;

    if (!container || !subtitle || !rePrefix || !iwaroma || !content) return;

    // --- テキスト分割処理 (IWAROMANのみ) ---
    const iwaromaText = "IWAROMAN";
    iwaroma.innerHTML = "";
    iwaromaText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = "inline-block";
      iwaroma.appendChild(span);
    });

    const ctx = gsap.context(() => {
      // --- 初期状態のセットアップ ---
      const iwaromaChars = iwaroma.querySelectorAll('span');

      gsap.set(subtitle, { y: -50, opacity: 0 });
      gsap.set(iwaromaChars, { y: -50, opacity: 0 });
      gsap.set(rePrefix, { x: -100, opacity: 0 });
      gsap.set(content, { y: -50, opacity: 0 }); // 説明文の初期位置をY軸（上）に設定


      // --- アニメーションのタイムラインを作成 ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Introductionを塊で上からイン
      tl.to(subtitle, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // 2. IWAROMANを上から一文字ずつイン
      tl.to(iwaromaChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
      }, "-=0.6");

      // 3. RE:を左から塊でイン
      tl.to(rePrefix, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.5");

      // 4. 残りの文章は塊で上からイン
      tl.to(content, {
        y: 0, // ★ x: 0 を y: 0 に修正
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }, "+=0.2");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[60vh] md:h-screen landscape:h-screen flex items-center justify-center text-white overflow-hidden bg-black">
      {/* 背景画像 */}
      <img
        src={Catch_1}
        alt="Main Visual"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/55" />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-[80vw] flex flex-col items-center py-5">
        {/* 小見出し */}
        <h2
          ref={subtitleRef}
          className="relative inline-block font-bold uppercase scale-x-150 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current"
          style={{ fontFamily: 'Prompt, sans-serif' }}
        >
          Introduction
        </h2>

        {/* メイン見出し */}
        <h1 className="mt-8 sm:mt-10 md:mt-15 text-3xl md:text-5xl leading-[0.9] md:leading-[1.05] font-extrabold scale-x-150 tracking-[0.03em] relative" style={{ fontFamily: 'Prompt, sans-serif', fontWeight: 700 }}>
          <span ref={rePrefixRef} className="inline-block">RE:</span>
          <span ref={iwaromaRef} className="inline-block">IWAROMAN</span>
        </h1>

        {/* 説明文 */}
        <div ref={contentRef} className="mt-7 md:mt-8 space-y-2 text-xs md:text-sm leading-[1] sm:leading-[1.2] text-white text-center" style={{ fontFamily: '"momochidori", serif', fontWeight: 500 }}>
          {INTRODUCTION_CATCH_CONTENTS.map((content, i) => (
            <p key={i}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionCatch;