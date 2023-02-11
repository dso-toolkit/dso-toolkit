export interface ExpandableHeading<TemplateFnReturnType> {
  heading?: "h2" | "h3" | "h4" | "h5" | "h6";
  title: TemplateFnReturnType;
  addonsStart?: TemplateFnReturnType;
  addonsEnd?: TemplateFnReturnType;
  content: TemplateFnReturnType;
}
