import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";
import { footerPartial } from "../partials/footer";
import { headerPartial } from "../partials/header";
import { header } from "../partials/header.content";
import { mainMenu } from "./full-width.content";

examplePageFactory(
  "Patronen",
  "Meerdere highlight boxes",
  (templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu })}
      <main>
        <h1>Highlight-box Banner aspect-ratio demo pagina</h1>
        <p>
          De banners/afbeeldingen in deze blokjes hebben een aspect-ratio van 3.5 op desktop <ul><li>Standaard aspect-ratio: 2.38 / 1;</li><li>Tussen 360px en 470px breedte van een blokje: 3 / 1</li><li>Als het blokje breder is dan 471px: 3.5 / 1</li></ul>
          </p>
        <div class="row dso-featured dso-equal-heights">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="dso-highlight-box dso-white dso-drop-shadow">
              <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
              <div class="dso-rich-content functie-blok">
                <h2>Vergunning aanvragen of melding doen</h2>
                <p>
                  Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan u
                  een aanvraag of melding starten.
                </p>
                <button type="button" class="dso-secondary" tabindex="0">
                  <span>Aanvragen</span
                  ><svg dsoSvgIcon="chevron-right" class="di di-chevron-right" aria-hidden="true" version="1.1">
                    <use xlink:href="dso-icons.svg#chevron-right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="dso-highlight-box dso-white dso-drop-shadow">
              <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
              <div class="dso-rich-content functie-blok">
                <h2>Vergunning aanvragen of melding doen</h2>
                <p>
                  Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan u
                  een aanvraag of melding starten.
                </p>
                <button type="button" class="dso-secondary" tabindex="0">
                  <span>Aanvragen</span
                  ><svg dsoSvgIcon="chevron-right" class="di di-chevron-right" aria-hidden="true" version="1.1">
                    <use xlink:href="dso-icons.svg#chevron-right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="dso-highlight-box dso-white dso-drop-shadow">
              <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
              <div class="dso-rich-content functie-blok">
                <h2>Vergunning aanvragen of melding doen</h2>
                <p>
                  Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan u
                  een aanvraag of melding starten.
                </p>
                <button type="button" class="dso-secondary" tabindex="0">
                  <span>Aanvragen</span
                  ><svg dsoSvgIcon="chevron-right" class="di di-chevron-right" aria-hidden="true" version="1.1">
                    <use xlink:href="dso-icons.svg#chevron-right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- rij met twee boxes -->
        <div class="row dso-featured dso-equal-heights">
          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="dso-highlight-box dso-white dso-drop-shadow">
              <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
              <div class="dso-rich-content functie-blok">
                <h2>Vergunning aanvragen of melding doen</h2>
                <p>
                  Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan u
                  een aanvraag of melding starten.
                </p>
                <button type="button" class="dso-secondary" tabindex="0">
                  <span>Aanvragen</span
                  ><svg dsoSvgIcon="chevron-right" class="di di-chevron-right" aria-hidden="true" version="1.1">
                    <use xlink:href="dso-icons.svg#chevron-right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="dso-highlight-box dso-white dso-drop-shadow">
              <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
              <div class="dso-rich-content functie-blok">
                <h2>Vergunning aanvragen of melding doen</h2>
                <p>
                  Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan u
                  een aanvraag of melding starten.
                </p>
                <button type="button" class="dso-secondary" tabindex="0">
                  <span>Aanvragen</span
                  ><svg dsoSvgIcon="chevron-right" class="di di-chevron-right" aria-hidden="true" version="1.1">
                    <use xlink:href="dso-icons.svg#chevron-right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
