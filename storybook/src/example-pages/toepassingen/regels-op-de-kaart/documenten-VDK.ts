import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import { header, cardList } from "./documenten-VRK.content";

examplePageFactory(
  "Toepassingen/Regels op de kaart",
  "Documenten VDK",
  (
    { viewerGridTemplate, buttonTemplate, contextTemplate, mapControlsTemplate, accordionTemplate, cardListTemplate },
    templates,
  ) => html`
    ${headerPartial(templates, header)}
    <main>
      ${viewerGridTemplate({
        mode: "vdk",
        filterpanelOpen: false,
        mainSize: "medium",
        main: html`
          ${buttonTemplate({
            label: "Opnieuw zoeken",
            type: "button",
            variant: "tertiary",
            icon: { icon: "chevron-left" },
          })}
          <section class="dso-filterblok">
            <div class="dso-highlight-box">
              ${contextTemplate({
                type: "label",
                label: html`<h2>Laan van Westenenk 701, 7334 DP Apeldoorn</h2>`,
                content: html``,
                children: html``,
              })}
            </div>
          </section>
          ${buttonTemplate({
            label: "Verberg documenten op gekozen locatie",
            type: "button",
            variant: "tertiary",
            icon: { icon: "chevron-up" },
          })}

          <h3>Gevonden: 51+ documenten</h3>
          <hr />
          <h1>Documenten</h1>
          <p>0 item(s) geselecteerd</p>
          ${accordionTemplate({
            variant: "compact",
            sections: [
              {
                handleTitle: "Gemeente(6)",
                heading: "h2",
                open: true,
                content: html` ${cardListTemplate(cardList)} `,
              },
              {
                handleTitle: "Provincie (12)",
                heading: "h2",
                content: html` ${cardListTemplate(cardList)} `,
              },
              {
                handleTitle: "Waterschap (4)",
                heading: "h2",
                content: html` ${cardListTemplate(cardList)} `,
              },
              {
                handleTitle: "Het Rijk (27+)",
                heading: "h2",
                content: html` ${cardListTemplate(cardList)} `,
              },
            ],
          })}
        `,
        map: html`
          <img src="images/kaart.png" aria-hidden="true" />
          ${mapControlsTemplate({ baseLayers: [], open: false, overlays: [] })}
        `,
      })}
    </main>
  `,
);
