import type { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { linkList } from "./helpcentrum.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Loket/Helpcentrum",
};

export default meta;

const Helpcentrum = examplePageStories(
  ({ linkListTemplate, highlightBoxTemplate, richContentTemplate, searchBarTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Regels op de kaart") })}
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
                  <h1>Helpcentrum</h1>
                  <p>
                    Heeft u een vraag over de werking van de Vergunningcheck of over geldende regelgeving? Wij hebben de
                    veelgestelde vragen per thema voor u op een rij gezet.
                  </p>
                `,
              }),
            })}
          </div>
        </div>
        <h2>Waarmee kunnen we u helpen?</h2>
        <div class="row">
          <div class="col-md-8">
            ${searchBarTemplate({
              label: "Zoeken",
              hiddenLabel: true,
              placeholder: "Helpartikelen zoeken",
              buttonLabel: "Zoeken",
              icon: true,
              id: "helpcentrum-search-bar",
            })}
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-4">
            <h3>U wilt weten hoe het Omgevingsloket werkt</h3>
            ${linkListTemplate(linkList)}
          </div>
          <div class="col-md-4">
            <h3>U wilt weten of u werkzaamheden mag uitvoeren</h3>
            ${linkListTemplate(linkList)}
          </div>
          <div class="col-md-4">
            <h3>U wilt een aanvraag of melding indienen</h3>
            ${linkListTemplate(linkList)}
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <h3>U wilt weten welke regels er gelden en plannen bekijken</h3>
            ${linkListTemplate(linkList)}
          </div>
          <div class="col-md-4">
            <h3>U wilt weten welke algemene regels gelden voor uw bedrijf of project</h3>
            ${linkListTemplate(linkList)}
          </div>
        </div>
        <hr />
        <h2>Overige Vragen</h2>
        <div class="row dso-equal-heights">
          <div class="col-md-6">
            ${highlightBoxTemplate({
              white: true,
              dropShadow: true,
              content: richContentTemplate({
                children: html`
                  <div class="row">
                    <div class="col-md-4"><img src="images/sneeuwpop.png" class="img-circle" aria-hidden="true" /></div>
                    <div class="col-md-8">
                      <h3>Vragen over uw vergunning of melding?</h3>
                      <p>Neem dan contact op met uw gemeente of waterschap.</p>
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
                  <div class="row">
                    <div class="col-md-4"><img src="images/sneeuwpop.png" class="img-circle" aria-hidden="true" /></div>
                    <div class="col-md-8">
                      <h3>Vragen over de website?</h3>
                      <p>Neem dan contact op met het informatiepunt Leefomgeving.</p>
                    </div>
                  </div>
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

export { Helpcentrum };
