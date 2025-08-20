import { useEffect, useState } from "react";

import type { IntroductionCatchProps } from "@/types";

const IntroductionCatch = ({
  bgSrcList = [],
  interval = 5000,
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
    <div className="relative w-full min-h-[70vh] flex items-center justify-center text-white overflow-hidden bg-black">
      {/* 背景スライド */}
      {bgSrcList.length > 0 && bgSrcList.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-70" : "opacity-0"
          }`}
        />
      ))}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/70" />

      {/* コンテンツ */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        {/* 小見出し */}
        <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase underline underline-offset-5">
          Introduction
        </span>

        {/* メイン見出し */}
        <h1 className="mt-8 text-[clamp(36px,8vw,96px)] leading-[1.05] font-extrabold tracking-wider">
          RE:IWAROMAN
        </h1>

        {/* 説明文 */}
        <div className="mt-6 space-y-3 text-[13px] sm:text-sm leading-relaxed text-white/90">
          <p>Restart(再出発)・Reborn(再誕)・Redefine(再定義)・Revival(再演)・Reunion(再会)</p>
          <p>
            M-1二連覇達成後、くるまの活動自粛と吉本興業退社という波乱万丈な人生に立ち向かっている漫才師「令和ロマン」。
          </p>
          <p>
            そんな彼らが出会って10年の節目にこれまでの活動の集大成とこれからの再スタートを誓い約6年ぶりの単独ライブを開催する。
          </p>
          <p>
            その舞台は誰もお笑いをやったことは無い、国内最大級の音質空間を誇るKアリーナ横浜。約2万人！
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionCatch;
