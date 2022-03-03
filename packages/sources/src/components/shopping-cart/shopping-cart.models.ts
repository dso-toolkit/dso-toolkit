export interface ShoppingCart {
  collapsed: string;
  hideSummary: string;
  isOpen: boolean;
  items: ShoppingCartItem[];
  shoppingcartTitleTag: string;
  shoppingcartTitle: string;
}

export interface ShoppingCartItem {
  label: string;
  additive: number;
  edit: boolean;
  readonly: boolean;
  subitems: ShoppingCartSubitem[];
  id: string;
}

export interface ShoppingCartSubitem {
  label: string;
  warning: boolean;
}
