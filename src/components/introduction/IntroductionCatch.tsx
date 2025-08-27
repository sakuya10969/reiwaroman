import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import type { IntroductionCatchProps } from "@/types";
import { INTRODUCTION_CATCH_CONTENTS } from "@/constants";
import reiwa4 from "@/assets/reiwa_4.png";
import reiwa5 from "@/assets/reiwa_5.png";
import reiwa4_mobile from "@/assets/reiwa_4_mobile.png";
import reiwa5_mobile from "@/assets/reiwa_5_mobile.png";

// スライドデータを定義
const slides = [
  { srcDesktop: reiwa4, srcMobile: reiwa4_mobile, alt: "Introduction Background 1" },
  { srcDesktop: reiwa5, srcMobile: reiwa5_mobile, alt: "Introduction Background 2" },
];

const IntroductionCatch = ({
  interval = 10000,
}: IntroductionCatchProps) => {
  const [index, setIndex] = useState<number>(0);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slides.length <= 1) return; // 1枚以下なら切り替え不要
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    // 小見出しのアニメーション
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      tl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // メイン見出しのアニメーション
    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }

    // 説明文のアニメーション
    if (contentRef.current) {
      const contentLines = contentRef.current.querySelectorAll('p');
      gsap.set(contentLines, { y: 30, opacity: 0 });
      tl.to(contentLines, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");
    }
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-screen flex items-center justify-center text-white overflow-hidden bg-black">
      {/* 背景スライド - レスポンシブ対応 */}
      {slides.map((slide, i) => (
        <picture key={i} className="absolute inset-0">
          {/* モバイル用画像切り替え閾値 */}
          <source media="(max-width: 440px)" srcSet={slide.srcMobile ?? slide.srcDesktop} />
          <img
            src={slide.srcDesktop} // デスクトップ・タブレット用
            alt={slide.alt}
            className={[
              "absolute inset-0 w-full h-full transition-opacity duration-1500 ease-linear block",
              i === index ? "opacity-100" : "opacity-0",
              "sm:object-cover sm:object-center",
              "max-sm:object-cover max-sm:object-center",
            ].join(" ")}
          />
        </picture>
      ))}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/55" />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-[90vw] flex flex-col items-center py-5">
        {/* 小見出し */}
        <h2 ref={subtitleRef} className="inline-block text-sm md:text-base font-bold uppercase underline underline-offset-4 scale-x-150" style={{ fontFamily: 'Prompt, sans-serif' }}>
          Introduction
        </h2>

        {/* メイン見出し */}
        <h1 ref={titleRef} className="mt-6 sm:mt-10 text-3xl md:text-5xl leading-[0.9] md:leading-[1.05] font-extrabold scale-x-150 tracking-[0.03em]" style={{ fontFamily: 'Prompt, sans-serif' ,fontWeight:700}}>
          RE:IWAROMAN
        </h1>

        {/* 説明文 */}
        <div ref={contentRef} className="mt-4 md:mt-8 space-y-2 text-xs md:text-sm leading-[1] sm:leading-[1.2] text-white text-center" style={{ fontFamily: '"momochidori", serif' ,fontWeight:500}}>
          {INTRODUCTION_CATCH_CONTENTS.map((content, i) => (
            <p key={i}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionCatch;
