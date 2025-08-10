import { useEffect, useState } from "react";

type NavItem = { label: string; href: string };

const DEFAULT_NAV: NavItem[] = [
  { label: "TOPS", href: "#tops" },
  { label: "INTRODUCTION", href: "#introduction" },
  { label: "NEWS", href: "#news" },
  { label: "CAST", href: "#cast" },
  { label: "GOODS", href: "#goods" },
];

type HeaderProps = {
  nav?: NavItem[];
  ticketHref?: string;
  Logo?: React.ComponentType;
};

const Header = ({
  nav = DEFAULT_NAV,
  ticketHref = "#ticket",
  Logo,
}: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/70 backdrop-blur supports-backdrop-blur:border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-7 text-white font-extrabold tracking-wide">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="uppercase text-sm hover:opacity-80 transition-opacity"
              >
                {item.label}
              </a>
            ))}

            <a
              href={ticketHref}
              className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold uppercase bg-[#a01e22] hover:bg-[#b3272b] transition-colors"
            >
              <span>Ticket</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
