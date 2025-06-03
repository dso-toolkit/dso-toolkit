import type { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { accordionSections } from "./landingspagina.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Vergunningscheck/Landingspagina",
};

export default meta;

const Landingspagina = examplePageStories((templates) => {
  const { linkTemplate, accordionTemplate, highlightBoxTemplate, richContentTemplate } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Vergunningscheck") })}
      <main>
        <div
          class="row dso-banner dso-banner-implementation-specific-image"
          style="background-image: url('images/hero2.jpeg')"
        >
          <div class="col-lg-6 col-sm-8">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h1>Vergunningcheck</h1>
                  <p>
                    De Bouwregelgeving is een database met alle bouwregelgeving in Nederland, die op zodanige wijze moet
                    zijn ingericht en ontsloten dat die voldoet aan de eisen van de Omgevingswet (3B's), en daarmee
                    bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
                  </p>
                  <p>${linkTemplate({ label: "Doe de vergunningcheck", url: "#", modifier: "dso-primary" })}</p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            ${richContentTemplate({
              children: html`
                <h2>Check gedaan? Direct door naar aanvragen</h2>
                <p>
                  Met de Vergunningcheck ziet u voor welke juridische activiteiten u een vergunning moet aanvragen of
                  melding moet doen.
                </p>
                <p>
                  Als u klaar bent met de Vergunningcheck, kunt u meteen beginnen aan uw aanvraag. Uw locatie en
                  juridische activiteiten worden dan bewaard. Dat scheelt u veel werk in de toekomst.
                </p>
              `,
            })}
          </div>
          <div class="col-lg-4">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <h2>Vragen?</h2>
                  <p>
                    Heeft u vragen over uw vergunning of melding? Neem dan contact op met uw gemeente of waterschap.
                    Heeft u vragen over hoe de website werkt? Neem dan contact op met
                    ${linkTemplate({ label: "het Informatiepunt", url: "#", mode: "extern" })}.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured">
          <div class="col-xs-12">
            <h2>De stappen</h2>
            <ol class="row dso-equal-heights">
              <li class="col-md-3 col-sm-6">
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
              </li>
              <li class="col-md-3 col-sm-6">
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
              </li>
              <li class="col-md-3 col-sm-6">
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
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 4,
                  content: richContentTemplate({
                    children: html`
                      <h3>Resultaat</h3>
                      <p>
                        U krijgt een overzicht. U ziet daar in of u een vergunning moet aanvragen of een melding moet
                        doen.
                      </p>
                    `,
                  }),
                })}
              </li>
              <li class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  step: 5,
                  content: richContentTemplate({
                    children: html`
                      <h3>Start een aanvraag</h3>
                      <p>
                        U kunt ook vanuit de Vergunningcheck starten met een aanvraag. De locatie en activiteiten worden
                        dan bewaard.
                      </p>
                    `,
                  }),
                })}
              </li>
            </ol>
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-md-8">
            <h2>Veel gestelde vragen</h2>
            ${accordionTemplate({ variant: "compact", sections: accordionSections })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `;
});

export { Landingspagina };
