export interface OzonContent {
  content: string;
  inline?: boolean;
  prefix?: string;
  suffix?: string;
  interactive?: boolean;
  deleted?: boolean;
  onAnchorClick: (e: unknown) => void;
  onClick: (e: unknown) => void;
}
