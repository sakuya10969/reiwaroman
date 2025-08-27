import { useMemo, useCallback, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

import { NAV } from "@/constants";
import { SECTION_THEMES } from "@/constants";
import type { HeaderProps } from "@/types";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  findNavIndexBySectionId,
  getActiveLinkClassesByTheme,
  linkBaseClass,
  linkInactiveColor,
  ticketButtonClass,
  ticketFocusRingClass,
} from "@/theme/headerTheme";
import logo_5 from "@/assets/logo_5.png";

const Header = ({ nav = NAV, ticketHref = "https://example.com" }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // 監視対象はセクションテーマのキーだけ
  const observeIds = useMemo(() => Object.keys(SECTION_THEMES), []);
  const activeId = useActiveSection(observeIds, 64);
  const currentTheme = useMemo(() => {
    const seedId = activeId || observeIds[0] || null;
    if (!seedId) return "dark";
    return SECTION_THEMES[seedId] ?? "dark";
  }, [activeId, observeIds]);

  // どのナビ項目が担当か
  const activeNavIndex = useMemo(
    () => findNavIndexBySectionId(nav, activeId),
    [nav, activeId]
  );

  // アクティブIDのテーマ（存在しなければ undefined）
  const activeTheme = activeId ? SECTION_THEMES[activeId] : undefined;

  const onNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (e.currentTarget.getAttribute("href") || "").trim();
    if (!href.startsWith("#")) return;
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", href);
    setIsMobileMenuOpen(false); // モバイルメニューを閉じる
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // TICKET ボタンは従来通り赤基調固定
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="w-full">
        <div className="relative h-16 flex items-start justify-between pt-2 px-2">
          {/* 左：ロゴ */}
          <div className="flex-shrink-0">
            <img
              src={logo_5}
              alt="REIWAROMAN"
              className="h-10 w-28 object-contain object-left pointer-events-none select-none"
            />
          </div>

          {/* 右：ナビ + TICKET */}
          <div className="flex items-center gap-3">
            {/* デスクトップナビ */}
            <nav className="hidden md:flex items-center gap-3 origin-left scale-x-140 mr-14">
              {nav.map((item, idx) => {
                const isThisActive = idx === activeNavIndex;
                // テーマに応じた「アクティブ色」を取り、無ければ何もしない
                const activeColorClass =
                  isThisActive ? getActiveLinkClassesByTheme(activeTheme) : null;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavClick}
                    className={[
                      linkBaseClass,
                      activeColorClass || linkInactiveColor, // テーマ未該当やナビ未登録なら白のまま
                    ].join(" ")}
                    style={{ fontFamily: "Prompt, sans-serif" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:block shrink-0 w-12 lg:w-16" aria-hidden />

            {/* デスクトップTICKET */}
            <a
              href={ticketHref}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "hidden md:inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-1 md:ml-2 lg:ml-0 text-sm uppercase font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2",
                ticketButtonClass(currentTheme),
                ticketFocusRingClass(currentTheme),
              ].join(" ")}
              style={{ fontFamily: "Prompt, sans-serif" }}
            >
              <span className="inline-block origin-center scale-x-140">TICKET</span>
              <ChevronRight size={20} />
            </a>

            {/* モバイルメニューボタン */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden pr-1 transition-colors hover:text-gray-300 relative z-50"
              aria-label="メニューを開く"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* モバイルメニュー（右側スライドアウト） */}
        <div
          className={`md:hidden fixed top-0 right-0 w-60 h-screen backdrop-blur-sm border-l border-white/10 transform transition-transform duration-300 ease-in-out z-40 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${currentTheme === "red" ? "bg-red-900" : "bg-black/50"}`}
        >
          <nav className="px-6 py-10">
            {nav.map((item, idx) => {
              const isThisActive = idx === activeNavIndex;
              const activeColorClass =
                isThisActive ? getActiveLinkClassesByTheme(activeTheme) : null;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onNavClick}
                  className={[
                    "block py-2 pl-2 text-base font-bold transition-colors origin-left scale-x-150",
                    activeColorClass || linkInactiveColor,
                  ].join(" ")}
                  style={{ fontFamily: "Prompt, sans-serif" }}
                >
                  {item.label}
                </a>
              );
            })}

            {/* モバイルTICKET */}
            <a
              href={ticketHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className={[
                "inline-flex items-center gap-2 rounded-full pl-8 pr-4 py-1 mt-1 text-base uppercase font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2",
                ticketButtonClass(currentTheme),
                ticketFocusRingClass(currentTheme),
              ].join(" ")}
              style={{ fontFamily: "Prompt, sans-serif" }}
            >
              <span className="inline-block origin-center scale-x-150">TICKET</span>
              <ChevronRight size={20} />
            </a>
          </nav>
        </div>

        {/* オーバーレイ（メニューが開いている時の背景） */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
