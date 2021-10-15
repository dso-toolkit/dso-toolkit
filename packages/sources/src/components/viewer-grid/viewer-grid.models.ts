export interface ViewerGrid<TemplateFnReturnType> {
  main: TemplateFnReturnType;
  map: TemplateFnReturnType;
  aside: TemplateFnReturnType;
  panelSize: 'small' | 'medium' | 'large';
  panelOpen: boolean;
  shrink: (e: MouseEvent) => void;
  expand: (e: MouseEvent) => void;
  closeAside: (e: MouseEvent) => void;
}

export interface ViewerGridDemoProperties {
  panelSize: 'small' | 'medium' | 'large';
  panelOpen: boolean;
  shrink: (e: MouseEvent) => void;
  expand: (e: MouseEvent) => void;
  closeAside: (e: MouseEvent) => void;
}
