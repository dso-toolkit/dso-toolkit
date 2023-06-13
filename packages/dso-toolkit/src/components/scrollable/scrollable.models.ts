export interface Scrollable<TemplateFnReturnType> {
  dsoScrollableEvent?: (e: CustomEvent<DsoScrollableEvent>) => void;
  children: TemplateFnReturnType;
}

export type DsoScrollableEvent = {
  scrollEnd: "top" | "bottom" | false;
};
