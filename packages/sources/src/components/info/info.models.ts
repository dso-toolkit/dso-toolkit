export interface Info<TemplateFnReturnType> {
  fixed?: boolean;
  active?: boolean;
  richContent: TemplateFnReturnType;
  onClose: (e: MouseEvent) => void;
}
