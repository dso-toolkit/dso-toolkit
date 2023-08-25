import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { linkList } from "./homepage.content";

examplePageFactory(
  "Toepassingen/Loket",
  "Homepage",
  (
    { anchorTemplate, linkListTemplate, highlightBoxTemplate, richContentTemplate, tileTemplate, buttonTemplate },
    templates
  ) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        <div
          class="row dso-banner no-button-banner dso-banner-implementation-specific-image"
          style="background-image: url('images/hero2.jpeg')"
        >
          <div class="col-lg-6 col-sm-8">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h1>Homepage</h1>
                  <p>
                    Een vergunning aanvragen of melding doen, bijvoorbeeld voor een nieuwe dakkapel, een nieuw
                    bedrijfspand of een activiteit op of aan een dijk. Het kan met het nieuwe Omgevingsloket.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured dso-equal-heights">
          <div class="col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              border: true,
              content: richContentTemplate({
                children: html`
                  <div class="row">
                    <div class="col-md-5 col-md-push-7">
                      ${richContentTemplate({
                        children: html`
                          <h2>Check of u een vergunning nodig heeft</h2>
                          <p>Wilt u iets veranderen aan het huis, tuin of bedrijf</p>
                          <p>
                            Doe hier de vergunningcheck om te kijken of u een vergunning nodig heeft of een melding moet
                            doen.
                          </p>
                          ${anchorTemplate({ label: "Vergunningcheck", url: "#", modifier: "dso-secondary" })}
                        `,
                      })}
                    </div>
                    <div class="col-md-7 col-md-pull-5">
                      ${richContentTemplate({
                        children: html` <h3>Meest gekozen werkzaamheden</h3> `,
                      })}
                      <div class="dso-tile-grid">
                        ${tileTemplate({
                          anchor: "#",
                          image: { alt: "Boom Icoon", source: "images/icon-tree.png" },
                          label: "boom kappen",
                          variant: "theme",
                        })}
                        ${tileTemplate({
                          anchor: "#",
                          image: { alt: "Boom Icoon", source: "images/icon-tree.png" },
                          label: "boom kappen",
                          variant: "theme",
                        })}
                        ${tileTemplate({
                          anchor: "#",
                          image: { alt: "Boom Icoon", source: "images/icon-tree.png" },
                          label: "boom kappen",
                          variant: "theme",
                        })}
                        ${tileTemplate({
                          anchor: "#",
                          image: { alt: "Boom Icoon", source: "images/icon-tree.png" },
                          label: "boom kappen",
                          variant: "theme",
                        })}
                      </div>
                    </div>
                  </div>
                `,
              }),
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              bannerImage: true,
              content: richContentTemplate({
                children: html`
                  <h2>Vergunning aanvragen of melding doen</h2>
                  <p>
                    Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kan
                    u een aanvraag of melding starten.
                  </p>
                  ${buttonTemplate({ label: "Aanvragen", url: "#", variant: "secondary" })}
                `,
              }),
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              bannerImage: true,
              content: richContentTemplate({
                children: html`
                  <h2>Bekijk de regels op de kaart op uw locatie</h2>
                  <p>
                    In Regels op de kaart vindt u de regels van alle overheden bij elkaar. U kunt ook plannen van de
                    overheid bekijken voor de toekomst
                  </p>
                  ${buttonTemplate({ label: "Regels op de kaart", url: "#", variant: "secondary" })}
                `,
              }),
            })}
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              bannerImage: true,
              content: richContentTemplate({
                children: html`
                  <h2>Maatregelen voor bedrijven en burgers</h2>
                  <p>
                    Welke algemene regels gelden er voor uw bedrijf, huis of project? Krijg een overzicht van de
                    maatregelen waarmee u aan de regels kunt voldoen.
                  </p>
                  ${buttonTemplate({ label: "Maatregelen op maat", url: "#", variant: "secondary" })}
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-md-4 col-sm-6 col-xs-12">
            ${highlightBoxTemplate({
              white: true,
              border: true,
              content: richContentTemplate({
                children: html`
                  <h2>Huidige dienstverlening</h2>
                  ${linkListTemplate(linkList)}
                `,
              }),
            })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
