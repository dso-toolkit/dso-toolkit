export interface LegendItem<TemplateFnReturnType> {
  body?: TemplateFnReturnType;
  content: TemplateFnReturnType | string;
  disabled?: boolean;
  disabledMessage?: string;
  dsoMouseEnter?: () => void;
  dsoMouseLeave?: () => void;
  dsoRemoveClick?: (e: CustomEvent<LegendItemRemoveClickEvent>) => void;
  removable?: boolean;
  symbol?: TemplateFnReturnType;
}

export interface LegendItemRemoveClickEvent {
  originalEvent: MouseEvent;
}
