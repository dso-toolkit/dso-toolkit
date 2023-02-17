import { html } from "lit-html";

import { Templates } from "../../templates";

export function annotationContent({ richContentTemplate, selectableTemplate }: Templates) {
  return {
    title: html`<h2 slot="title">Annotaties</h2>`,
    addons: selectableTemplate({
      type: "checkbox",
      id: "123",
      label: "Toon uitgebreide weergave",
      slot: "addons",
      value: "",
    }),
    content: html`
      ${richContentTemplate({
        children: html`
          <h3>Locaties</h3>
          <span>Voorbeeld annotatie </span>
        `,
      })}
    `,
  };
}
