import { Form } from "../form/form.models.js";

type ShoppingCartMode = "side" | "main";

type ShoppingCartItemMode = "view" | "edit";

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

export interface ShoppingCart<TemplateFnReturnType> {
  // HTML/CSS Shopping cart
  collapsable?: boolean;
  collapsed?: boolean;
  hideSummary?: boolean;
  removeAll?: boolean;
  isOpen?: boolean;
  // Core Shopping cart
  mode?: ShoppingCartMode;
  toggleable?: boolean;
  dsoToggle?: (event: CustomEvent<ShoppingCartToggleEvent>) => void;
  // shared
  items: ShoppingCartItem<TemplateFnReturnType>[];
  title: string;
  titleTag?: string;
}

export interface ShoppingCartItem<TemplateFnReturnType> {
  // HTML/CSS Shopping cart item
  additive?: string;
  edit?: boolean;
  readonly?: boolean;
  id?: string;
  // Core Shopping cart item
  mode?: ShoppingCartItemMode;
  info?: string;
  editable?: boolean;
  removable?: boolean;
  form?: Form<TemplateFnReturnType>;
  // shared
  label: string;
  warning?: boolean;
  subitems?: ShoppingCartItem<TemplateFnReturnType>[];
  dsoEdit?: (event: CustomEvent<ShoppingCartItemEditEvent>) => void;
  dsoDelete?: (event: CustomEvent<ShoppingCartItemDeleteEvent>) => void;
  dsoClose?: (event: CustomEvent<ShoppingCartItemCloseEvent>) => void;
}
