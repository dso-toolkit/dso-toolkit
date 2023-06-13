export interface Scrollable<TemplateFnReturnType> {
  dsoScrollEnd?: (e: CustomEvent<DsoScrollEnd>) => void;
  children: TemplateFnReturnType;
}

export type DsoScrollEnd = {
  scrollEnd: "top" | "bottom" | false;
};
