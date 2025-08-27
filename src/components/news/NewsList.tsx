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

    const ctx = gsap.context(() => {
      // 見出しを初期状態で下に移動、透明にする
      gsap.set(heading, {
        y: 50,
        opacity: 0,
      });

      // リスト内の各NewsRowを初期状態で下に移動、透明にする
      const newsRows = list.children;
      gsap.set(newsRows, {
        y: 80,
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

      // 見出しから先にアニメーション
      tl.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // その後、NewsRowを順番にアニメーション
      tl.to(newsRows, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative text-white w-full max-h-screen flex items-center justify-center ${bgColorClass}`}
    >
      <div className={`mx-auto max-w-[80vw] px-4 ${pyClass}`}>
        {/* 見出し */}
        <p
          ref={headingRef}
          className="w-full text-center text-sm md:text-base font-bold"
          style={{ fontFamily: "Prompt, sans-serif" }}
        >
          <span className="inline-block underline underline-offset-4 scale-x-150" style={{ fontFamily: "Prompt, sans-serif" }}>
            NEWS
          </span>
        </p>

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
