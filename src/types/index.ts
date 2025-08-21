export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  nav?: NavItem[];
  ticketHref?: string;
  Logo?: React.ComponentType;
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
}

export interface IntroductionCatchProps {
  /** 複数の背景画像を渡す */
  bgSrcList?: string[];
  /** 画像切替の間隔（ms） */
  interval?: number;
}

export interface NewsCatchProps {
  backgroundImageUrl?: string;
  badgeText?: string;
  titleLines?: string[];
};

export interface CastProps {
  badgeText?: string;
  castName?:string[];
  castImageUrl?: string[];
}

export interface GoodsProps {
  badgeText?: string;
  goodsName?:string[];
  goodsImageUrl?: string[];
}