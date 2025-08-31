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

    // ★★★ 変更点①：リストの各行（li）を取得 ★★★
    const listItems = list.querySelectorAll('li');

    const ctx = gsap.context(() => {
      // 初期状態のセットアップ
      gsap.set(badge, { y: -50, opacity: 0 });
      // ★★★ 変更点②：リスト全体ではなく、各行を非表示に ★★★
      gsap.set(listItems, {
        y: -50,
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

      // バッジ全体を塊としてアニメーション
      tl.to(badge, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // ★★★ 変更点③：リストの各行を順番にアニメーション ★★★
      tl.to(listItems, {
        y: 0,
        opacity: 1,
        duration: 0.8, // 各行のアニメーション時間
        ease: "power2.out",
        stagger: 0.15, // 0.15秒ずつずらして開始
      }, "-=0.5");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    // JSX部分は変更なし
    <div ref={containerRef} id="caution" className="relative w-full isolate lg:min-h-screen">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-20 bg-cover bg-center"
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
        <ul ref={listRef} className="mt-4 text-xs md:text-sm leading-relaxed scale-y-100 text-white w-[70vw] max-w-2xl">
          {CAUTION_CONTENTS.map((line, i) => (
            <li key={i} className="relative pl-5 mb-1" style={{ fontFamily: '"momochidori", serif' ,fontWeight: 500}}>
              <span className="absolute left-0">※</span>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Caution;