import { html } from "lit-html";

import { Templates } from "../../templates";
import { defaultSymbol } from "../legend-item/legend-item.content";

export function richContent({
  contextTemplate,
  iconButtonTemplate,
  legendItemTemplate,
  richContentTemplate,
}: Templates) {
  return richContentTemplate({
    children: html`
      <h3>Legenda</h3>
      ${legendItemTemplate({
        content: html` Legenda item label `,
        activatable: true,
        symbol: defaultSymbol,
      })}
      <hr />
      ${contextTemplate({
        type: "label",
        label: html`<h3>Geselecteerde kenmerken</h3>`,
        content: html` ${iconButtonTemplate({
          variant: "tertiary",
          label: "openen",
          icon: "more",
        })}`,
        children: html``,
      })}
    `,
  });
}
