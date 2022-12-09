export interface Navbar {
  items: NavbarItem[];
  modifier: string;
  open: boolean;
}

export interface NavbarItem {
  href: string;
  label: string;
  active?: boolean;
}
