import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Slide, TopsVisualProps } from "@/types";
import reiwa2 from "@/assets/reiwa_2.png";
import reiwa2_mobile from "@/assets/reiwa_2_mobile.png";
import reiwa3 from "@/assets/reiwa_3.png";
import reiwa3_mobile from "@/assets/reiwa_3_mobile.png";

const slides: Slide[] = [
  { srcDesktop: reiwa2, srcMobile: reiwa2_mobile, alt: "Top Visual" },
  { srcDesktop: reiwa3, srcMobile: reiwa3_mobile, alt: "Top Performance" },
];

const TopsVisual = ({ resetSignal = 0, active = true }: TopsVisualProps) => {
  const [index, setIndex] = useState<number>(0);
  const [primed, setPrimed] = useState<boolean>(false); // 初期化完了フラグ
  const timeoutRef = useRef<number | null>(null);
  const raf1 = useRef<number | null>(null);
  const raf2 = useRef<number | null>(null);

  // コンポーネントがアクティブになった際の初期化処理
  useLayoutEffect(() => {
    if (!active) return;
    setPrimed(false);
    setIndex(0);

    // 2フレーム待機してから表示開始（状態変更の安定化）
    raf1.current = window.requestAnimationFrame(() => {
      raf2.current = window.requestAnimationFrame(() => {
        setPrimed(true); // フェードイン開始
      });
    });

    return () => {
      if (raf1.current) cancelAnimationFrame(raf1.current);
      if (raf2.current) cancelAnimationFrame(raf2.current);
      raf1.current = raf2.current = null;
    };
  }, [resetSignal, active]);

  // スライド自動切り替えタイマー
  useEffect(() => {
    if (!active) return;
    if (!primed) return; // 初期化完了まで待機
    timeoutRef.current = window.setTimeout(() => {
      setIndex(1);
      timeoutRef.current = null;
    }, 10000);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [active, primed]);

  return (
    <div
      className={[
        "relative w-full min-h-screen bg-black",
        // 初期化完了まで非表示（外部フェードより早い隠し）
        primed ? "opacity-100" : "opacity-0",
        "transition-opacity duration-0", // 瞬時切替（外部がフェード制御）
      ].join(" ")}
    >
      {slides.map((s, i) => (
        <picture key={i} className="absolute inset-0">
          {/* モバイル用画像切り替え閾値 */}
          <source media="(max-width: 400px)" srcSet={s.srcMobile ?? s.srcDesktop} />
          <img
            src={s.srcDesktop} // デスクトップ・タブレット用
            alt={s.alt}
            className={[
              "w-full h-full transition-opacity duration-1500 ease-in-out",
              // レスポンシブ表示制御：デスクトップは画面全体カバー、モバイルは画像全体表示
              "object-cover sm:object-cover max-sm:object-contain max-sm:object-center",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </picture>
      ))}
      <div className="absolute bottom-10 inset-x-0 flex justify-center">
        <img src="src/assets/5.png" alt="REIWAROMAN" className="h-auto object-contain w-[35vw]" />
      </div>
    </div>
  );
};

export default TopsVisual;
