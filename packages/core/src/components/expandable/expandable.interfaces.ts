export interface ExpandableInterface {
  getAnimeInstance(): Promise<anime.AnimeInstance | undefined>;
}

export interface ExpandableToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
