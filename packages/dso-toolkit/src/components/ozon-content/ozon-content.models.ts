export interface OzonContent {
  content: string;
  inline?: boolean;
  mark?: OzonContentMarkFunction;
  dsoAnchorClick: (e: CustomEvent) => void;
  dsoOzonContentMarkItemHighlight: (e: CustomEvent) => void;
}

export type OzonContentMarkFunction = (text: string) => OzonContentText[] | undefined;

export type OzonContentText = OzonContentMarkItem | string;

export interface OzonContentMarkItem {
  text: string;
  highlight?: boolean;
}
