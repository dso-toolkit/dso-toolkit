import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory(
  "patronen",
  "Card Panel",
  ({
    anchorTemplate,
    buttonTemplate,
    highlightBoxTemplate,
    imageTemplate,
    labelTemplate,
    richContentTemplate,
    searchBarTemplate,
    tileGridTemplate,
    toggletipTemplate,
    viewerGridTemplate,
  }) => html`
    <div class="container">
      ${viewerGridTemplate({
        initialMainSize: "large",
        map: html``,
        main: html`
          <h1>Overzicht op uw locatie</h1>
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: html`
              ${richContentTemplate({
                children: html`
                  <h2>Activiteiten</h2>
                  <p>Als u wilt bouwen of aanpassen kunt u regels zoeken voor deze activiteit.</p>
                `,
              })}
              ${searchBarTemplate({
                buttonLabel: "Zoekopdracht legen",
                id: "PatronenCardPanelSearchBarID",
                label: "Label van de search-bar",
                placeholder: "Placeholder van de search-bar",
                hiddenLabel: true,
                icon: true,
                hideSearchButton: true,
              })}
              ${richContentTemplate({
                children: html`
                  <p>
                    Veel gebruikt: ${anchorTemplate({ label: "Boom kappen", url: "#" })},
                    ${anchorTemplate({ label: "Dakkapel plaatsen", url: "#" })},
                    ${anchorTemplate({ label: "Schuur bouwen", url: "#" })}
                  </p>
                `,
              })}

              <div class="dso-context-wrapper">
                <div class="dso-context-container">
                  ${buttonTemplate({
                    label: "Bekijk alle gebieden",
                    variant: "tertiary",
                    type: "button",
                    iconMode: "after",
                    icon: { icon: "chevron-right" },
                  })}
                </div>
              </div>
            `,
          })}
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: html`
              ${richContentTemplate({
                children: html`
                  <h2>Gebieden op de kaart</h2>
                  <p>Gebieden op deze locatie waar aparte regels voor gelden:</p>
                  <p>
                    ${imageTemplate({ alt: "Geel vierkantje", source: "images/rectangle1.png" })}
                    <strong>Tuin</strong> (enkelbestemming) ${anchorTemplate({ label: "Bekijk de regels", url: "#" })}
                  </p>
                  <p>
                    ${imageTemplate({ alt: "Groen vierkantje", source: "images/rectangle2.png" })}
                    <strong>Wonen</strong> (functie) ${anchorTemplate({ label: "Bekijk de regels", url: "#" })}
                  </p>
                `,
              })}

              <div class="dso-context-wrapper">
                <div class="dso-context-container">
                  ${buttonTemplate({
                    label: "Bekijk alle gebieden",
                    variant: "tertiary",
                    type: "button",
                    iconMode: "after",
                    icon: { icon: "chevron-right" },
                  })}
                </div>
              </div>
            `,
          })}
          ${highlightBoxTemplate({
            white: true,
            dropShadow: true,
            content: html`
              ${richContentTemplate({
                children: html`
                  <h2>Thema's</h2>
                  <p>Regels en beleid voor algemene onderwerpen zoals:</p>
                `,
              })}
              ${tileGridTemplate({
                tiles: [
                  {
                    anchor: "#",
                    image: { alt: "", source: "images/icon-tree.png" },
                    label: "Bodem",
                    variant: "theme",
                  },
                  {
                    anchor: "#",
                    image: { alt: "", source: "images/icon-tree.png" },
                    label: "Bodem",
                    variant: "theme",
                  },
                  {
                    anchor: "#",
                    image: { alt: "", source: "images/icon-tree.png" },
                    label: "Bodem",
                    variant: "theme",
                  },
                  {
                    anchor: "#",
                    image: { alt: "", source: "images/icon-tree.png" },
                    label: "Bodem",
                    variant: "theme",
                  },
                ],
              })}

              <div class="dso-context-wrapper">
                <div class="dso-context-container">
                  ${buttonTemplate({
                    label: "Bekijk alle gebieden",
                    variant: "tertiary",
                    type: "button",
                    iconMode: "after",
                    icon: { icon: "chevron-right" },
                  })}
                </div>
              </div>
            `,
          })}
          ${highlightBoxTemplate({
            yellow: true,
            dropShadow: true,
            content: html`
              ${richContentTemplate({
                children: html`
                  <h2>
                    Activiteiten
                    ${toggletipTemplate({ secondary: true, children: html`Meer informatie over deze activiteiten` })}
                  </h2>
                  <p>Als u wilt bouwen of aanpassen kunt u regels zoeken voor deze activiteit.</p>
                `,
              })}

              <div class="dso-context-wrapper">
                <div class="dso-context-label">
                  ${labelTemplate({
                    status: "bright",
                    removable: true,
                    label: "Recreatief nachtverblijf bouwen, in stand houden of gebruiken",
                  })}
                </div>
                <div class="dso-context-container">
                  ${buttonTemplate({
                    label: "Bekijk alle gebieden",
                    variant: "tertiary",
                    type: "button",
                    iconMode: "after",
                    icon: { icon: "chevron-right" },
                  })}
                </div>
              </div>
            `,
          })}
        `,
      })}
    </div>
  `
);
