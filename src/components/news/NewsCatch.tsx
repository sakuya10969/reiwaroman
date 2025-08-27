import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import reiwa6_blackwhite from "@/assets/reiwa_6_blackwhite.png";
import type { NewsCatchProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const NewsCatch = ({
  backgroundImageUrl = reiwa6_blackwhite,
  badgeText = "NEWS",
  titleLines = ["REIWA", "REPORT"],
}: NewsCatchProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const container = containerRef.current!;
    const circle = circleRef.current!;
    const badge = badgeRef.current;
    const title = titleRef.current;
    if (!wrapper || !container || !circle) return;

    // 画面を完全に覆うのに必要なスケールを算出（毎回リサイズで再計算）
    const computeCoverScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const diag = Math.hypot(vw, vh); // 画面対角
      const r = circle.getBoundingClientRect();
      const d = Math.max(r.width, r.height); // 円の直径
      // ちょい余白(10%)をのせて確実にフチまで埋める
      return (diag / d) * 1.1;
    };

    let ctx: gsap.Context | null = null;

    ctx = gsap.context(() => {
      gsap.set(circle, {
        transformOrigin: "50% 50%",
        willChange: "transform",
        force3D: true,
      });

      // バッジを初期状態で下に移動、透明にする
      if (badge) {
        gsap.set(badge, {
          y: 50,
          opacity: 0,
        });
      }

      // タイトルの各行を初期状態で下に移動、透明にする
      if (title) {
        const titleLines = title.children;
        gsap.set(titleLines, {
          y: 80,
          opacity: 0,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,         // 縦に長いラッパー
          start: "top top",         // スクロール開始から即スタート
          end: "bottom bottom",     // ラッパーを終えるタイミングで100%到達
          scrub: true,              // 完全同期（補間なし）
          pin: container,           // containerを固定（sticky使わない）
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,      // 他のScrollTriggerが処理された後に実行
        },
      });

      // scaleを関数で供給して、リサイズ/refresh時に再評価
      tl.to(circle, { 
        scale: computeCoverScale, 
        ease: "none" 
      });

      // 文字のアニメーション用のタイムライン
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      // バッジから先にアニメーション
      if (badge) {
        textTl.to(badge, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // その後、タイトル行を順番にアニメーション
      if (title) {
        const titleLines = title.children;
        textTl.to(titleLines, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        }, "-=0.4");
      }

      // 画像読み込みやフォント適用後に正しく採寸するため
      const onReady = () => ScrollTrigger.refresh();
      window.addEventListener("load", onReady);
      // フォントでサイズが変わるケースにも対応したいなら次も有効
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    }, wrapper);

    // クリーンアップ関数
    return () => {
      ctx?.revert(); // GSAP アニメーションを破棄
      // ScrollTriggerの再計算を促す
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-[330vh] relative"
    >
      <div
        ref={containerRef}
        className="w-full h-screen flex items-center justify-center relative overflow-hidden"
        aria-label={`${badgeText} ${titleLines.join(" ")}`}
      >
        {/* 背景 */}
        <div
          className="absolute inset-0 bg-black bg-center bg-cover -z-10"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            filter: "grayscale(100%)",
          }}
          aria-hidden="true"
        />

        {/* 暗幕オーバーレイ */}
        <div
          className="absolute inset-0 bg-black/70 -z-10"
          aria-hidden="true"
        />

        {/* 拡大する円形背景 - 外部にも広がるよう制限なし */}
        <div
          ref={circleRef}
          className="absolute top-1/2 left-1/2 w-70 h-70 md:w-80 md:h-80 lg:w-96 lg:h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900 origin-center"
          style={{ zIndex: 1 }}
        />

        {/* 文字コンテンツ - 固定サイズ、拡大しない */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 h-70 md:w-80 md:h-80 lg:w-96 lg:h-96"
          style={{ zIndex: 2 }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-between text-center px-6 py-16">
            {/* BADGE - 上部 */}
            <div ref={badgeRef} className="text-sm md:text-lg lg:text-xl text-white/90 flex-shrink-0 relative -top-2">
              <p className="inline-block font-bold underline underline-offset-4 scale-x-150 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>
                {badgeText}
              </p>
            </div>

            {/* タイトル行 - 真ん中 */}
            <div ref={titleRef} className="leading-none flex-grow flex flex-col items-center justify-center">
              {titleLines.map((line, idx) => (
                <h1
                  key={idx}
                  className="block font-bold uppercase text-white text-4xl md:text-5xl scale-x-150 origin-center"
                  style={{ fontFamily: 'Prompt, sans-serif' }}
                >
                  {line}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCatch;