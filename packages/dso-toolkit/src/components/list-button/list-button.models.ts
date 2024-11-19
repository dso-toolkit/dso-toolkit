export interface ListButton {
  label: string;
  hasInputNumber?: boolean; // Only HTML/CSS implementation
  disabled?: boolean; // Only Core implementation
  sublabel?: string;
  subcontent?: string;
  subcontentPrefix?: string; // Only Core implementation
  count?: number;
  min?: number;
  max?: number;
  minusButtonInactive?: boolean; // Only HTML/CSS implementation
  plusButtonInactive?: boolean; // Only HTML/CSS implementation
  checked?: boolean; // Only Core implementation
  manual?: boolean; // Only Core implementation
  dsoCountChange?: (e: CustomEvent<ListButtonChangeEvent>) => void;
  dsoSelectedChange?: (e: CustomEvent<ListButtonSelectedEvent>) => void;
}

export interface ListButtonChangeEvent {
  originalEvent?: Event;
  /** The value that was set */
  count: number;
}

export interface ListButtonSelectedEvent {
  originalEvent?: Event;
  checked: boolean;
}
