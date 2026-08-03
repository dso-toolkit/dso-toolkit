import { TemplateResult, html } from "lit-html";

import type { CardContainer } from "../components/card-container/card-container.models.js";

export const cardContainer: CardContainer<TemplateResult> = {
  mode: "list",
  cards: [
    {
      href: "#",
      label: "Omgevingsplan industrieterrein Het Klooster",
      content: html`het Klooster is een industrieterrein in de Gemeente Nieuwegein.`,
      interactions: [
        {
          variant: "tertiary",
          icon: "info-outline",
          label: "Extra informatie",
        },
      ],
    },
    {
      href: "#",
      label: "Omgevingsplan Binckhorst",
      content: html`De Binckhorst was een groot industrieterrein met 3 binnenhavens langs het water van de Trekvliet. De
      gemeente Den Haag zet zich vanaf 2009 in om een deel van de bedrijven te vervangen door enkele duizenden woningen.`,
      interactions: [
        {
          variant: "tertiary",
          icon: "info-outline",
          label: "Extra informatie",
        },
      ],
    },
    {
      href: "#",
      label: "Flora en Fauna beslissing 2019",
      content: html`Besluit van de Minister van Landbouw, Natuur en Voedselkwaliteit van 22 februari 2019,
      DGNVLG/19045629, houdende vaststelling van een geactualiseerde Rode Lijst Dagvlinders.`,
      interactions: [
        {
          variant: "tertiary",
          icon: "info-outline",
          label: "Extra informatie",
        },
      ],
    },
    {
      href: "#",
      label: "Bestemmingsplan Zuiderpark",
      content: html`Zuiderpark is een stadspark, wijk en buurt in Den Haag. De wijk is onderdeel van stadsdeel Escamp.
      De wijk grenst aan de wijken Moerwijk, Morgenstond, Leyenburg en Rustenburg en Oostbroek.`,
      interactions: [
        {
          variant: "tertiary",
          icon: "info-outline",
          label: "Extra informatie",
        },
      ],
    },
  ],
};
