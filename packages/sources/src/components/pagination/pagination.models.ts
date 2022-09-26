export interface PaginationSelectPageEvent {
  /** The selected page */
  page: number;
  /** The original pointer event */
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export interface Pagination {
  totalPages: number;
  currentPage: number;
  formatHref: (page: number) => string;
  dsoSelectPage: (e: CustomEvent<PaginationSelectPageEvent>) => void;
}
