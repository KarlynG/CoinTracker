export interface NavItem {
  label: string;
  icon: any;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export interface SidebarLink {
  icon: any;
  label: string;
  link?: string;
  active?: boolean;
  onClick?(): void;
}
