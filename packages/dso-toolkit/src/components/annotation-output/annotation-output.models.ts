export interface AnnotationOutput<TemplateFnReturnType> {
  identifier: string;
  open?: boolean;
  slotName?: string;
  title: TemplateFnReturnType;
  addons?: TemplateFnReturnType;
  content: TemplateFnReturnType;
  prefix?: string;
  dsoClose?: (e: CustomEvent<AnnotationOutputCloseEvent>) => void;
}

export interface AnnotationOutputCloseEvent {
  originalEvent?: Event;
}
