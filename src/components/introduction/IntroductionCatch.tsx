import { useEffect, useState } from "react";

import type { IntroductionCatchProps } from "@/types";
import { INTRODUCTION_CATCH_CONTENTS } from "@/constants";
import reiwa4 from "@/assets/reiwa_4.png";
import reiwa5 from "@/assets/reiwa_5.png";

const IntroductionCatch = ({
  bgSrcList = [reiwa4, reiwa5],
  interval = 10000,
}: IntroductionCatchProps) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (bgSrcList.length <= 1) return; // 1枚以下なら切り替え不要
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bgSrcList.length);
    }, interval);
    return () => clearInterval(timer);
  }, [bgSrcList, interval]);

  return (
    <div className="relative w-full min-h-[100vh] flex items-center justify-center text-white overflow-hidden bg-black">
      {/* 背景スライド */}
      {bgSrcList.length > 0 && bgSrcList.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/70" />

      {/* コンテンツ */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        {/* 小見出し */}
        <span className="inline-block text-sm md:text-base font-bold uppercase underline underline-offset-5 scale-x-130 scale-y-80" style={{ fontFamily: 'Prompt, sans-serif' }}>
          Introduction
        </span>

        {/* メイン見出し */}
        <h1 className="mt-8 text-[clamp(36px,8vw,96px)] leading-[1.05] font-extrabold scale-x-[1.5] tracking-[0.03em]" style={{ fontFamily: 'Prompt, sans-serif' }}>
          RE:IWAROMAN
        </h1>

        {/* 説明文 */}
        <div className="mt-6 space-y-3 text-[13px] sm:text-sm leading-relaxed text-white" style={{ fontFamily: '"a-otf-futo-min-a101-pr6n", serif' }}>
          {INTRODUCTION_CATCH_CONTENTS.map((content, i) => (
            <p key={i}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionCatch;
