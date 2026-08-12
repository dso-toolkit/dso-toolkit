import { HeroImage } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreHeroImage: ComponentImplementation<HeroImage> = {
  component: "heroImage",
  implementation: "core",
  template: (templates) => {
    const { highlightBoxTemplate, linkTemplate, richContentTemplate } = templates;

    return function heroImageTemplate({ imageUrl }: HeroImage) {
      return html`
        <dso-hero-image image-url=${imageUrl}>
          ${highlightBoxTemplate({
            white: true,
            content: richContentTemplate({
              children: html`
                <h1>Vergunningcheck</h1>
                <p>
                  De Bouwregelgeving is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet
                  zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee
                  bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
                </p>
                <p>${linkTemplate({ label: "Doe de Vergunningcheck", url: "#", modifier: "dso-primary" })}</p>
              `,
            }),
          })}
        </dso-hero-image>
      `;
    };
  },
};
