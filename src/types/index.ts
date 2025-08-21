export interface NavItem {
  label: string;
  href: string;
  key: string;
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
