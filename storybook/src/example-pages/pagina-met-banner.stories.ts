import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../example-page-stories";

import { header } from "./content/header.content";
import { mainMenu } from "./content/main-menu.content";
import { footerPartial } from "./partials/footer";
import { headerPartial } from "./partials/header";

const meta: Meta = {
  title: "Voorbeeldpagina's/Pagina met banner",
};

export default meta;

const PaginaMetBanner = examplePageStories((templates) => {
  const { linkTemplate, bannerTemplate, highlightBoxTemplate, richContentTemplate } = templates;

  return html`
    ${bannerTemplate({
      status: "error",
      content: richContentTemplate({
        children: html`
          <h2>Storingsmelding:</h2>
          <p>
            Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.
          </p>
        `,
      }),
    })}
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <div class="row">
          <div class="col-lg-8">
            ${highlightBoxTemplate({
              yellow: true,
              content: richContentTemplate({
                children: html`
                  <h2>Vul uw aanvraag zo compleet mogelijk in</h2>
                  <p>
                    Zo voorkomt u dat uw aanvraag vertraging oploopt. Er zijn slechts een aantal vragen verplicht, maar
                    om uw aanvraag in behandeling te kunnen nemen moeten er voldoende gegevens over uw activiteit(en)
                    bekend zijn. Welke dat zijn is in elke situatie anders. Controleer daarom extra op de volledigheid
                    van uw aanvraag.
                  </p>
                `,
              }),
            })}
            ${richContentTemplate({
              children: html`
                <h2>Proefverzoek</h2>
                <p>
                  Ben u niet zeker over uw aanvraag? Vraag u zich bijvoorbeeld af of die extra meter voor de aanbouw wel
                  mag? Dan kunt u gebruik maken van een proefverzoek. Door uw aanvraag in te dienen als proefverzoek
                  kunt u samen met de gemeente, waterschap of provincie kijken wat er nodig is voor een passende
                  vergunning of melding van iw activiteit(en).
                </p>
                <p>
                  <em
                    >Let op, bekijk altijd eerst de website van uw gemeente, waterschap of provincie voor de
                    beschikbaarheid en mgelijke kosten van een proefverzoek.</em
                  >
                </p>
              `,
            })}
          </div>
          <div class="col-lg-4">
            ${highlightBoxTemplate({
              white: true,
              border: true,
              content: richContentTemplate({
                children: html`<h2>Vragen?</h2>
                  <h3>Bel 088 - 79 70 790</h3>
                  <p>
                    Bereikbaar op werkdagen van 9.00-12.00 uur en van 13.00-16.30 uur. Kijk op de website
                    ${linkTemplate({ label: "www.aandeslagmetdeomgevingswet.nl", url: "#" })} of neem
                    ${linkTemplate({ label: "contant", url: "#" })} met ons op.
                  </p>`,
              }),
            })}
          </div>
        </div>
      </main>

      ${footerPartial(templates)}
      </div>
    </div>
  `;
});

export { PaginaMetBanner };
