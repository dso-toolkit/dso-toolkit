import { html } from "lit-html";

import { Templates } from "../../templates";

export function richContent({ linkTemplate, richContentTemplate, buttonRowTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      <h2>Heading 2</h2>

      <p>
        De ${linkTemplate({ label: "Bouwregelgeving", url: "#" })} is een database met alle
        <strong>bouwregelgeving</strong> in Nederland, die op zodanige wijze moet zijn ingericht en ontsloten dat die
        voldoet aan
        ${linkTemplate({
          label: "de eisen van de Omgevingswet (3B's)",
          url: "#",
          mode: "download",
        })},
        en daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
      </p>

      ${buttonRowTemplate({
        buttons: [
          { label: "Primaire button", variant: "primary", url: "#" },
          { label: "Secundaire button", variant: "secondary", url: "#" },
          {
            label: "Tertiare button",
            variant: "tertiary",
            url: "#",
            icon: { icon: "chevron-down" },
            iconMode: "after",
          },
        ],
      })}
    `,
  });
}
