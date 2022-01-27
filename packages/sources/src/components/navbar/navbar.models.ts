export interface Navbar {
  href: string;
  items: NavbarItem[];
  modifier: string;
  open: boolean;
}

export interface NavbarItem {
  label: string;
  active?: boolean;
}
