export interface Overlay {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface OverlayChangeEvent {
  overlay: Overlay;
  checked: boolean;
}
