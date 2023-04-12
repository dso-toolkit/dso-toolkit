import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { accordionSections } from "./landingspagina.content";

examplePageFactory(
  "Toepassingen/Home",
  "Landingspagina",
  ({ accordionTemplate, highlightBoxTemplate, iconTemplate, richContentTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        <div class="row dso-banner omgevingsloket-banner" style="background-image: url('images/hero4.jpeg')">
          <div class="col-lg-6 col-sm-8">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h1>Welkom op het omgevingsloket</h1>
                  <p>
                    Een vergunning aanvragen of melding doen, bijvoorbeeld voor een nieuwe dakkapel, een nieuw
                    bedrijfspand of een activiteit op of aan een dijk. Het kan met het nieuwe Omgevingsloket.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured">
          <div class="col-xs-12">
            <h2>De stappen</h2>
            <div class="row dso-equal-heights">
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 1,
                  content: richContentTemplate({
                    children: html`
                      <h3>Locatie</h3>
                      <p>Kies de plek waar u iets wilt doen.</p>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 2,
                  content: richContentTemplate({
                    children: html`
                      <h3>Werkzaamheden</h3>
                      <p>Kies de werkzaamheden van uw project.</p>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 3,
                  content: richContentTemplate({
                    children: html`
                      <h3>Vragen beantwoorden</h3>
                      <p>
                        Doorloop de check en beantwoord alle benodigde vragen. Vragen die in uw situatie niet meer
                        relevant zijn vallen vanzelf weg.
                      </p>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 4,
                  content: richContentTemplate({
                    children: html`
                      <h3>Resultaat</h3>
                      <p>Download het overzicht van de maatregelen.</p>
                    `,
                  }),
                })}
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: html`<img
                  src="images/man-vrouw-kaart.png"
                  alt=""
                  aria-hidden="true"
                  class="dso-highlight-box-banner"
                />
                <div class="dso-rich-content functie-blok">
                  <h2>Vergunning aanvragen of melding doen</h2>
                  <p>
                    Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan
                    u een aanvraag of melding starten.
                  </p>
                  <button type="button" class="dso-secondary" tabindex="0">
                    <span>Aanvragen</span>${iconTemplate({ icon: "chevron-right" })}
                  </button>
                </div>`,
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: html`
                <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
                <div class="dso-rich-content functie-blok">
                  <h2>Bekijk de regels op de kaart op uw locatie</h2>
                  <p>
                    In Regels op de kaart vindt u de regels van alle overheden bij elkaar. U kunt ook plannen van de
                    overheid bekijken voor de toekomst
                  </p>
                  <button type="button" class="dso-secondary" tabindex="0">
                    <span>Regels op de kaart</span>${iconTemplate({ icon: "chevron-right" })}
                  </button>
                </div>
              `,
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: html`
                <img src="images/man-vrouw-kaart.png" alt="" aria-hidden="true" class="dso-highlight-box-banner" />
                <div class="dso-rich-content functie-blok">
                  <h2>Maatregelen voor bedrijven en burgers</h2>
                  <p>
                    Welke algemene regels gelden er voor uw bedrijf, huis of project? Krijg een overzicht van de
                    maatregelen waarmee u aan de regels kunt voldoen.
                  </p>
                  <button type="button" class="dso-secondary" tabindex="0">
                    <span>Maatregelen op maat</span>${iconTemplate({ icon: "chevron-right" })}
                  </button>
                </div>
              `,
            })}
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-xs-12 col-md-8">
            <h2>Veel gestelde vragen</h2>
            ${accordionTemplate({ variant: "compact", sections: accordionSections })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
