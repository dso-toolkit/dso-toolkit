export interface OzonContent {
  content: string;
  inline?: boolean;
  interactive?: boolean;
  deleted?: boolean;
  onAnchorClick: (e: unknown) => void;
  onClick: (e: unknown) => void;
}
