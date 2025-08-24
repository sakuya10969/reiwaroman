import { useEffect, useMemo, useRef, useState } from "react";

/** 指定されたセクションIDの中から、現在最もアクティブなセクションを判定するカスタムフック */
export const useActiveSection = (
  sectionIds: string[],
  rootMarginTopPx = 64
) => {
  const [activeId, setActiveId] = useState<string>("");

  // IntersectionObserver用の参照オブジェクト
  const ratiosRef = useRef<Map<string, number>>(new Map());
  const elsRef = useRef<Map<string, HTMLElement>>(new Map());

  // IntersectionObserver の閾値を0から1まで0.1刻みで設定
  const thresholds = useMemo(
    () => Array.from({ length: 11 }, (_, i) => i / 10),
    []
  );

  useEffect(() => {
    if (!sectionIds.length) return;

    // 初期化: 全セクションの交差率を0に設定
    ratiosRef.current = new Map(sectionIds.map((id) => [id, 0]));
    elsRef.current = new Map();

    const options: IntersectionObserverInit = {
      root: null,
      // 上部はヘッダー分を除外、下部は40%除外して中央寄りの可視性を重視
      rootMargin: `-${rootMarginTopPx}px 0px -40% 0px`,
      threshold: thresholds,
    };

    const io = new IntersectionObserver((entries) => {
      // エントリーの変化を交差率マップに反映
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (!id) continue;
        elsRef.current.set(id, entry.target as HTMLElement);
        ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
      }

      // ページ最下端の検出: lastセクションを強制的にアクティブにする
      const atBottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        Math.floor(document.documentElement.scrollHeight);

      if (atBottom) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (lastId && activeId !== lastId) setActiveId(lastId);
        return;
      }

      // 最大交差率のセクションを選出（同率の場合は後方のセクションを優先）
      let bestId = "";
      let bestRatio = -1;

      for (const id of sectionIds) {
        const r = ratiosRef.current.get(id) ?? 0;
        if (r > bestRatio || (r === bestRatio && id !== bestId)) {
          bestRatio = r;
          bestId = id;
        }
      }

      if (bestId && bestId !== activeId) setActiveId(bestId);
    }, options);

    // 全セクションをIntersectionObserverに登録
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      elsRef.current.set(id, el);
      io.observe(el);
    });

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(","), rootMarginTopPx]); // joinで配列の依存関係を安定化

  return activeId;
};
