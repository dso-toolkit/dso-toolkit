import { TemplateResult } from "lit-html";

import { Button } from "../button/button.models.js";
import { Form } from "../form/form.models.js";
import { IconButton } from "../icon-button/icon-button.models.js";

type ShoppingCartMode = "side" | "main";

type ShoppingCartItemMode = "view" | "edit";

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
  // Core Shopping cart
  mode?: ShoppingCartMode;
  button?: Button | IconButton;
  warning?: TemplateResult | string;
  // shared
  items: ShoppingCartItem[];
  title: string;
  titleTag?: string;
}

export interface ShoppingCartItem {
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
  form?: Form;
  warningText?: string;
  // shared
  label: string;
  warning?: boolean;
  subitems?: ShoppingCartItem[];
  dsoEdit?: (event: CustomEvent<ShoppingCartItemEditEvent>) => void;
  dsoDelete?: (event: CustomEvent<ShoppingCartItemDeleteEvent>) => void;
  dsoClose?: (event: CustomEvent<ShoppingCartItemCloseEvent>) => void;
}
