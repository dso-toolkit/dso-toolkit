export interface Overlay {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  info?: string;
}

export interface OverlayChangeEvent {
  overlay: Overlay;
  checked: boolean;
}
