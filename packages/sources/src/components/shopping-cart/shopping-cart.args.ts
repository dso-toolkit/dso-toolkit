import { ArgTypes } from '../../stories-helpers';

import { ShoppingCart, ShoppingCartItem } from './shopping-cart.models';

export interface ShoppingCartArgs {
  collapsed: string;
  hideSummary: string;
  items: ShoppingCartItem[];
  shoppingcartTitleTag: 'h2' | 'h3';
  shoppingcartTitle: string;
}

export const shoppingCartArgTypes: ArgTypes<ShoppingCartArgs> = {
  collapsed: {
    control: {
      type: 'boolean'
    }
  },
  hideSummary: {
    control: {
      type: 'boolean'
    }
  },
  items: {
    control: {
      disable: true
    }
  },
  shoppingcartTitleTag: {
    options: ['h2', 'h3'],
    control: {
      type: 'select',
    }
  },
  shoppingcartTitle: {
    control: {
      type: 'text'
    }
  }
};

export function shoppingCartArgsMapper(a: ShoppingCartArgs): ShoppingCart {
  return {
    collapsed: a.collapsed,
    hideSummary: a.hideSummary,
    items: a.items,
    shoppingcartTitleTag: a.shoppingcartTitleTag,
    shoppingcartTitle: a.shoppingcartTitle
  };
}
