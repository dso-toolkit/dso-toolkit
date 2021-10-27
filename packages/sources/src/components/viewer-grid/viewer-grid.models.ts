export interface ViewerGrid<TemplateFnReturnType> {
  main: TemplateFnReturnType;
  map: TemplateFnReturnType;
  overlay: TemplateFnReturnType;
  panelSize: 'small' | 'medium' | 'large';
  panelOpen: boolean;
  shrink: (e: MouseEvent) => void;
  expand: (e: MouseEvent) => void;
  closeOverlay: (e: MouseEvent) => void;
}

export interface ViewerGridDemoProperties {
  panelSize: 'small' | 'medium' | 'large';
  panelOpen: boolean;
  shrink: (e: MouseEvent) => void;
  expand: (e: MouseEvent) => void;
  closeOverlay: (e: MouseEvent) => void;
}
