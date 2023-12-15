import { Card } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const cards: Card<TemplateResult>[] = [
  {
    href: "#",
    label: "Begrippen uit de Omgevingswet",
    content: html`<p>Begrippen en definities die binnen de Omgevingswet worden gebruikt.</p>`,
  },
  {
    href: "#",
    label: "Activiteiten",
    content: html`<p>Alle juridische activiteiten binnen de Omgevingswet.</p>`,
  },
  {
    href: "#",
    label: "Werkzaamheden",
    content: html`<p>Werkzaamheden vertalen juridische activiteiten naar begrijpelijke taal.</p>`,
  },
  {
    href: "#",
    label: "Waardelijsten",
    content: html`<p>Waardelijsten en alle waarden binnen de lijsten.</p>`,
  },
  {
    href: "#",
    label: "Bronnen",
    content: html`<p>Bronnen van water.</p>`,
  },
  {
    href: "#",
    label: "Informatieproducten",
    content: html`<p>Producten met juiste en feitelijke omgevingsinformatie.</p>`,
  },
];
