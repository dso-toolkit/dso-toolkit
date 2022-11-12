import { Card } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export const cards: Card<TemplateResult>[] = [
  {
    label: "Begrippen uit de Omgevingswet",
    content: html`<p>Begrippen en definities die binnen de Omgevingswet worden gebruikt.</p>`,
  },
  {
    label: "Activiteiten",
    content: html`<p>Alle juridische activiteiten binnen de Omgevingswet.</p>`,
  },
  {
    label: "Werkzaamheden",
    content: html`<p>Werkzaamheden vertalen juridische activiteiten naar begrijpelijke taal.</p>`,
  },
  {
    label: "Waardelijsten",
    content: html`<p>Waardelijsten en alle waarden binnen de lijsten.</p>`,
  },
  {
    label: "Bronnen",
    content: html`<p>Bronnen van water.</p>`,
  },
  {
    label: "Informatieproducten",
    content: html`<p>Producten met juiste en feitelijke omgevingsinformatie.</p>`,
  },
];
