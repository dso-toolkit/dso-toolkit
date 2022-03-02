export interface ShoppingCart {
  collapsed: string;
  hideSummary: string;
  items: ShoppingCartItem[];
  shoppingcartTitleTag: string;
  shoppingcartTitle: string;
}

export interface ShoppingCartItem {
  label: string;
  additive: number;
  edit: boolean;
  subitems: ShoppingCartSubitem[];
}

export interface ShoppingCartSubitem {
  label: string;
  warning: boolean;
}
