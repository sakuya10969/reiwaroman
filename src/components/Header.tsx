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
import logo from "@/assets/logo.png";
import { TICKET_URL } from "@/constants";

const Header = ({ nav = NAV, ticketHref = TICKET_URL }: HeaderProps) => {
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
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent w-screen">
      <div className="relative h-16 flex items-start justify-between">
        {/* 左：ロゴ */}
        <div className="flex-shrink-0 ml-1">
          <img
            src={logo}
            alt="REIWAROMAN"
            className="h-14 w-34 md:h-16 w-40 lg:h-25 lg:w-55 object-contain object-left pointer-events-none select-none opacity-80"
          />
        </div>

        {/* 右：ナビ + TICKET */}
        <div className="flex items-center gap-3">
          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-3 origin-left scale-x-140 mr-14 lg:pt-4">
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

          <div className="hidden md:block shrink-0 w-8 lg:w-10" aria-hidden />

          {/* デスクトップTICKET */}
          <a
            href={ticketHref}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "hidden md:inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-1 mr-4 md:ml-2 lg:mt-4 lg:ml-0 lg:mr-6 text-sm uppercase font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2",
              ticketButtonClass(currentTheme),
              ticketFocusRingClass(currentTheme),
            ].join(" ")}
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            <span className="inline-block origin-center scale-x-140">TICKET</span>
            <ChevronRight size={20} />
          </a>

          {/* モバイルTICKET */}
          <a
            href={ticketHref}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "md:hidden inline-flex items-center gap-3 rounded-full pl-5 pr-1 py-2 mt-2 text-xs uppercase font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2",
              ticketButtonClass(currentTheme),
              ticketFocusRingClass(currentTheme),
            ].join(" ")}
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            <span className="inline-block origin-center scale-x-140">TICKET</span>
            <ChevronRight size={16} />
          </a>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMobileMenu}
            className={[
              "md:hidden pt-2 pr-2 relative z-50",
              "text-white",
              "!bg-transparent hover:!bg-transparent",
              "focus:!bg-transparent active:!bg-transparent",
              "appearance-none border-0 outline-none", 
              "[-webkit-tap-highlight-color:transparent]" 
            ].join(" ")}
            style={{ backgroundColor: "transparent" }} 
            aria-label="メニューを開く"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー（右側スライドアウト） */}
      <div
        className={`flex flex-col items-center justify-center md:hidden fixed top-0 right-0 w-full h-screen backdrop-blur-sm border-l border-white/10 transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${currentTheme === "red" ? "bg-red-900" : "bg-black/50"}`}
      >
       <nav className="flex flex-col items-center">
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
                  "block py-2 text-base font-bold transition-colors scale-x-150",
                  activeColorClass || linkInactiveColor,
                ].join(" ")}
                style={{ fontFamily: "Prompt, sans-serif" }}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={ticketHref}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-1 mt-4 text-sm uppercase font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2",
              ticketButtonClass(currentTheme),
              ticketFocusRingClass(currentTheme),
            ].join(" ")}
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            <span className="inline-block origin-center scale-x-140">TICKET</span>
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
    </header>
  );
};

export default Header;