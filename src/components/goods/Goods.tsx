/*

// import { ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { GoodsProps } from "@/types";
import preparation from "@/assets/preparation.png";

gsap.registerPlugin(ScrollTrigger);

const Goods = ({
  badgeText = "GOODS",
  // goodsImageUrl = [],
  // goodsPurchaseUrl = "https://example.com",
}: GoodsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const goodsGridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    const message = messageRef.current;
    const goodsGrid = goodsGridRef.current;

    if (!container || !badge || !message || !goodsGrid) return;

    // バッジテキストを一文字ずつspan要素に分割
    if (badge) {
      const badgeTextElement = badge.querySelector('span');
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
        const badgeChars = badge.querySelectorAll('span span');
        gsap.set(badgeChars, {
          x: -50,
          y: 50,
          opacity: 0,
        });
      }

      // メッセージ内の要素を初期状態で左斜め下に移動、透明にする
      const messageElements = message.children;
      gsap.set(messageElements, {
        x: -50,
        y: 50,
        opacity: 0,
      });

      // グッズ画像を初期状態で左斜め下に移動、透明にする
      const goodsItems = goodsGrid.children;
      gsap.set(goodsItems, {
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
        const badgeChars = badge.querySelectorAll('span span');
        tl.to(badgeChars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
        });
      }

      // その後、メッセージ要素を順番に左斜め下からアニメーション
      tl.to(messageElements, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.4");

      // 最後にグッズ画像を順番に左斜め下からアニメーション
      tl.to(goodsItems, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");

    }, container);

    return () => ctx.revert();
  }, []);

  // preparation.pngを表示するために8つの要素を作成
  const preparationImages = Array(8).fill(preparation);

  return (
    <div ref={containerRef} className="relative w-full isolate lg:min-h-screen">
       背景
      <div
        className="absolute inset-0 bg-black -z-10"
        aria-hidden="true"
      />

      コンテンツ
      <div className="max-w-6xl mx-auto py-16 px-4">
        上部のバッジ
        <div ref={badgeRef} className="flex justify-center mb-8">
          <div
            className="text-sm text-white md:text-base font-bold scale-x-140"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <span className="inline-block font-bold uppercase after:content-[''] after:absolute after:left-0 after:right-0
                after:-bottom-0 after:h-[1.5px] after:bg-current">
              {badgeText}
            </span>
          </div>
        </div>

        準備中メッセージ
        <div ref={messageRef} className="flex flex-col items-center justify-center pb-8">
          <div className="text-center max-w-2xl">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              グッズ詳細準備中
            </h2>
          </div>
        </div>

        グッズ一覧 - モバイル: 横2×縦4、PC: 横4×縦2
        <div ref={goodsGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 px-5 sm:px-3">
          {preparationImages.map((photo, index) => (
            <div key={index} className="text-center">
              <img
                src={photo}
                alt={`準備中グッズ ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        購入ボタン
        <div className="max-w-xl mx-auto mt-12 px-4 flex justify-center">
          <a
            href={goodsPurchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between text-white rounded tracking-wide transition-colors duration-200 leading-none py-2 px-6 whitespace-nowrap"
            style={{
              backgroundColor: "#a01e22",
              fontFamily: 'momochidori, sans-serif',
              borderRadius: "30px",
              fontSize: "1.1em",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#b3272b"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#a01e22"}
          >
            オンラインでの購入はこちら
            <ChevronRight size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Goods;

*/