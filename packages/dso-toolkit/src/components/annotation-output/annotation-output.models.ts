export interface AnnotationOutput<TemplateFnReturnType> {
  identifier: string;
  title: TemplateFnReturnType;
  addons?: TemplateFnReturnType;
  content: TemplateFnReturnType;
  prefix?: string;
  dsoToggleAnnotation?: (e: CustomEvent<AnnotationToggleEvent>) => void;
}

export interface AnnotationToggleEvent {
  originalEvent?: MouseEvent;
  open: boolean;
}
