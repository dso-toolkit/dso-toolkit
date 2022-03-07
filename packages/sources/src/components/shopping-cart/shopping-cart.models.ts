export interface ShoppingCart {
  collapsed?: boolean;
  hideSummary?: boolean;
  isOpen?: boolean;
  items: ShoppingCartItem[];
  shoppingcartTitleTag: string;
  shoppingcartTitle: string;
}

export interface ShoppingCartItem {
  label: string;
  additive?: string;
  edit?: boolean;
  readonly?: boolean;
  subitems?: ShoppingCartSubitem[];
  id: string;
}

export interface ShoppingCartSubitem {
  label: string;
  warning?: boolean;
}
