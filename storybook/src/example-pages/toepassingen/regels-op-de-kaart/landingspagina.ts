import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { accordionSections } from "./landingspagina.content";

examplePageFactory(
  "Toepassingen/Regels op de kaart",
  "Landingspagina",
  ({ accordionTemplate, anchorTemplate, highlightBoxTemplate, richContentTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        <div
          class="row dso-banner no-button-banner dso-banner-implementation-specific-image"
          style="background-image: url('images/herok.png')"
        >
          <div class="col-lg-6 col-sm-8">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h1>Regels op de kaart</h1>
                  <p>
                    De Bouwregelgeving is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet
                    zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee
                    bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured">
          <div class="col-xs-12">
            <div class="row dso-equal-heights">
              <div class="col-md-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <h2>Regels die nu gelden op uw locatie</h2>
                      <div class="row">
                        <div class="col-md-4">
                          <img src="images/sneeuwpop.png" class="img-circle" aria-hidden="true" />
                        </div>
                        <div class="col-md-8">
                          <p>Regels voor bouwen, slopen en andere activiteiten kunnen per locatie anders zijn.</p>
                          <button type="button" class="dso-primary">
                            <span>Zoek regels die nu gelden</span>
                          </button>
                        </div>
                      </div>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <h2>Regels in voorbereiding</h2>
                      <div class="row">
                        <div class="col-md-4">
                          <img src="images/sneeuwpop.png" class="img-circle" aria-hidden="true" />
                        </div>
                        <div class="col-md-8">
                          <p>
                            U kunt ook plannen van de overheid bekijken voor de toekomst. Zo weet u wat er gaat
                            veranderen op uw locatie.
                          </p>
                          <button type="button" class="dso-primary">
                            <span>Zoek regels in voorbereiding</span>
                          </button>
                        </div>
                      </div>
                    `,
                  }),
                })}
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <h2>Documenten met regels zoeken</h2>
            <div class="row dso-equal-heights">
              <div class="col-md-6">
                <p>
                  U kunt ook een bepaald document opzoeken. Dat is handig als u al weet in welk document de regels staan
                  die u zoekt.
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  ${anchorTemplate({
                    label: "Zoek documenten via eigenschappen",
                    url: "#",
                    modifier: "dso-secondary extern",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <h2>Regels die in het verleden geldig waren</h2>
            <div class="row dso-equal-heights">
              <div class="col-md-6">
                <p>
                  Voor een juridisch geschil kan het nodig zijn om regels uit het verleden op te zoeken. U kunt regels
                  vinden terug in de tijd tot 1-2-2022.
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  ${anchorTemplate({
                    label: "Bekijk regels uit het verleden",
                    url: "#",
                    modifier: "dso-secondary extern",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <h2>Regels van alle overheden bij elkaar</h2>
            <p>In Regels op de kaart vindt u de regels van alle overheden bij elkaar. Dat is handig als u bijvoorbeeld een schuur wilt gaan bouwen. U kunt dan zien hoe hoog de schuur mag zijn.
            Vaak heeft u niet alleen de gemeente regels voor een bepaalde plek, maar ook het waterschap of de provincie. Op de kaart ziet u de regels van al deze overheden bij elkaar. U kunt ook nog oude regels uit bestemmingsplannen zien als die nog geldig zijn.
            Daarnaast ziet u regels en beleid waar nog aan wordt gewerkt. Zo krijgt u een idee van wat er in de toekomst gaat veranderen in uw omgeving.
            </p>
            <h3>Mogelijk ook interessant</h2>
            <p>Wilt u controleren of u een vergunning nodig heeft? Doe dan de vergunningscheck</p>
            <p>Wilt u officiële bekendmakingen van besluiten bekijken? Ga dan naar officiëlebekendmakingen.nl</p>
            <h2>Veelgestelde vragen</h2>
            ${accordionTemplate({ variant: "compact", reverseAlign: true, sections: accordionSections })}
          </div>
          <div class="col-sm-4">
            ${highlightBoxTemplate({
              white: true,
              border: true,
              content: richContentTemplate({
                children: html`
                  <h2>Vragen?</h2>
                  <p>
                    Heeft u vragen over uw vergunning of melding? Neem dan contact op met uw gemeente of waterschap.
                    Heeft u vragen over hoe de website werkt? Neem dan contact op met
                    ${anchorTemplate({ label: "het Informatiepunt", url: "#", mode: "extern" })}.
                  </p>
                `,
              }),
            })}
          </div>

          <div class="col-sm-4">
            ${highlightBoxTemplate({
              white: true,
              border: true,
              content: richContentTemplate({
                children: html`
                  <h3>Actueel</h3>
                  <p>Regels op de kaart is in ontwikkeling. Regelmatig worden er verbeteringen doorgevoerd.</p>
                  ${anchorTemplate({
                    label: "Wijzigingen in Regels op de kaart",
                    url: "#",
                    modifier: "dso-tertiary",
                    icon: { icon: "chevron-right" },
                  })}
                `,
              }),
            })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
