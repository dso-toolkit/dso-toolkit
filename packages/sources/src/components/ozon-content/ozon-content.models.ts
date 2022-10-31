export interface OzonContent {
  content: string;
  inline?: boolean;
  prefix?: string;
  suffix?: string;
  interactive?: "sub" | boolean;
  deleted?: boolean;
  dsoAnchorClick: (e: CustomEvent) => void;
  dsoClick: (e: CustomEvent) => void;
}
