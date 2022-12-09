import { AccordionSection } from "dso-toolkit";
import { TemplateResult } from "lit-html";

export const accordionSections1: AccordionSection<TemplateResult>[] = [
  {
    handleTitle: "U heeft een vergunning nodig voor 1 activiteit.",
    heading: "h4",
    icon: "document",
  },
  {
    handleTitle: "U heeft een vergunning nodig voor 1 activiteit.",
    heading: "h4",
    icon: "call",
  },
  {
    handleTitle: "U heeft een vergunning nodig voor 1 activiteit.",
    heading: "h4",
    icon: "check-circle",
  },
];

export const accordionSections2: AccordionSection<TemplateResult>[] = [
  {
    handleTitle: "Het is verboden deze werkzaamheid uit te voeren.",
    heading: "h4",
    icon: "forbidden",
  },
];
