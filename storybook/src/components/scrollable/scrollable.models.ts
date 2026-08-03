export interface Scrollable<TemplateFnReturnType> {
  dsoScrollEnd?: (e: CustomEvent<DsoScrollEndEvent>) => void;
  children: TemplateFnReturnType;
}

export interface DsoScrollEndEvent {
  scrollEnd: "top" | "bottom";
}
