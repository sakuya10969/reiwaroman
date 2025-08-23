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

export interface NewsCatchProps {
  backgroundImageUrl?: string;
  badgeText?: string;
  titleLines?: string[];
};

export interface Slide {
  src: string;
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