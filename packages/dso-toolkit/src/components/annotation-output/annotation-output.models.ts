export interface AnnotationOutput<TemplateFnReturnType> {
  identifier: string;
  title: TemplateFnReturnType;
  addons?: TemplateFnReturnType;
  content: TemplateFnReturnType;
  dsoToggleAnnotation?: (e: CustomEvent<AnnotationToggleEvent>) => void;
}

export interface AnnotationToggleEvent {
  originalEvent?: MouseEvent;
  open: boolean;
}
