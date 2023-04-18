export interface ScrollContainer<TemplateFnReturnType> {
  dsoScrollContainerEvent?: (e: CustomEvent<DsoScrollContainerEvent>) => void;
  children: TemplateFnReturnType;
}

export type DsoScrollContainerEvent = {
  scrollEnd: "top" | "bottom" | false;
  element: HTMLDivElement;
};
