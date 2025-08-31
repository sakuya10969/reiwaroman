import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import reiwa6 from "@/assets/IntroductionLive.jpg";
import reiwa7 from "@/assets/IntroductionVenue_NewsCatch.jpg";
import { INTRODUCTION_LIVE_CONTENTS, INTRODUCTION_LIVE_TITLE_LINES } from "@/constants";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const IntroductionLive = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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
    const venueBackground = venueBackgroundRef.current!;
    const venueContent = venueContentRef.current!;
    const yoko = yokoRef.current!;
    const karena = karenaRef.current!;
    const yokohama = yokohamaRef.current!;
    const hama = hamaRef.current!;

    // --- テキスト分割処理 ---
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
      gsap.set(contentLines, { y: -100, opacity: 0 });

      const titleChars = title.querySelectorAll('span');
      gsap.set(titleChars, { y: -100, opacity: 0 });

      gsap.set(venueBackground, { opacity: 0 });
      gsap.set([yoko, hama], { y: -300, opacity: 0, rotation: 0 });
      gsap.set([karena, yokohama], { x: -300, opacity: 0, rotation: 0 });
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
        ease: "power2.out"}, "+=0.5");
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
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      scrubTl.to(venueBackground, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0.2);

      scrubTl.to(venueContent, {
        autoAlpha: 1,
        duration: 0.3
      }, 0.5);

      // --- Venue要素のアニメーションを onLeave で発火させる ---
      const playVenueAnimation = () => {
        document.body.style.overflow = 'hidden';
        const venueTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
          }
        });

        venueTl.to([yoko, hama], {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power4.out",
        })
        .to([yoko, hama], { rotation: "+=3", duration: 0.1, ease: "power2.inOut" })
        .to([yoko, hama], { rotation: "-=6", duration: 0.2, ease: "power2.inOut" })
        .to([yoko, hama], { rotation: "+=3", duration: 0.1, ease: "power2.inOut" });

        venueTl.to([karena, yokohama], {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power4.out",
        }, "-=0.4")
        .to([karena, yokohama], { rotation: "+=2", duration: 0.1, ease: "power2.inOut" })
        .to([karena, yokohama], { rotation: "-=4", duration: 0.2, ease: "power2.inOut" })
        .to([karena, yokohama], { rotation: "+=2", duration: 0.1, ease: "power2.inOut" });
      };

      // pinのためのScrollTrigger
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom-=1",
        pin: container,
        onLeave: (self) => { // 'self'を受け取る
          // ★★★ 慣性によるズレを補正する処理を追加 ★★★
          gsap.to(window, {
            scrollTo: { y: self.end, autoKill: false }, // トリガーの終着点に強制的に移動
            duration: 0.01, // ごく短い時間で滑らかにスナップさせる
            ease: "power1.inOut",
          });

          playVenueAnimation();
        },
        onEnterBack: () => {
          gsap.set(venueContent, { autoAlpha: 0 });
          gsap.set([yoko, hama], { y: -300, opacity: 0, rotation: 0 });
          gsap.set([karena, yokohama], { x: -300, opacity: 0, rotation: 0 });
          gsap.set(venueBackground, { opacity: 0 });
        },
      });

    }, wrapper);

    return () => {
      document.body.style.overflow = '';
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-[350vh] relative">
      <div ref={containerRef} className="w-full h-screen relative overflow-hidden">

        {/* IntroductionLiveのコンテンツ */}
        <div className="relative w-full h-full text-white" style={{ zIndex: 2 }}>
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

          <div
            ref={venueBackgroundRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${reiwa7})`,
              zIndex: 1
            }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-black/55" aria-hidden />
          </div>

          <div className="relative z-10 w-full h-full px-6 lg:px-10 lg:pr-16 py-4 md:py-16 lg:py-24 flex items-center md:items-center md:justify-end">
            <div className="flex md:flex-row flex-col items-start md:justify-end gap-4 md:gap-6 lg:gap-10 text-left w-full md:w-[50vw] mr-10">

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

              <div className="order-1 md:order-2 flex-shrink-0 self-start mt-8 md:mt-0">
                <div ref={titleRef} className="flex flex-col md:flex-row-reverse items-start md:gap-3 lg:gap-4">
                  {INTRODUCTION_LIVE_TITLE_LINES.map((_line, i) => (
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