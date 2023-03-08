import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import { header, cardList } from "./documenten-VRK.content";

examplePageFactory(
  "Toepassingen/Viewer",
  "Documenten VRK",
  (
    {
      viewerGridTemplate,
      buttonTemplate,
      contextTemplate,
      labelGroupTemplate,
      toggletipTemplate,
      mapControlsTemplate,
      accordionTemplate,
      cardListTemplate,
    },
    templates
  ) => html`
    ${headerPartial(templates, header)}
    <main>
      ${viewerGridTemplate({
        filterpanelOpen: "false",
        initialMainSize: "medium",
        main: html`
          ${buttonTemplate({
            label: "Terug",
            type: "button",
            variant: "tertiary",
            icon: { icon: "chevron-left" },
          })}
          <section class="dso-filterblok">
            <div class="dso-highlight-box">
              ${contextTemplate({
                type: "label",
                label: html`<h3>Uw keuzes</h3>`,
                content: buttonTemplate({
                  variant: "tertiary",
                  label: "Alle opties",
                  icon: {
                    icon: "pencil",
                  },
                }),
                children: html`
                  <p class="dso-filterblok-address">
                    Domplein1, 3512JC Utrecht
                    ${toggletipTemplate({
                      childeren: html` <p>Test</p> `,
                    })}
                  </p>
                  ${labelGroupTemplate({
                    labels: [
                      {
                        label: "Regels",
                        status: "bright",
                        removable: "true",
                      },
                    ],
                  })}
                `,
              })}
            </div>
          </section>
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
          ${mapControlsTemplate({})}
        `,
      })}
    </main>
  `
);
