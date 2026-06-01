export type IconButtonVariant = "secondary" | "tertiary" | "map";

export interface IconButtonClickEvent {
  originalEvent: MouseEvent;
  toggled: boolean;
}
