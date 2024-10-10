import { Card } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const cards: Card<TemplateResult>[] = [
  {
    href: "#",
    label: "Begrippen uit de Omgevingswet",
    content: html`<p>Begrippen en definities die binnen de Omgevingswet worden gebruikt.</p>`,
    dsoCardClick() {},
  },
  {
    href: "#",
    label: "Activiteiten",
    content: html`<p>Alle juridische activiteiten binnen de Omgevingswet.</p>`,
    dsoCardClick() {},
  },
  {
    href: "#",
    label: "Werkzaamheden",
    content: html`<p>Werkzaamheden vertalen juridische activiteiten naar begrijpelijke taal.</p>`,
    dsoCardClick() {},
  },
  {
    href: "#",
    label: "Waardelijsten",
    content: html`<p>Waardelijsten en alle waarden binnen de lijsten.</p>`,
    dsoCardClick() {},
  },
  {
    href: "#",
    label: "Bronnen",
    content: html`<p>Bronnen van water.</p>`,
    dsoCardClick() {},
  },
  {
    href: "#",
    label: "Informatieproducten",
    content: html`<p>Producten met juiste en feitelijke omgevingsinformatie.</p>`,
    dsoCardClick() {},
  },
];
