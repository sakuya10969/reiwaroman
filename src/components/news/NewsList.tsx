import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NewsRow from "@/components/news/NewsRow";
import type { NewsListProps } from "@/types";
import { NEWS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const NewsList = ({
  bgColorClass = "bg-red-900",
  pyClass = "py-16 md:py-24",
}: NewsListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    const list = listRef.current;
    
    if (!container || !heading || !list) return;

    // NEWSテキストを一文字ずつspan要素に分割
    if (heading) {
      const badgeText = "NEWS";
      heading.innerHTML = "";
      badgeText.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "inline-block";
        heading.appendChild(span);
      });
    }

    const ctx = gsap.context(() => {
      // NEWSの各文字を初期状態で左斜め下に移動、透明にする
      if (heading) {
        const badgeChars = heading.querySelectorAll('span');
        gsap.set(badgeChars, {
          x: -50,
          y: 50,
          opacity: 0,
        });
      }

      // リスト内の各NewsRowを初期状態で左斜め下に移動、透明にする
      const newsRows = list.children;
      gsap.set(newsRows, {
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

      // NEWSの文字を一文字ずつ左斜め下からアニメーション
      if (heading) {
        const badgeChars = heading.querySelectorAll('span');
        tl.to(badgeChars, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

      // その後、NewsRowを順番に左斜め下からアニメーション
      tl.to(newsRows, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.8");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative text-white w-full max-h-screen lg:h-screen flex items-center justify-center ${bgColorClass}`}
    >
      <div className={`mx-auto max-w-[80vw] px-4 ${pyClass}`}>
        {/* 見出し */}
        <div className="w-full text-center">
          <h1
            ref={headingRef}
            className="text-sm md:text-base font-bold inline-block relative scale-x-150 origin-center
              after:content-[''] after:absolute after:left-0 after:right-0
              after:-bottom-0 after:h-[1.5px] after:bg-current"
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            NEWS
          </h1>
        </div>

        {/* リスト */}
        <div ref={listRef} className="mt-4 md:mt-8 space-y-1 md:space-y-2">
          {NEWS.map((item, i) => (
            <NewsRow key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
