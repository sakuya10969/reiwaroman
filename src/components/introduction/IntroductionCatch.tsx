import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (slides.length <= 1) return; // 1枚以下なら切り替え不要
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative w-full max-h-screen flex items-center justify-center text-white overflow-hidden bg-black pt-4 pb-8">
      {/* 背景スライド - レスポンシブ対応 */}
      {slides.map((slide, i) => (
        <picture key={i} className="absolute inset-0">
          {/* モバイル用画像切り替え閾値 */}
          <source media="(max-width: 400px)" srcSet={slide.srcMobile ?? slide.srcDesktop} />
          <img
            src={slide.srcDesktop} // デスクトップ・タブレット用
            alt={slide.alt}
            className={[
              "absolute inset-0 w-full h-full transition-opacity duration-1500 ease-linear",
              // レスポンシブ表示制御：デスクトップは画面全体カバー、モバイルは画像全体表示
              "object-cover sm:object-cover max-sm:object-contain max-sm:object-center",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </picture>
      ))}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/70" />

      {/* コンテンツ */}
      <div className="relative z-10 mx-auto max-w-[70vw] px-6 flex flex-col justify-center items-center">
        {/* 小見出し */}
        <span className="inline-block text-sm md:text-base font-bold uppercase underline underline-offset-4 scale-x-130 scale-y-80" style={{ fontFamily: 'Prompt, sans-serif' }}>
          Introduction
        </span>

        {/* メイン見出し */}
        <p className="mt-8 text-[clamp(28px,6.5vw,80px)] leading-[1.05] font-extrabold scale-x-150 tracking-[0.03em]" style={{ fontFamily: 'Prompt, sans-serif' }}>
          RE:IWAROMAN
        </p>

        {/* 説明文 */}
        <div className="mt-4 space-y-2 text-xs md:text-sm leading-relaxed text-white text-center" style={{ fontFamily: '"momochidori", serif' }}>
          {INTRODUCTION_CATCH_CONTENTS.map((content, i) => (
            <p key={i}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionCatch;
