export interface OzonContent<TemplateFnReturnType> {
  content: string;
  inline?: boolean;
  prefix?: TemplateFnReturnType | string;
  suffix?: TemplateFnReturnType | string;
  interactive?: "sub" | boolean;
  deleted?: boolean;
  dsoAnchorClick: (e: CustomEvent) => void;
  dsoClick: (e: CustomEvent) => void;
}
