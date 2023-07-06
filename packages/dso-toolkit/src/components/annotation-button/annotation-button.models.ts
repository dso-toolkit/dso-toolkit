export interface AnnotationButton {
  identifier: string;
  open?: boolean;
  dsoClick?: (e: CustomEvent<AnnotationButtonClick>) => void;
}

export interface AnnotationButtonClick {
  originalEvent: MouseEvent;
}
