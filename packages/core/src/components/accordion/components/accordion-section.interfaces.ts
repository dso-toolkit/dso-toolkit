export type AccordionSectionState = "success" | "info" | "warning" | "danger";

export type AccordionHeading = "h2" | "h3" | "h4" | "h5";

export const stateMap: Record<AccordionSectionState, string> = {
  success: "succes:",
  info: "info:",
  warning: "waarschuwing:",
  danger: "fout:",
};
