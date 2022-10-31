export interface Info<TemplateFnReturnType> {
  id?: string;
  fixed?: boolean;
  active?: boolean;
  richContent: TemplateFnReturnType | string;
  dsoClose?: (e: MouseEvent) => void;
}
