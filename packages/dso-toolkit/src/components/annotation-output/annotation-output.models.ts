export interface AnnotationOutput<TemplateFnReturnType> {
  identifier: string;
  slotName?: string;
  title: TemplateFnReturnType;
  addons?: TemplateFnReturnType;
  content: TemplateFnReturnType;
  prefix?: string;
  dsoToggle?: (e: CustomEvent<AnnotationToggleEvent>) => void;
}

export interface AnnotationToggleEvent {
  originalEvent?: Event;
  open: boolean;
}
