import { Description } from "./description.models.js";

export function termContent(): Description {
  return {
    id: "w3c",
    term: "W3C",
    content: "World Wide Web Consortium",
    open: false,
  };
}

export function descriptionExample(openTerm: boolean): (string | Description)[] {
  return [
    "Om interpretatieproblemen te voorkomen heeft het",
    { ...termContent(), open: openTerm },
    "aanbevelingen opgesteld over welke tags geldig zijn en hoe ze moeten worden geïnterpreteerd. De oorspronkelijke aanbeveling is een aantal malen geactualiseerd in verband met verdere ontwikkeling van HTML.",
  ] as const;
}
