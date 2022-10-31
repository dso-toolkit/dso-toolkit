export interface Banner<TemplateFnReturnType> {
  status: string;
  richContent: TemplateFnReturnType;
  onClick: (e: Event) => void;
}
