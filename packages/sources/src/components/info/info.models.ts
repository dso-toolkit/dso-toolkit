export interface Info<TemplateFnReturnType> {
  id?: string;
  fixed?: boolean;
  active?: boolean;
  content: TemplateFnReturnType | string;
  dsoClose?: (e: CustomEvent<MouseEvent>) => void;
}
