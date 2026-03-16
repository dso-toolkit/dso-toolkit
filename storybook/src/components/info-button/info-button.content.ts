import { html } from "lit-html";

import { Templates } from "../../templates";

export function children({ linkTemplate, richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      <h2>Introductie DSO</h2>
      <p>
        Het
        ${linkTemplate({
          label: "Digitaal Stelsel Omgevingswet (DSO)",
          url: "https://iplo.nl/digitaal-stelsel/",
        })}
        ondersteunt de uitvoering van de Omgevingswet. Het bestaat uit lokale systemen van overheden en de onderdelen
        van de landelijke voorziening (DSO-LV), zoals het Omgevingsloket.
      </p>
    `,
  });
}
