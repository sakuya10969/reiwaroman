import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { TOPS_CATCH_TITLE_LINES, TOPS_CATCH_SUBTITLE } from "@/constants";

const TopsCatch = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 即座に要素を非表示にする
    if (titleRef.current) {
      const titleLines = titleRef.current.querySelectorAll('p');
      gsap.set(titleLines, { y: 50, opacity: 0 });
    }
    
    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('p');
      gsap.set(subtitleLines, { y: 30, opacity: 0 });
    }

    // 1秒待ってからアニメーション開始
    const timer = setTimeout(() => {
      const tl = gsap.timeline();

      // タイトル行のアニメーション
      if (titleRef.current) {
        const titleLines = titleRef.current.querySelectorAll('p');
        
        tl.to(titleLines, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }

      // サブタイトル行のアニメーション
      if (subtitleRef.current) {
        const subtitleLines = subtitleRef.current.querySelectorAll('p');
        
        tl.to(subtitleLines, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex relative w-full h-full bg-black text-white text-center pt-0 flex-col justify-center">
      {/* テキストブロック */}
      <div className="pb-4 sm:px-6 w-[90vw] mx-auto flex flex-col items-center justify-center">
        <div ref={titleRef}>
          {TOPS_CATCH_TITLE_LINES.map((line, index) => (
            <p
              key={index}
              className="mx-auto text-3xl md:text-5xl lg:text-6xl
                         font-extrabold leading-[1.1] tracking-tighter whitespace-nowrap scale-x-80"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              {line}
            </p>
          ))}
        </div>

        <div ref={subtitleRef} className="mt-2">
          {TOPS_CATCH_SUBTITLE.map((line, index) => (
          <p
            key={index}
            className="text-sm md:text-base font-extrabold
                       uppercase whitespace-nowrap scale-y-80"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopsCatch;
