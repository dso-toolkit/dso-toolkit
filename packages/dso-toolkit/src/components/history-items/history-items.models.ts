export interface HistoryItems {
  label: string;
  historyItems: HistoryItem[];
}

export type HistoryItemType = "in-werking" | "besluit" | "tijdelijk-regelingdeel" | "waarschuwing" | "ontwerp";

export interface HistoryItem {
  date: string;
  explanation?: string;
  statusMessage: string;
  title?: string;
  href?: string;
  type: HistoryItemType;
  warning?: string;
  dsoHistoryItemClick?: (e: CustomEvent<HistoryItemClickEvent>) => void;
}

export interface HistoryItemClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
