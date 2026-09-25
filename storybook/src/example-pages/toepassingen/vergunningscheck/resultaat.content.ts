import { AccordionSection } from "../../../components/accordion/accordion.models.js";

export function accordionSections1(): AccordionSection[] {
  return [
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
}

export function accordionSections2(): AccordionSection[] {
  return [
    {
      handleTitle: "Het is verboden deze werkzaamheid uit te voeren.",
      heading: "h4",
      icon: "forbidden",
    },
  ];
}
