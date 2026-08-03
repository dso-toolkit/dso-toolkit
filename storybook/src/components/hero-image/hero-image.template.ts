import { html } from "lit-html";

import { highlightBoxTemplate } from "../highlight-box/highlight-box.template.js";
import { linkTemplate } from "../link/link.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { HeroImage } from "./hero-image.models.js";

export function heroImageTemplate({ image }: HeroImage) {
  return html`
    <dso-hero-image>
      <div slot="image" style=${`background-image: url(${image})`}></div>
      ${highlightBoxTemplate({
        white: true,
        content: richContentTemplate({
          children: html`
            <h1>Vergunningcheck</h1>
            <p>
              De Bouwregelgeving is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet zijn
              ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee bruikbaar is in
              de ontwerp- en toetsingsfase van ieder bouwwerk.
            </p>
            <p>${linkTemplate({ label: "Doe de Vergunningcheck", url: "#", modifier: "dso-primary" })}</p>
          `,
        }),
      })}
    </dso-hero-image>
  `;
}
