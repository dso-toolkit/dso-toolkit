export interface Info<TemplateFnReturnType> {
  id?: string;
  fixed?: boolean;
  active?: boolean;
  richContent: TemplateFnReturnType | string;
  onClose: (e: MouseEvent) => void;
}
