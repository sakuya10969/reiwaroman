import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CONTACT_CONTENTS } from "@/constants";
import reiwa12 from "@/assets/Caution.jpg";
import type { ContactProps } from "@/types";
import { toBlocks } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ badgeText = "CANTACT" }: ContactProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    const list = listRef.current;
    if (!container || !badge || !list) return;

    // li（トップレベル＋ネスト）をすべて対象にフェード
    const listItems = list.querySelectorAll('li');

    const ctx = gsap.context(() => {
      gsap.set(badge, { y: -50, opacity: 0 });
      gsap.set(listItems, { y: -50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(badge, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(listItems, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.15,
        }, "-=0.5");
    }, container);

    return () => ctx.revert();
  }, []);

  const blocks = toBlocks(CONTACT_CONTENTS);

  return (
    <div ref={containerRef} id="contact" className="relative w-full isolate">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black-900 -z-20 bg-cover bg-center"
        aria-hidden="true"
        style={{ backgroundImage: `url(${reiwa12})` }}
      />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
        {/* バッジ */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <div
            className="text-sm text-white md:text-base font-bold transform scale-x-140"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <p className="relative inline-block uppercase after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current">
              {badgeText}
            </p>
          </div>
        </div>

        {/* 注意事項（拡張描画） */}
        <ul
          ref={listRef}
          className="flex flex-col text-center mt-4 text-xs md:text-sm leading-relaxed scale-y-100 text-white w-[85vw] max-w-2xl md:max-w-4xl lg:max-w-5xl mb-2"
        >
          {blocks.map((b, i) => {
            if (b.kind === "note") {
              return (
                <li
                  key={i}
                  className={`relative mb-2 ${i === 3 ? "pl-5 pb-3" : ""}`}
                  style={{ fontFamily: '"momochidori", serif' }}
                >
                  {i === 3 && <span className="mr-2">※</span>}
                  {b.text}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Contact;