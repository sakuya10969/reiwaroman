import { useEffect, useMemo, useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";

import { NAV } from "@/constants";
import type { HeaderProps } from "@/types";

const ACTIVE_COLOR = "#a01e22"; // 赤

// 現在見えているセクションIDを返すフック
function useActiveSection(ids: string[], rootMarginTopPx = 64) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!ids.length) return;

    const observers: IntersectionObserver[] = [];
    // しきい値高め＝そのセクションが主役になった時に切り替え
    const options: IntersectionObserverInit = {
      // 固定ヘッダー分だけ上を食い込ませる
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

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(handler, options);
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, [ids, rootMarginTopPx]);

  return activeId;
}

const Header = ({ nav = NAV, ticketHref = "#ticket" }: HeaderProps) => {
  // href="#news" → "news"
  const sectionIds = useMemo(
    () =>
      nav
        .map((n) => (n.href || "").replace(/^#/, ""))
        .filter((s) => s && s !== "ticket" && s !== "top"),
    [nav]
  );
  const activeId = useActiveSection(sectionIds, 64);

  // クリック時にスムーズスクロール
  const onNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget.getAttribute("href") || "").trim();
    if (!href.startsWith("#")) return;
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: "smooth" });
    // URLのハッシュだけ更新したい場合
    history.replaceState(null, "", href);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="w-full px-4">
        <div className="relative h-16 flex items-center justify-between">
          {/* 左：ロゴ */}
          <a
            href="#tops"
            className="shrink-0 inline-flex items-center gap-2 group"
          >
            <img 
              src="src/assets/5.png" 
              alt="REIWAROMAN"
              className="h-10 w-auto object-contain group-hover:scale-105 transition"
            />
            <span className="sr-only">REIWAROMAN</span>
          </a>

          {/* 右：ナビ + TICKET */}
          <div className="flex items-center gap-3">
            {/* ← 左基準で拡大 & 右に実余白を確保 */}
            <nav className="hidden md:flex items-center gap-3 origin-left scale-x-[1.3] mr-8">
              {nav.map((item) => {
                const id = (item.href || "").replace(/^#/, "");
                const isActive = id && id === activeId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavClick}
                    className={[
                      "text-sm uppercase tracking-wider transition-opacity font-bold",
                      "hover:opacity-80",
                      isActive
                        ? `text-[${ACTIVE_COLOR}] underline decoration-[${ACTIVE_COLOR}] underline-offset-8 decoration-4`
                        : "text-white no-underline",
                    ].join(" ")}
                    style={{ fontFamily: "Prompt, sans-serif" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:block shrink-0 w-12 lg:w-16" aria-hidden />

            {/* TICKET */}
            <a
              href={ticketHref}
              className="inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 text-sm uppercase text-white bg-[#a01e22] hover:bg-[#b3272b] transition-colors font-bold whitespace-nowrap"
              style={{ fontFamily: "Prompt, sans-serif" }}
            >
              <span className="inline-block origin-center scale-x-[1.3]">TICKET</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
