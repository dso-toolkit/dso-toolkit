export interface MarkBar {
  value?: string;
  label?: string;
  current: number;
  totalCount: number;
  dsoInput?: (e: MarkBarInputEvent) => void;
  dsoNext?: (e: MarkBarPaginationEvent) => void;
  dsoPrevious?: (e: MarkBarPaginationEvent) => void;
  dsoClear?: (e: MarkBarClearEvent) => void;
}

export interface MarkBarInputEvent {
  originalEvent: Event;
  value: string;
}

export interface MarkBarPaginationEvent {
  originalEvent: MouseEvent;
}

export interface MarkBarClearEvent {
  originalEvent: MouseEvent;
}
