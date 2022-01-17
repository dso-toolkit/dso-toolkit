export interface Navbar {
  items: NavbarItem[];
  modifier: string;
  open: boolean;
}

export interface NavbarItem {
  label: string;
  active?: boolean;
}
