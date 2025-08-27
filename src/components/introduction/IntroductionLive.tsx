import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import reiwa6 from "@/assets/reiwa_6.png";
import { INTRODUCTION_LIVE_CONTENTS, INTRODUCTION_LIVE_TITLE_LINES } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const IntroductionLive = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const title = titleRef.current;

    if (!container || !content || !title) return;

    const ctx = gsap.context(() => {
      // 本文を初期状態で下に移動、透明にする
      gsap.set(content, {
        y: 80,
        opacity: 0,
      });

      // タイトルの各行を初期状態で下に移動、透明にする
      const titleLines = title.children;
      gsap.set(titleLines, {
        y: 100,
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

      // タイトルから先にアニメーション（右から左へ順番に）
      tl.to(titleLines, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });

      // その後、本文をアニメーション
      tl.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.4");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-[50vh] lg:h-screen  landscape:h-screen text-white overflow-hidden py-6 md:py-8">
      {/* BG */}
      <div
        className="absolute inset-0 bg-top bg-cover"
        style={{ backgroundImage: `url(${reiwa6})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "rgba(185,0,0,0.65)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* コンテンツ */}
      <div className="relative z-10 w-full lg:h-screen  landscape:h-screen px-6 lg:px-10 lg:pr-16 py-4 md:py-16 lg:py-24 flex items-center md:items-center md:justify-end">
        {/* PC: 横並び [本文][タイトル]、SP: 左寄せで縦並び（タイトルが上）、中央配置 */}
        <div className="flex md:flex-row flex-col items-start md:justify-end gap-4 md:gap-6 lg:gap-10 text-left w-full md:w-[50vw] mr-10">

          {/* 本文（左隣） */}
          <div ref={contentRef} className="order-2 md:order-1 flex-shrink-0 self-start mt-3 md:mt-0">
            <div
              className="
                min-w-[40vw] md:w-[45vw] lg:w-[50vw]
                text-xs md:text-sm text-white/92
                md:[writing-mode:vertical-rl] md:[text-orientation:upright]
                leading-relaxed lg:leading-10 lg:tracking-wider
              "
              style={{ fontFamily: '"momochidori", serif'  , fontWeight:500}}
            >
              {INTRODUCTION_LIVE_CONTENTS.map((content, i) => (
                <p key={i}>
                  {content}
                  {i < INTRODUCTION_LIVE_CONTENTS.length - 1 && <br />}
                </p>
              ))}
            </div>
          </div>

          {/* タイトル（最右）— 各列を独立させて上端揃え */}
          <div className="order-1 md:order-2 flex-shrink-0 self-start mt-8 md:mt-0">
            <div ref={titleRef} className="flex flex-col md:flex-row-reverse items-start gap-1 md:gap-3 lg:gap-4">
              {INTRODUCTION_LIVE_TITLE_LINES.map((line, i) => (
                <h1
                  key={i}
                  className="
                    font-extrabold text-white
                    text-4xl md:text-5xl lg:text-7xl
                    drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]
                    md:[writing-mode:vertical-rl] md:[text-orientation:upright]
                    leading-[0.8] md:leading-[1.08]
                    md: scale-y-80
                    origin-top
                    whitespace-nowrap
                  "
                  style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif', fontWeight: 900 }}
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

export default IntroductionLive;
