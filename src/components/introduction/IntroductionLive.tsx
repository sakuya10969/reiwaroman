import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import reiwa6 from "@/assets/IntroductionLive.jpg";
import reiwa7 from "@/assets/IntroductionVenue_NewsCatch.jpg"; // ここを使用します
import { INTRODUCTION_LIVE_CONTENTS, INTRODUCTION_LIVE_TITLE_LINES } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const IntroductionLive = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  // backgroundOverlayRefは新しい背景画像用のRefになります
  const venueBackgroundRef = useRef<HTMLDivElement>(null);

  // IntroductionVenue関連のrefs
  const venueContentRef = useRef<HTMLDivElement>(null);
  const yokoRef = useRef<HTMLParagraphElement>(null);
  const karenaRef = useRef<HTMLParagraphElement>(null);
  const yokohamaRef = useRef<HTMLParagraphElement>(null);
  const hamaRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const container = containerRef.current!;
    const content = contentRef.current!;
    const title = titleRef.current!;
    // Refの名前も変更
    const venueBackground = venueBackgroundRef.current!;
    const venueContent = venueContentRef.current!;
    const yoko = yokoRef.current!;
    const karena = karenaRef.current!;
    const yokohama = yokohamaRef.current!;
    const hama = hamaRef.current!;

    // --- テキスト分割処理 ---
    // タイトルの各行を文字単位でspanに分割
    if (title) {
      Array.from(title.children).forEach((lineElement, index) => {
        const text = INTRODUCTION_LIVE_TITLE_LINES[index];
        lineElement.innerHTML = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.className = "inline-block";
          lineElement.appendChild(span);
        });
      });
    }
    // YOKOHAMAの各文字をspan要素に分割
    if (yokohama) {
      const text = "YOKOHAMA";
      yokohama.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block";
        yokohama.appendChild(span);
      });
    }

    const ctx = gsap.context(() => {
      // --- 初期状態のセットアップ ---
      const contentLines = content.querySelectorAll('p');
      gsap.set(contentLines, { y: -50, opacity: 0 });

      const titleChars = title.querySelectorAll('span');
      gsap.set(titleChars, { y: -50, opacity: 0 });

      // 新しい背景画像を初期状態で透明にする (オーバーレイは含まない)
      gsap.set(venueBackground, { opacity: 0 });

      gsap.set([yoko, hama], { y: -100, opacity: 0 });
      gsap.set([karena, yokohama], { x: -200, opacity: 0 });
      gsap.set(venueContent, { autoAlpha: 0 });

      // --- IntroductionLiveのアニメーション ---
      const liveTextTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      liveTextTl.to(titleChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: "power2.out",
      });
      liveTextTl.to(contentLines, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.6");

      // --- メインのスクラブアニメーション ---
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      scrubTl.to([title, content], {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      // 新しい背景画像（reiwa7 + オーバーレイ）をフェードインさせる
      scrubTl.to(venueBackground, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.2);

      scrubTl.to(venueContent, {
        autoAlpha: 1,
        duration: 0.3
      }, 0.5);

      scrubTl.to([yoko, hama], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 0.6);

      scrubTl.to([karena, yokohama], {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, 0.8);

      // --- 揺れるモーションを追加 ---
      scrubTl.to([yoko, hama, karena, yokohama], {
        rotation: 1,
        yoyo: true,
        repeat: 5,
        duration: 0.1,
        ease: "power1.inOut",
      }, "=0.0"); // 前のアニメーションの終了と同時に開始

      // pinのためのScrollTrigger
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom-=1",
        pin: container,
        onEnterBack: () => {
          gsap.set(venueContent, { autoAlpha: 0 });
          gsap.set([yoko, hama], { y: -100, opacity: 0 });
          gsap.set([karena, yokohama], { x: -200, opacity: 0 });
          // 背景画像も透明に戻す
          gsap.set(venueBackground, { opacity: 0 });
        },
      });

    }, wrapper);

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-[350vh] relative">
      <div ref={containerRef} className="w-full h-screen relative overflow-hidden">

        {/* IntroductionLiveのコンテンツ */}
        <div className="relative w-full h-full text-white" style={{ zIndex: 2 }}>
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

          {/* reiwa7を背景とし、その上に黒いオーバーレイを重ねるdiv */}
          <div
            ref={venueBackgroundRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${reiwa7})`,
              zIndex: 1
            }}
            aria-hidden
          >
            {/* 黒いオーバーレイ用のdivを追加 */}
            <div className="absolute inset-0 bg-black/55" aria-hidden />
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 w-full h-full px-6 lg:px-10 lg:pr-16 py-4 md:py-16 lg:py-24 flex items-center md:items-center md:justify-end">
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

              {/* タイトル（最右）*/}
              <div className="order-1 md:order-2 flex-shrink-0 self-start mt-8 md:mt-0">
                <div ref={titleRef} className="flex flex-col md:flex-row-reverse items-start md:gap-3 lg:gap-4">
                  {INTRODUCTION_LIVE_TITLE_LINES.map((line, i) => (
                    <h1
                      key={i}
                      className="
                        font-extrabold text-white
                        text-4xl md:text-5xl lg:text-7xl
                        md:[writing-mode:vertical-rl] md:[text-orientation:upright]
                        md: scale-y-80
                        origin-top
                        whitespace-nowrap
                      "
                      style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif', fontWeight: 900 }}
                    >
                      {/* JSで分割するため空にしておく */}
                    </h1>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IntroductionVenueのコンテンツ (重ねて配置) */}
        <div ref={venueContentRef} className="absolute inset-0 w-full h-full flex items-center justify-center text-white pointer-events-none" style={{ zIndex: 3 }}>
          <div className="relative z-10 text-center max-w-[70vw] pointer-events-auto">
            <h1 className="font-extrabold leading-[1.1] tracking-wide">
              <p ref={yokoRef} className="block text-red-800 text-[clamp(48px,10vw,110px)] opacity-70 relative top-3 md:top-8 z-10 scale-x-130 origin-center" style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}>
                横
              </p>
              <p ref={karenaRef} className="inline-block text-[clamp(36px,10vw,100px)] relative z-0 leading-none scale-x-140 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>K ARENA</p>
              <br />
              <p ref={yokohamaRef} className="inline-block text-[clamp(36px,10vw,100px)] leading-none scale-x-140 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>YOKOHAMA</p>
              <p ref={hamaRef} className="block text-red-800 text-[clamp(48px,10vw,110px)] opacity-70 relative -top-5 md:-top-12 scale-x-130 origin-center" style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}>
                浜
              </p>
            </h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IntroductionLive;