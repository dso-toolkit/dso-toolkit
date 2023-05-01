export interface ExpandableHeading<TemplateFnReturnType> {
  heading?: "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "default" | "black";
  editAction?: EditAction;
  title: TemplateFnReturnType;
  addonsStart?: TemplateFnReturnType;
  addonsEnd?: TemplateFnReturnType;
  content: TemplateFnReturnType;
  dsoToggle?: (e: CustomEvent<ExpandableHeadingToggleEvent>) => void;
}

export interface ExpandableHeadingTemplates<TemplateFnReturnType> {
  title: TemplateFnReturnType;
  addonsStart?: TemplateFnReturnType;
  addonsEnd?: TemplateFnReturnType;
  content: TemplateFnReturnType;
}

export interface ExpandableHeadingToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}

export type EditAction = "delete" | "insert";
