import type { HeaderTheme } from "@/types";
import type { NavItem } from "@/types";
import type { NewsItem } from "@/types";

export const NAV: NavItem[] = [
  { label: "TOPS",          href: "#tops",         sectionIds: ["tops"] },
  { label: "INTRODUCTION",  href: "#introduction-catch", sectionIds: ["introduction-catch", "introduction-live", "introduction-venue"] },
  { label: "NEWS",          href: "#news-catch",        sectionIds: ["news-catch", "news-list"] },
  { label: "CAST",          href: "#cast",              sectionIds: ["cast"] },
  { label: "GOODS",         href: "#goods",             sectionIds: ["goods"] },
];

export const NEWS: NewsItem[] = [
  { date: "2025-09-13", title: "応援グッズに関して", href: "/news/20250913" },
  { date: "2025-09-01", title: "「RE:IWAROMAN」プレミアムチケット特典引換・特典会の詳細が決定！", href: "/news/20250901" },
  { date: "2025-08-28", title: "「RE:IWAROMAN」オフィシャルグッズ販売決定！", href: "/news/20250828" },
];

export const SECTION_THEMES: Record<string, HeaderTheme> = {
  "tops": "dark",
  "introduction-catch": "dark",
  "introduction-live": "dark",
  "introduction-venue": "dark",
  "news-catch": "dark",
  "news-list": "red",
  "cast": "dark",
  "goods": "dark",
  "caution": "red",
  "footer": "dark",
};
