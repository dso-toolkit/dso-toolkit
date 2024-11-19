import { Label, ListButton, Selectable, ShoppingCart } from "dso-toolkit";
import { TemplateResult } from "lit-html";

export const shoppingCart: ShoppingCart = {
  shoppingcartTitle: "Mijn activiteiten",
  shoppingcartTitleTag: "h3",
  collapsable: true,
  collapsed: true,
  removeAll: true,
  items: [
    {
      label:
        "Andere activiteiten dan kabels en leidingen in het beperkingengebied van een Rijksweg - Aanvraag vergunning",
      id: "shoppingCart-item-1",
      additive: "1",
    },
  ],
};

export const bestuurslaag: Selectable<TemplateResult>[] = [
  {
    id: "checkbox_1",
    type: "checkbox",
    label: "Rijk (18)",
    value: "1",
  },
  {
    id: "checkbox_2",
    type: "checkbox",
    label: "Gemeente (4)",
    value: "2",
  },
];

export const toestemming: Selectable<TemplateResult>[] = [
  {
    id: "checkbox_3",
    type: "checkbox",
    label: "Aanvraag vergunning (11)",
    value: "1",
  },
  {
    id: "checkbox_4",
    type: "checkbox",
    label: "Aanvraag maatwerkvoorschrift (3)",
    value: "2",
  },
  {
    id: "checkbox_5",
    type: "checkbox",
    label: "Melding (7)",
    value: "3",
  },
  {
    id: "checkbox_6",
    type: "checkbox",
    label: "Informatie (1)",
    value: "4",
  },
];

export const labels: Label[] = [
  {
    label: "Gemeente",
    removable: true,
  },
  {
    label: "Waterschap",
    removable: true,
  },
  {
    label: "Provincie",
    removable: true,
  },
  {
    label: "Rijksoverheid",
    removable: true,
  },
  {
    label: "Aanvraag vergunning",
    removable: true,
  },
  {
    label: "Melding",
    removable: true,
  },
  {
    label: "Informatie",
    removable: true,
  },
  {
    label: "Informatie ongewoon voorval",
    removable: true,
  },
  {
    label: "Aanvraag maatwerkvoorschrift",
    removable: true,
  },
  {
    label: "Melding gelijkwaardige maatregel",
    removable: true,
  },
  {
    label: "Aanvraag toestemming gelijkwaardige maatregel",
    removable: true,
  },
];

export const listButtons: ListButton[] = [
  {
    label:
      "Andere activiteiten dan kabels en leidingen in het beperkingengebied van een Rijksweg - Aanvraag vergunning",
    sublabel: "Rijk",
    count: 1,
  },
  {
    label: "Bouwen dakkapel - Aanvraag vergunning",
    sublabel: "Gemeente",
    count: 0,
  },
  {
    label: "In stand houden van bouwwerken - Melding",
    sublabel: "Gemeente",
    count: 0,
    hasInputNumber: true,
    max: 99,
    min: 0,
    minusButtonInactive: true,
    plusButtonInactive: false,
  },
  {
    label: "Milieubelastende activiteit - Aanvraag vergunning",
    sublabel: "Gemeente",
    count: 0,
  },
  {
    label:
      "Opslaan van vloeistoffen in opslagtanks of in tankcontainers of verpakkingen gebruikt als opslagtank  - Aanvraag vergunning",
    sublabel: "Rijk",
    count: 0,
  },
];
