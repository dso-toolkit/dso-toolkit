export const HighlightBoxColor = {
  yellow: "yellow",
  white: "white",
  grey: "grey",
  green: "green",
} as const;

export type HighlightBoxColor = (typeof HighlightBoxColor)[keyof typeof HighlightBoxColor];

export interface HighlightBox<TemplateFnReturnType = string> {
  color: HighlightBoxColor;
  dropShadow?: boolean;
  border?: boolean;
  step?: number;
  icon?: string;
  content: TemplateFnReturnType | string;
  bannerImage?: boolean;
}
