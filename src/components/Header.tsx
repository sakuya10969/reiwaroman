import { useEffect, useState } from "react";

import { NAV } from "@/constants";
import type { HeaderProps } from "@/types";

const Header = ({ nav = NAV, ticketHref = "#ticket", Logo }: HeaderProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-all duration-300",
        // 初期から黒っぽく。スクロールで濃く＋境界線
        scrolled
          ? "bg-black/80 backdrop-blur supports-backdrop-blur:border-b border-white/10"
          : "bg-black/60",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="relative h-16 flex items-center">
          {/* 左：ロゴ */}
          <a href="#top" className="shrink-0 inline-flex items-center gap-2 group">
            {Logo ? (
              <Logo />
            ) : (
              <div className="w-9 h-9 bg-white text-black grid place-items-center font-black text-[10px] leading-none tracking-tight group-hover:scale-105 transition">
                RR
              </div>
            )}
            <span className="sr-only">REIWAROMAN</span>
          </a>

          {/* 中央：ナビ（絶対配置でセンター） */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-7 text-white font-extrabold uppercase tracking-wider">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 右：TICKET */}
          <a
            href={ticketHref}
            className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold uppercase text-white bg-[#a01e22] hover:bg-[#b3272b] transition-colors"
          >
            <span>TICKET</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
