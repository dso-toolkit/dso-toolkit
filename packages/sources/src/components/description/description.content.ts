import { v4 as uuidv4 } from 'uuid';

import { Description } from './description.models';

export const termContent: Description = {
  type: 'term',
  id: uuidv4(),
  term: 'W3C',
  content: 'World Wide Web Consortium',
  open: false
};

export const noteContent: Description = {
  type: 'note',
  id: uuidv4(),
  term: '<sup>1</sup>',
  content: 'Adviescollege Stikstofproblematiek, <em>"Niet alles kan"</em>. Amersfoort, 2019',
  open: true
};

export function descriptionExample(openTerm: boolean, openNote: boolean) {
  return [
    'Om interpretatieproblemen te voorkomen heeft het',
    { ...termContent, open: openTerm },
    'aanbevelingen opgesteld over welke tags geldig zijn en hoe ze moeten worden geïnterpreteerd. De oorspronkelijke aanbeveling is een aantal malen geactualiseerd in verband met verdere ontwikkeling van HTML. Zo adviseert het Adviescollege Stikstofproblematiek',
    { ...noteContent, open: openNote },
    'bij het vinden van oplossingen uit te gaan van de grote transities om te zorgen voor meer integrale afweging.'
  ] as const;
}
