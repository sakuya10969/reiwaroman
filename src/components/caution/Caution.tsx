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

    // バッジテキストを一文字ずつspan要素に分割
    if (badge) {
      const badgeTextElement = badge.querySelector('p');
      if (badgeTextElement) {
        badgeTextElement.innerHTML = "";
        badgeText.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.className = "inline-block";
          badgeTextElement.appendChild(span);
        });
      }
    }

    const ctx = gsap.context(() => {
      // バッジの各文字を初期状態で左斜め下に移動、透明にする
      if (badge) {
        const badgeChars = badge.querySelectorAll('p span');
        gsap.set(badgeChars, {
          x: -50,
          y: 50,
          opacity: 0,
        });
      }

      // リストの各アイテムを初期状態で左斜め下に移動、透明にする
      const listItems = list.children;
      gsap.set(listItems, {
        x: -50,
        y: 50,
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

      // バッジの文字を一文字ずつ左斜め下からアニメーション
      if (badge) {
        const badgeChars = badge.querySelectorAll('p span');
        tl.to(badgeChars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        });
      }

      // その後、リストアイテムを順番に左斜め下からアニメーション
      tl.to(listItems, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
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