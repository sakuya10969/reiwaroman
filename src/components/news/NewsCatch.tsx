import reiwa6_blackwhite from "@/assets/reiwa_6_blackwhite.png";
import type { NewsCatchProps } from "@/types";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsCatch = ({
  backgroundImageUrl = reiwa6_blackwhite,
  badgeText = "NEWS",
  titleLines = ["REIWA", "REPORT"],
}: NewsCatchProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const container = containerRef.current!;
    const circle = circleRef.current!;
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

    const ctx = gsap.context(() => {
      gsap.set(circle, {
        transformOrigin: "50% 50%",
        willChange: "transform",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,         // 縦に長いラッパー
          start: "top top",         // スクロール開始から即スタート
          end: "bottom bottom",     // ラッパーを終えるタイミングで100%到達
          scrub: true,              // 完全同期（補間なし）
          pin: container,           // containerを固定（sticky使わない）
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // scaleを関数で供給して、リサイズ/refresh時に再評価
      tl.to(circle, { 
        scale: computeCoverScale, 
        ease: "none" 
      });

      // 画像読み込みやフォント適用後に正しく採寸するため
      const onReady = () => ScrollTrigger.refresh();
      window.addEventListener("load", onReady);
      // フォントでサイズが変わるケースにも対応したいなら次も有効
      document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    }, wrapper);

    return () => { ctx.revert(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-[350vh] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="w-full h-screen flex items-center justify-center sticky top-0"
        aria-label={`${badgeText} ${titleLines.join(" ")}`}
      >
        {/* 背景 */}
        <div
          className="absolute inset-0 bg-black bg-center bg-cover"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            filter: "grayscale(100%)",
          }}
          aria-hidden="true"
        />

        {/* 暗幕オーバーレイ */}
        <div
          className="absolute inset-0 bg-black/70"
          aria-hidden="true"
        />

        {/* 絶対中央配置コンテナ */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* 円形パネル */}
          <div className="relative">
            {/* 拡大する円形背景 */}
            <div
              ref={circleRef}
              className="absolute top-1/2 left-1/2 w-[70vw] max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] aspect-square rounded-full bg-[#8f242b] -translate-x-1/2 -translate-y-1/2 origin-center"
              style={{ zIndex: 1 }}
            />
            
            {/* 文字コンテンツ */}
            <div
              className="relative aspect-square w-[70vw] max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] rounded-full"
              role="img"
              aria-label={`${titleLines.join(" ")}`}
              style={{ zIndex: 2 }}
            >
              {/* 内側レイアウト */}
              <div className="absolute inset-0 flex flex-col items-center justify-between text-center px-6 py-16">
                {/* BADGE - 上部 */}
                <div className="text-sm md:text-lg lg:text-xl text-white/90 flex-shrink-0 relative top-2">
                  <span className="inline-block font-bold underline underline-offset-4 scale-x-150 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>
                    {badgeText}
                  </span>
                </div>

                {/* タイトル行 - 真ん中 */}
                <h1 className="leading-none flex-grow flex flex-col items-center justify-center">
                  {titleLines.map((line, idx) => (
                    <span
                      key={idx}
                      className="block font-bold uppercase text-white text-3xl md:text-5xl scale-x-150 origin-center leading-none"
                      style={{ fontFamily: 'Prompt, sans-serif' }}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCatch;