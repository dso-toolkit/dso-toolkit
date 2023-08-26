export interface OzonContent {
  content: string;
  inline?: boolean;
  dsoAnchorClick: (e: CustomEvent) => void;
}
