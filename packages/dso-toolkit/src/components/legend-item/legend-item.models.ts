export interface LegendItem<TemplateFnReturnType> {
  body?: TemplateFnReturnType;
  content: TemplateFnReturnType | string;
  disabled?: boolean;
  disabledMessage?: string;
  dsoMouseEnter?: () => void;
  dsoMouseLeave?: () => void;
  dsoActiveChange?: (e: CustomEvent<LegendItemActiveChangeEvent>) => void;
  active?: boolean;
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
