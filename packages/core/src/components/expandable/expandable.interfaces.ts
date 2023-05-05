export interface ExpandableInterface {
  getAnimeInstance(): Promise<anime.AnimeInstance | undefined>;
  getBodyHeight(): Promise<number | undefined>;
}

export interface ExpandableToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
