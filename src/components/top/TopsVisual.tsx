import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Slide, TopsVisualProps } from "@/types";

const slides: Slide[] = [
  { src: "src/assets/reiwa_2.png", alt: "Top Visual" },
  { src: "src/assets/reiwa_3.png", alt: "Top Performance" },
];

const TopsVisual = ({ resetSignal = 0, active = true }: TopsVisualProps) => {
  const [index, setIndex] = useState<number>(0);
  const [primed, setPrimed] = useState<boolean>(false); // ← 初期化完了後に true
  const timeoutRef = useRef<number | null>(null);
  const raf1 = useRef<number | null>(null);
  const raf2 = useRef<number | null>(null);

  // 表示開始時：index を 0 に初期化し、描画を2フレーム安定させてから可視化
  useLayoutEffect(() => {
    if (!active) return;
    setPrimed(false);
    setIndex(0);

    // 2段 rAF：state反映→描画→次フレームで“見せる”に切り替え
    raf1.current = window.requestAnimationFrame(() => {
      raf2.current = window.requestAnimationFrame(() => {
        setPrimed(true); // ここで初めて見せる（= クロスフェード開始）
      });
    });

    return () => {
      if (raf1.current) cancelAnimationFrame(raf1.current);
      if (raf2.current) cancelAnimationFrame(raf2.current);
      raf1.current = raf2.current = null;
    };
  }, [resetSignal, active]);

  // 可視の間だけ 5 秒後に 1→（2枚目へ）
  useEffect(() => {
    if (!active) return;
    if (!primed) return; // まだ見せない段階ではタイマー動かさない
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
        "relative w-full min-h-[100vh]",
        // 準備完了まで完全透明（外側のクロスフェードより前に自分を隠す）
        primed ? "opacity-100" : "opacity-0",
        "transition-opacity duration-0", // ここは一瞬で切替（外側がフェードする）
      ].join(" ")}
    >
      {slides.map((s, i) => (
        <img
          key={i}
          src={s.src}
          alt={s.alt}
          className={[
            "absolute inset-0 w-full h-full object-cover",
            "transition-opacity duration-1500 ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      ))}

      <div className="absolute bottom-10 inset-x-0 flex justify-center">
        <img src="src/assets/5.png" alt="REIWAROMAN" className="h-auto object-contain w-[35vw]" />
      </div>
    </div>
  );
};

export default TopsVisual;
