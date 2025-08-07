export interface LegendItem<TemplateFnReturnType> {
  options?: TemplateFnReturnType;
  content: TemplateFnReturnType | string;
  disabled?: boolean;
  disabledMessage?: string;
  dsoMouseEnter?: (e: CustomEvent<MouseEvent>) => void;
  dsoMouseLeave?: (e: CustomEvent<MouseEvent>) => void;
  dsoActiveChange?: (e: CustomEvent<LegendItemActiveChangeEvent>) => void;
  active?: boolean;
  activatable?: boolean;
  symbol?: TemplateFnReturnType;
}

export interface LegendItemActiveChangeEvent {
  /**
   * De huidige status van de legend.
   */
  current: boolean;

  /**
   * De gewenste status van de legend.
   */
  next: boolean;

  originalEvent: Event;
}
