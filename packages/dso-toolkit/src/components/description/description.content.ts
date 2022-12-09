import { v4 as uuidv4 } from "uuid";

import { Description } from "./description.models.js";

export const termContent: Description = {
  id: uuidv4(),
  term: "W3C",
  content: "World Wide Web Consortium",
  open: false,
};

export function descriptionExample(openTerm: boolean) {
  return [
    "Om interpretatieproblemen te voorkomen heeft het",
    { ...termContent, open: openTerm },
    "aanbevelingen opgesteld over welke tags geldig zijn en hoe ze moeten worden geïnterpreteerd. De oorspronkelijke aanbeveling is een aantal malen geactualiseerd in verband met verdere ontwikkeling van HTML.",
  ] as const;
}
