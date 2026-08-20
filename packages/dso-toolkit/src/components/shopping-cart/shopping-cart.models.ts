type ShoppingCartVariant = "side" | "main";

type ShoppingCartItemVariant = "side" | "main" | "form";

export interface ShoppingCartToggleEvent {
  originalEvent: MouseEvent;
}

export interface ShoppingCartItemEditEvent {
  originalEvent: MouseEvent;
}

export interface ShoppingCartItemDeleteEvent {
  originalEvent: MouseEvent;
}

export interface ShoppingCartItemCloseEvent {
  originalEvent: MouseEvent;
}

export interface ShoppingCart {
  // HTML/CSS Shopping cart
  collapsable?: boolean;
  collapsed?: boolean;
  hideSummary?: boolean;
  removeAll?: boolean;
  isOpen?: boolean;
  shoppingcartTitleTag?: string;
  // Core Shopping cart
  variant?: ShoppingCartVariant;
  toggleLabel?: string;
  dsoToggle?: (event: CustomEvent<ShoppingCartToggleEvent>) => void;
  // shared
  items: ShoppingCartItem[];
  shoppingcartTitle: string;
}

export interface ShoppingCartItem {
  // HTML/CSS Shopping cart item
  additive?: string;
  edit?: boolean;
  readonly?: boolean;
  id?: string;
  // Core Shopping cart item
  variant?: ShoppingCartItemVariant;
  info?: string;
  editable?: boolean;
  removable?: boolean;
  // shared
  label: string;
  warning?: boolean;
  subitems?: ShoppingCartSubitem[];
  dsoEdit?: (event: CustomEvent<ShoppingCartItemEditEvent>) => void;
  dsoDelete?: (event: CustomEvent<ShoppingCartItemDeleteEvent>) => void;
  dsoClose?: (event: CustomEvent<ShoppingCartItemCloseEvent>) => void;
}

export interface ShoppingCartSubitem {
  label: string;
  warning?: boolean;
}
