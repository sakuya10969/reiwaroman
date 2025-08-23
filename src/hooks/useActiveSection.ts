import { useEffect, useState } from "react";

/** 画面内で主役になったセクションの id を返す */
export const useActiveSection = (sectionIds: string[], rootMarginTopPx = 64) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!sectionIds.length) return;

    const observers: IntersectionObserver[] = [];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${rootMarginTopPx}px 0px -50% 0px`,
      threshold: 0.3,
    };

    const handler: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) setActiveId(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(handler, options);
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [sectionIds.join(","), rootMarginTopPx]);

  return activeId;
};
