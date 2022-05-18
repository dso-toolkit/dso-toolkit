export interface OzonContent {
  content: string;
  inline?: boolean;
  deleted?: boolean;
  onAnchorClick: (e: unknown) => void
}
