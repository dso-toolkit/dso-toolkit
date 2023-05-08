export interface ExpandableInterface {
  getAnimeInstance(): Promise<anime.AnimeInstance | undefined>;
  getBodyHeight(): Promise<number | undefined>;
}

export interface ExpandableToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}

export function isExpandable(element: HTMLElement | ExpandableInterface | null): element is ExpandableInterface {
  return element instanceof HTMLElement && "getAnimeInstance" in element;
}
