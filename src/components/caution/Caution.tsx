import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAUTION_CONTENTS } from "@/constants";
import reiwa12 from "@/assets/Caution.jpg";
import type { CautionProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const Caution = ({
  badgeText = "CAUTION",
}: CautionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    const list = listRef.current;

    if (!container || !badge || !list) return;

    const ctx = gsap.context(() => {
      // 【変更点①】バッジ全体とリスト全体を初期状態で上方に移動し、透明にする
      gsap.set([badge, list], {
        y: -50, // 上から表示させるため、yの初期値をマイナスに設定
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

      // 【変更点②】バッジ全体を塊としてアニメーション
      tl.to(badge, {
        y: 0,
        opacity: 1,
        duration: 0.8, // durationを調整
        ease: "power2.out",
      });

      // 【変更点③】次に、リスト全体を塊としてアニメーション
      tl.to(list, {
        y: 0,
        opacity: 1,
        duration: 1, // durationを調整
        ease: "power2.out",
      }, "-=0.5"); // バッジのアニメーションが少し終わる前に開始

    }, container);

    return () => ctx.revert();
  }, []); // 依存配列は空のままでOK

  return (
    // JSX部分は変更なし
    <div ref={containerRef} className="relative w-full isolate lg:min-h-screen">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-20"
        aria-hidden="true"
        style = {{ backgroundImage:`url(${reiwa12})`}}
      />

      {/* 半透明赤のオーバーレイ */}
      <div className="absolute inset-0 bg-black/50 -z-18" aria-hidden="true" />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
        {/* 上部のバッジ */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <div
            className="text-sm text-white md:text-base font-bold transform scale-x-150"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <p className="inline-block uppercase after:content-[''] after:absolute after:left-0 after:right-0
              after:-bottom-0 after:h-[1.5px] after:bg-current">
              {badgeText}
            </p>
          </div>
        </div>
        {/* 注意事項リスト */}
        <ul ref={listRef} className="mt-4 text-xs md:text-sm leading-relaxed scale-y-100 text-white wm-[70%]">
          {CAUTION_CONTENTS.map((line, i) => (
            <li key={i} className="relative pl-5 mb-1" style={{ fontFamily: '"momochidori", serif' ,fontWeight: 500}}>
              <span className="absolute left-0">※</span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* コピーライト */}
      <div className="w-full flex justify-center absolute bottom-3">
        <p className="text-white/80 text-sm tracking-wider" style={{fontFamily: 'momochidori, sans-serif', fontWeight: 700}}>&copy;RE:IWAROMAN制作委員会</p>
      </div>
    </div>
  );
};

export default Caution;