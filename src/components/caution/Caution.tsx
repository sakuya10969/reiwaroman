import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAUTION_CONTENTS } from "@/constants";
import BG from "@/assets/reiwa_12.png";
import type { CautionProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const BackGroundImage = BG;
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
      // バッジを初期状態で下に移動、透明にする
      gsap.set(badge, {
        y: 50,
        opacity: 0,
      });

      // リストの各アイテムを初期状態で下に移動、透明にする
      const listItems = list.children;
      gsap.set(listItems, {
        y: 80,
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

      // バッジから先にアニメーション
      tl.to(badge, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // その後、リストアイテムを順番にアニメーション
      tl.to(listItems, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.4");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full isolate lg:min-h-screen">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-20"
        aria-hidden="true"
        style = {{ backgroundImage:`url(${BackGroundImage})`}}
      />

      {/* 半透明赤のオーバーレイ */}
      <div className="absolute inset-0 bg-[#e12027]/50 -z-18" aria-hidden="true" />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
        {/* 上部のバッジ */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <div
            className="text-sm text-white md:text-base font-bold transform scale-x-150"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <p className="inline-block uppercase underline underline-offset-4">
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