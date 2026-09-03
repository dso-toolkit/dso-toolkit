export interface Panel<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  emphasized?: boolean;
  heading: TemplateFnReturnType;
  dsoCloseClick?: (e: CustomEvent<PanelCloseEvent>) => void;
}

export interface PanelCloseEvent {
  originalEvent: Event;
}
