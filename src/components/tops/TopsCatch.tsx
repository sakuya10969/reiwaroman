import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { TOPS_CATCH_TITLE } from "@/constants";


const TopsCatch = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;

    if (!container || !title) return;

    const originalText = TOPS_CATCH_TITLE;
    title.innerHTML = "";
    originalText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.className = "inline-block";
      title.appendChild(span);
    });

    const ctx = gsap.context(() => {
      const chars = title.querySelectorAll('span');

      // --- 初期状態のセットアップ ---
      gsap.set(chars, {
        y: -50,
        opacity: 0,
        rotationX: 90,
        transformOrigin: "bottom center",
        force3D: true,
      });


      const tl = gsap.timeline({
        delay: 0.5,
      });


      tl.to(chars, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });

    }, container);


    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex relative w-full h-full bg-black text-white text-center flex-col justify-center items-center">

      <div className="w-[90vw] flex flex-col items-center justify-center">
        <div>
          <h1
            ref={titleRef}
            className="mx-auto text-3xl md:text-5xl lg:text-6xl
                       font-extrabold leading-[1.1] tracking-tighter whitespace-nowrap"
            style={{
              fontFamily: '"dnp-shuei-shogomincho-std", serif',
              writingMode: 'vertical-rl',
              textOrientation: 'upright'
            }}
          >
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TopsCatch;