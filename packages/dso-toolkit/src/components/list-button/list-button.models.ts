export interface ListButton {
  label: string;
  disabled?: boolean;
  sublabel?: string;
  subcontent?: string;
  subcontentPrefix?: string;
  count?: number;
  min?: number;
  max?: number;
  checked?: boolean;
  manual?: boolean;
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
