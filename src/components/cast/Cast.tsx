import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import cast_reiwa from "@/assets/cast_reiwa_edit.png";
import cast_mayurika from "@/assets/cast_mayurika_edit.png";
import cast_nanamagari from "@/assets/cast_nanamagari_edit.png";
import cast_mitorizu from "@/assets/cast_mitori_edit.png";
import type { CastProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const CastReiwa = cast_reiwa;
const CastMayurika = cast_mayurika;
const CastNanamagari = cast_nanamagari;
const CastMitorizu = cast_mitorizu;

const Cast = ({
  badgeText = "CAST",
  castName = ["令和ロマン", "マユリカ", "ななまがり", "見取り図×星夏＆愛花"],
  castImageUrl = [CastReiwa, CastMayurika, CastNanamagari, CastMitorizu],
}: CastProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const castGridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    const castGrid = castGridRef.current;
    
    if (!container || !badge || !castGrid) return;

    const ctx = gsap.context(() => {
      // バッジを初期状態で下に移動、透明にする
      gsap.set(badge, {
        y: 50,
        opacity: 0,
      });

      // キャスト一覧の各アイテムを初期状態で下に移動、透明にする
      const castItems = castGrid.children;
      gsap.set(castItems, {
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

      // バッジから先にアニメーション
      tl.to(badge, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // その後、キャストアイテムを順番にアニメーション
      tl.to(castItems, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.4");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full isolate flex items-center justify-center"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-10"
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto pt-12 px-4">
        {/* 上部のバッジ */}
        <div ref={badgeRef} className="flex justify-center mb-10">
          <div
            className="text-sm text-white/90 md:text-base font-bold transform scale-x-150"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <span className="inline-block uppercase underline underline-offset-4">
              {badgeText}
            </span>
          </div>
        </div>
        {/* キャスト一覧 */}
        <div ref={castGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {castImageUrl.map((photo, index) => (
            <div key={index} className="text-center">
              <img
                src={photo}
                alt={`Cast Photo ${index + 1}: ${castName[index]}`}
                className="w-full h-auto"
              />
              <p
                className="mt-3 text-sm text-white/90"
                style={{ fontFamily: 'momochidori, sans-serif' ,fontWeight: 500 }}
              >{castName[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cast;