import type { HeaderTheme, NavItem } from "@/types";

export const findNavIndexBySectionId = (nav: NavItem[], activeId?: string | null) => {
  if (!activeId) return -1;
  return nav.findIndex((n) => (n.sectionIds || []).includes(activeId));
}

/** アクティブ時の色（ダーク: 赤, レッド: 黒）。未マッチや未知テーマは null 返す */
export const getActiveLinkClassesByTheme = (theme?: HeaderTheme | null) => {
  if (theme === "dark") {
    return `text-red-900 underline decoration-red-900 underline-offset-4 decoration-1`;
  }
  if (theme === "red") {
    return `text-black underline decoration-black underline-offset-4 decoration-1`;
  }
  return null;
}

export const getThemeBySection = (
  activeId: string | null | undefined,
  sectionThemes: Record<string, HeaderTheme> | undefined,
  fallback: HeaderTheme
): HeaderTheme => {
  if (!activeId) return fallback;
  const t = sectionThemes?.[activeId];
  return t ?? fallback;
};

/** SECTION_THEMES から監視対象ID配列を作る */
export const buildObserveIdsFromMap = (
  sectionThemes?: Record<string, HeaderTheme>
): string[] => {
  return sectionThemes ? Object.keys(sectionThemes) : [];
};

/** 通常リンク（非アクティブ）のクラス */
export const linkBaseClass =
  "text-sm uppercase font-bold transition-opacity hover:opacity-80 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 rounded-sm";

/** 非アクティブの色（白・下線なし） */
export const linkInactiveColor = "text-white no-underline";

export const linkColorClass = (isActive: boolean) =>
  isActive
    ? "text-white underline underline-offset-4 decoration-1 decoration-white"
    : "text-white no-underline";

export const ticketButtonClass = (theme: HeaderTheme) =>
  theme === "red"
    ? "text-red-900 bg-white hover:bg-white/90"
    : "text-white bg-red-900 hover:bg-red-900/90";

export const ticketFocusRingClass = (theme: HeaderTheme) =>
  theme === "red" ? "focus-visible:ring-red-900" : "focus-visible:ring-white";
