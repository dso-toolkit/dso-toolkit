import { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../example-page-stories";

import { header } from "./content/header.content";
import { mainMenu } from "./content/main-menu.content";
import { footerPartial } from "./partials/footer";
import { headerPartial } from "./partials/header";

const meta: Meta = {
  title: "Voorbeeldpagina's/Meerdere highlight boxes",
};

export default meta;

const MeerdereHighlightBoxes = examplePageStories((templates) => {
  const { buttonTemplate, highlightBoxTemplate, richContentTemplate } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Maatregelen op maat") })}
      <main>
        <h1>Highlight-box Banner aspect-ratio demo pagina</h1>
        <p>
          De banners/afbeeldingen in deze blokjes hebben een aspect-ratio van 3.5 op desktop <ul><li>Standaard aspect-ratio: 2.38 / 1;</li><li>Tussen 360px en 470px breedte van een blokje: 3 / 1</li><li>Als het blokje breder is dan 471px: 3.5 / 1</li></ul>
        </p>
        <div class="row dso-featured dso-equal-heights">
          <div class="col-md-4 col-sm-6">
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

          <div class="col-md-4 col-sm-6">
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

          <div class="col-md-4 col-sm-6">
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
        </div>
        <!-- rij met twee boxes -->
        <div class="row dso-featured dso-equal-heights">
          <div class="col-md-6 col-sm-6">
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

          <div class="col-md-6 col-sm-6">
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
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `;
});

export { MeerdereHighlightBoxes };
