import { useEffect, useMemo, useState, useCallback } from "react";
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
          <div className="flex items-center gap-7">
            <nav className="hidden md:flex items-center gap-7">
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
                        ? // アクティブ：赤文字＋赤下線（太め・オフセット広め）
                          `text-[${ACTIVE_COLOR}] underline decoration-[${ACTIVE_COLOR}] underline-offset-8 decoration-4`
                        : "text-white no-underline",
                    ].join(" ")}
                    style={{ fontFamily: "Prompt, sans-serif" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* TICKET */}
            <a
              href={ticketHref}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm uppercase text-white bg-[#a01e22] hover:bg-[#b3272b] transition-colors font-bold"
              style={{ fontFamily: "Prompt, sans-serif" }}
            >
              <span>TICKET</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
