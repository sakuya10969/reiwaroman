import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { IntroductionCatchProps } from "@/types";
import { INTRODUCTION_CATCH_CONTENTS } from "@/constants";
import reiwa4 from "@/assets/reiwa_4.png";
import reiwa5 from "@/assets/reiwa_5.png";
import reiwa4_mobile from "@/assets/reiwa_4_mobile.png";
import reiwa5_mobile from "@/assets/reiwa_5_mobile.png";

gsap.registerPlugin(ScrollTrigger);

// スライドデータを定義
const slides = [
  { srcDesktop: reiwa4, srcMobile: reiwa4_mobile, alt: "Introduction Background 1" },
  { srcDesktop: reiwa5, srcMobile: reiwa5_mobile, alt: "Introduction Background 2" },
];

const IntroductionCatch = ({
  interval = 5000,
}: IntroductionCatchProps) => {
  const [index, setIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rePrefixRef = useRef<HTMLSpanElement>(null);
  const iwaromaRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slides.length <= 1) return; // 1枚以下なら切り替え不要
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    // Introductionの各文字をspan要素に分割
    if (subtitleRef.current) {
      const text = "Introduction";
      subtitleRef.current.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block";
        subtitleRef.current?.appendChild(span);
      });
    }

    // IWAROMANの各文字をspan要素に分割
    if (iwaromaRef.current) {
      const text = "IWAROMAN";
      iwaromaRef.current.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block";
        iwaromaRef.current?.appendChild(span);
      });
    }

    // 即座に要素を非表示にする
    if (subtitleRef.current) {
      const chars = subtitleRef.current.querySelectorAll('span');
      gsap.set(chars, { x: -50, y: 50, opacity: 0 });
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
    }

    if (rePrefixRef.current) {
      gsap.set(rePrefixRef.current, { x: -300, opacity: 0 });
    }

    if (iwaromaRef.current) {
      const chars = iwaromaRef.current.querySelectorAll('span');
      gsap.set(chars, { x: -50, y: 50, opacity: 0 });
    }

    if (contentRef.current) {
      const contentLines = contentRef.current.querySelectorAll('p');
      gsap.set(contentLines, { y: 30, opacity: 0 });
    }

    if (isMobile) {
      // モバイル: アニメーション開始
      const tl = gsap.timeline();

      // Introductionの文字を一文字ずつ左斜め下からアニメーション
      if (subtitleRef.current) {
        const chars = subtitleRef.current.querySelectorAll('span');
        tl.to(chars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out"
        });
      }

      // IWAROMAN, メイン見出し（RE:以外の部分）を同時スタート
      if (iwaromaRef.current) {
        const chars = iwaromaRef.current.querySelectorAll('span');
        tl.to(chars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.4");
      }

      if (titleRef.current) {
        tl.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "<"); // 同じタイミングでスタート
      }

      // 説明文を1行ずつフェードイン
      if (contentRef.current) {
        const contentLines = contentRef.current.querySelectorAll('p');
        tl.to(contentLines, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        }, "+=0.1");
      }

      // RE:のアニメーション（左から猛烈なスピードで飛び込み）
      if (rePrefixRef.current) {
        tl.to(rePrefixRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "expo.out"
        }, "+=0.2");
      }
    } else {
      // PC: スクロールトリガーでアニメーション
      const container = containerRef.current;
      if (!container) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Introductionの文字を一文字ずつ左斜め下からアニメーション
        if (subtitleRef.current) {
          const chars = subtitleRef.current.querySelectorAll('span');
          tl.to(chars, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }

        // IWAROMAN, メイン見出し（RE:以外の部分）を同時スタート
        if (iwaromaRef.current) {
          const chars = iwaromaRef.current.querySelectorAll('span');
          tl.to(chars, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.4");
        }

        if (titleRef.current) {
          tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          }, "<"); // 同じタイミングでスタート
        }

        // 説明文を1行ずつフェードイン
        if (contentRef.current) {
          const contentLines = contentRef.current.querySelectorAll('p');
          tl.to(contentLines, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          }, "+=0.2");
        }

        // RE:のアニメーション（左から猛烈なスピードで飛び込み）
        if (rePrefixRef.current) {
          tl.to(rePrefixRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "expo.out"
          }, "+=0.3");
        }
      }, container);

      return () => ctx.revert();
    }
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-screen landscape:h-screen flex items-center justify-center text-white overflow-hidden bg-black">
      {/* 背景スライド - レスポンシブ対応 */}
      {slides.map((slide, i) => (
        <picture key={i} className="absolute inset-0">
          {/* モバイル用画像切り替え閾値 */}
          <source media="(max-width: 440px)" srcSet={slide.srcMobile ?? slide.srcDesktop} />
          <img
            src={slide.srcDesktop} // デスクトップ・タブレット用
            alt={slide.alt}
            className={[
              "absolute inset-0 w-full h-full transition-opacity duration-1500 ease-linear block",
              i === index ? "opacity-100" : "opacity-0",
              "sm:object-cover sm:object-center",
              "max-sm:object-cover max-sm:object-center",
            ].join(" ")}
          />
        </picture>
      ))}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/55" />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-[80vw] flex flex-col items-center py-5">
        {/* 小見出し */}
        <h2
          ref={subtitleRef}
          className="
            relative inline-block font-bold uppercase scale-x-150
            after:content-[''] after:absolute after:left-0 after:right-0
            after:-bottom-0 after:h-[1.5px] after:bg-current
          "
          style={{ fontFamily: 'Prompt, sans-serif' }}
        >
          Introduction
        </h2>

        {/* メイン見出し */}
        <h1 ref={titleRef} className="mt-6 sm:mt-10 text-3xl md:text-5xl leading-[0.9] md:leading-[1.05] font-extrabold scale-x-150 tracking-[0.03em] relative" style={{ fontFamily: 'Prompt, sans-serif' ,fontWeight:700}}>
          <span ref={rePrefixRef} className="inline-block">RE:</span><span ref={iwaromaRef} className="inline-block">IWAROMAN</span>
        </h1>

        {/* 説明文 */}
        <div ref={contentRef} className="mt-4 md:mt-8 space-y-2 text-xs md:text-sm leading-[1] sm:leading-[1.2] text-white text-center" style={{ fontFamily: '"momochidori", serif' ,fontWeight:500}}>
          {INTRODUCTION_CATCH_CONTENTS.map((content, i) => (
            <p key={i}>{content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroductionCatch;
