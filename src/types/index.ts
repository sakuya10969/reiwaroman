export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  nav?: NavItem[];
  ticketHref?: string;
  Logo?: React.ComponentType;
}
