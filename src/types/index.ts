export interface NavItem {
  label: string;
  href: string;
  sectionIds: string[];
}

export interface HeaderProps {
  nav?: NavItem[];
  ticketHref?: string;
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
}

export interface IntroductionCatchProps {
  bgSrcList?: string[];
  interval?: number;
}

export interface IntroductionVideoProps {
  videoId?: string;
}

export interface NewsCatchProps {
  backgroundImageUrl?: string;
  badgeText?: string;
  titleLines?: string[];
};

export interface Slide {
  srcDesktop: string;
  srcMobile?: string;
  alt: string;
}

export interface TopsVisualProps {
  resetSignal?: number;
  active?: boolean;
}

export interface NewsItem {
  date: Date | string;
  title: string;
  href?: string;
};

export interface NewsListProps {
  bgColorClass?: string;
  pyClass?: string;
};

export type HeaderTheme = "dark" | "red";

export interface CastProps {
  badgeText?: string;
  castName?:string[];
  castImageUrl?: string[];
}

export interface GoodsProps {
  badgeText?: string;
  goodsName?:string[];
  goodsImageUrl?: string[];
  goodsPurchaseUrl?:string;
}

export interface CautionProps {
  badgeText?: string;
}

export interface LastProps {
  backgroundImageUrl?: string;
  FooterText?: string;
}

export interface TicketPlan {
  name: string;
  price: string;
  note?: string;
  perks?: string[];
};

export type Block =
    | { kind: "note"; text: string }                     // 先頭「※」系
    | { kind: "separator" }                              // 罫線
    | { kind: "link"; label: string; href: string }      // ＜ラベル＞ URL
    | { kind: "subheading"; text: string }               // ＜車椅子スペースについて＞
    | { kind: "sublist"; items: string[] }; 