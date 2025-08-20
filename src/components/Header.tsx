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
        // 初期は透明、スクロールで黒っぽく＋境界線
        scrolled
          ? "bg-black/80 backdrop-blur supports-backdrop-blur:border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="w-full px-4">
        <div className="relative h-16 flex items-center justify-between">
          {/* 左：ロゴ */}
          <a href="#top" className="shrink-0 inline-flex items-center gap-2 group !text-white hover:!text-white">
            {Logo ? (
              <Logo />
            ) : (
              <div className="w-9 h-9 bg-white text-black grid place-items-center font-black text-[10px] leading-none tracking-tight group-hover:scale-105 transition">
                RR
              </div>
            )}
            <span className="sr-only">REIWAROMAN</span>
          </a>

          {/* 右：ナビ + TICKET */}
          <div className="flex items-center gap-7">
            <nav className="hidden md:flex items-center gap-7">
              {nav.map((item) => (
                <a
                  key={item.href}
                  className="text-sm uppercase tracking-wider text-white hover:opacity-80 transition-opacity font-bold"
                  style={{ fontFamily: 'Prompt, sans-serif' }}
                  href={item.href}
                >
                  {item.label}
                </a>            
              ))}
            </nav>

            {/* TICKET */}
            <a
              href={ticketHref}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm uppercase text-white bg-[#a01e22] hover:bg-[#b3272b] transition-colors font-bold"
              style={{ fontFamily: 'Prompt, sans-serif' }}
            >
              <span>TICKET</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
