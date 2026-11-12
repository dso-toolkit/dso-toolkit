export interface InfoCloseEvent {
  originalEvent: MouseEvent;
  /**
   * The element that had focus when the Info was activated. Can be used to return focus to (for instance) the Info
   * Button that opened the Info.
   */
  previousActiveElement?: HTMLElement;
}
