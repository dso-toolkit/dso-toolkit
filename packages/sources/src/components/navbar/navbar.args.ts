import { ArgTypes } from '../../stories-helpers';

import { Navbar, NavbarItem } from './navbar.models';

export interface NavbarArgs {
  href: string;
  items: NavbarItem[];
  modifier: string;
  open: boolean;
}

export const navbarArgTypes: ArgTypes<NavbarArgs> = {
  href: {
    control: {
      type: 'string'
    }
  },
  items: {
    control: {
      disable: true
    }
  },
  modifier: {
    control: {
      type: 'string'
    }
  },
  open: {
    control: {
      type: 'boolean'
    }
  }
};

export function navbarArgsMapper(a: NavbarArgs): Navbar {
  return {
    href: a.href,
    items: a.items,
    modifier: a.modifier,
    open: a.open
  };
}
