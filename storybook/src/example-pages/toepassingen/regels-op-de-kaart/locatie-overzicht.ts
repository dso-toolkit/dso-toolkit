import { html } from "lit-html";
import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import { header } from "./locatie-overzicht.content";

examplePageFactory(
  "Toepassingen/Regels op de kaart",
  "Locatie overzicht",
  (
    {
      viewerGridTemplate,
      buttonTemplate,
      contextTemplate,
      labelGroupTemplate,
      highlightBoxTemplate,
      richContentTemplate,
      toggletipTemplate,
      searchBarTemplate,
      mapControlsTemplate,
      tileTemplate,
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
                    Achterwillenseweg 9a, Gouda
                    ${toggletipTemplate({
                      children: html` <p>Test</p> `,
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
          <h1>Overzicht op uw locatie</h1>
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: richContentTemplate({
              children: html`
                <h3>
                  Documenten met regels
                  ${toggletipTemplate({
                    children: html` <p>Test</p> `,
                  })}
                </h3>
                <p>Er zijn 51+ documenten gevonden met regels die gelden op uw locatie.</p>
                <div class="dso-context-wrapper">
                  <div class="dso-context-container">
                    <div class="dso-context-select">
                      ${buttonTemplate({
                        label: "Bekijk documenten",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "chevron-right" },
                      })}
                    </div>
                  </div>
                </div>
              `,
            }),
          })}
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: richContentTemplate({
              children: html`
                <h3>
                  Activiteiten
                  ${toggletipTemplate({
                    children: html` <p>Test</p> `,
                  })}
                </h3>
                <p>Als u iets wil bouwen of aanpassen kunt u de regels zoeken voor deze activiteit.</p>
                ${searchBarTemplate({
                  label: "Wat wilt u doen?",
                  placeholder: "Juridische activiteit",
                  buttonLabel: "Zoeken",
                  icon: true,
                  hideSearchButton: true,
                })}
                <div class="dso-context-wrapper">
                  <div class="dso-context-container">
                    <div class="dso-context-select">
                      ${buttonTemplate({
                        label: "Bekijk alle activiteiten",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "chevron-right" },
                      })}
                    </div>
                  </div>
                </div>
              `,
            }),
          })}
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: richContentTemplate({
              children: html`
                <h3>
                  Gebieden met regels
                  ${toggletipTemplate({
                    children: html` <p>Test</p> `,
                  })}
                </h3>
                <p>Gebieden op deze locatie waar aparte regels gelden.</p>
                <div class="dso-context-wrapper">
                  <div class="dso-context-container">
                    <div class="dso-context-select">
                      ${buttonTemplate({
                        label: "Bekijk alle gebieden",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "chevron-right" },
                      })}
                    </div>
                  </div>
                </div>
              `,
            }),
          })}
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: richContentTemplate({
              children: html`
                <h3>
                  Thema's
                  ${toggletipTemplate({
                    children: html` <p>Test</p> `,
                  })}
                </h3>
                <p>Gebieden op deze locatie waar aparte regels gelden.</p>
                <dso-responsive-element class="dso-tile-grid">
                  ${tileTemplate({ anchor: "#", image: "#", label: "boom kappen", variant: "theme" })}
                  ${tileTemplate({ anchor: "#", image: "#", label: "boom kappen", variant: "theme" })}
                  ${tileTemplate({ anchor: "#", image: "#", label: "boom kappen", variant: "theme" })}
                  ${tileTemplate({ anchor: "#", image: "#", label: "boom kappen", variant: "theme" })}
                </dso-responsive-element>
                <div class="dso-context-wrapper">
                  <div class="dso-context-container">
                    <div class="dso-context-select">
                      ${buttonTemplate({
                        label: "Bekijk alle thema's",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "chevron-right" },
                      })}
                    </div>
                  </div>
                </div>
              `,
            }),
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
