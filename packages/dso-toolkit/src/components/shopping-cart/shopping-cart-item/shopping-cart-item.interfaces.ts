export type ShoppingCartItemMode = "view" | "edit";

export interface ShoppingCartItemEditEvent {
  originalEvent: MouseEvent;
}

export interface ShoppingCartItemDeleteEvent {
  originalEvent: MouseEvent;
}

export interface ShoppingCartItemCloseEvent {
  originalEvent: MouseEvent;
}
