import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";
import { footerPartial } from "../partials/footer";
import { headerPartial } from "../partials/header";
import { header } from "../partials/header.content";

examplePageFactory(
  "patronen",
  "Row Equal Heights",
  (
    { highlightBoxTemplate, richContentTemplate, rowEqualHeightsTemplate, tileTemplate, whiteboxTemplate },
    templates,
  ) => {
    const shortTile = () =>
      html`${tileTemplate({ label: "Kort verhaal", anchor: "#", image: { alt: "", source: "images/icon-tree.png" } })}`;
    const longTile = () =>
      html`${tileTemplate({
        label: "Lang verhaal waardoor dit blok hoger op je scherm wordt",
        anchor: "#",
        image: { alt: "", source: "images/icon-tree.png" },
      })}`;

    const whitebox = () =>
      html`${whiteboxTemplate({
        title: "Ik wil weten welke wetten en regels er gelden voor mijn huis/bedrijf.",
        description:
          "Weet u al voor welke activiteiten u een vergunning moet aanvragen of een melding moet doen? Dan kunt u de aanvraag of melding direct indienen.",
        image: { alt: "", source: "images/indienen.png" },
        label: "Direct naar aanvragen",
      })}`;

    return html`
      <div class="container">
        ${headerPartial(templates, header)}
        <main>
          <div class="row">
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({ dropShadow: true, content: html`<code>col-md-6 col-lg-3</code>` })}
            </div>
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({ dropShadow: true, content: html`<code>col-md-6 col-lg-3</code>` })}
            </div>
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({ dropShadow: true, content: html`<code>col-md-6 col-lg-3</code>` })}
            </div>
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({ dropShadow: true, content: html`<code>col-md-6 col-lg-3</code>` })}
            </div>
          </div>

          <div class="row dso-equal-heights">
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({
                dropShadow: true,
                step: 1,
                content: richContentTemplate({
                  children: html`
                    <h2>Ongelijke inhoud</h2>
                    <p>
                      Zodra een <code>.row</code> een <code>.dso-equal-heights</code> krijgt, worden voor de volgende
                      componenten de kolommen visueel even hoog:
                    </p>
                    <ul>
                      <li>Highlight Box</li>
                      <li>Whitebox</li>
                      <li>Whitebox small</li>
                    </ul>
                  `,
                }),
              })}
            </div>
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({
                yellow: true,
                dropShadow: true,
                step: 2,
                content: richContentTemplate({
                  children: html`
                    <h2>Ongelijke inhoud</h2>
                    <p>
                      Dit blok is hoger, dit blok heeft meer te vertellen omdat het een veel boeiender blok is. Mijn
                      broertjes zijn minder interessant, dat zie je aan de inhoud
                    </p>
                    <p>PS: Ik ben het tweede blokje</p>
                  `,
                }),
              })}
            </div>
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({
                dropShadow: true,
                step: 3,
                content: richContentTemplate({
                  children: html`
                    <h2>Ongelijke inhoud</h2>
                    <p>Oninteressant blokje</p>
                  `,
                }),
              })}
            </div>
            <div class="col-md-6 col-lg-3">
              ${highlightBoxTemplate({
                dropShadow: true,
                step: 4,
                content: richContentTemplate({
                  children: html`
                    <h2>Ongelijke inhoud</h2>
                    <p>Aha</p>
                  `,
                }),
              })}
            </div>
          </div>

          ${rowEqualHeightsTemplate({
            children: html`
              <div class="col-lg-2 col-md-4 col-xs-6">${shortTile()}</div>
              <div class="col-lg-2 col-md-4 col-xs-6">${longTile()}</div>
              <div class="col-lg-2 col-md-4 col-xs-6">${shortTile()}</div>
              <div class="col-lg-2 col-md-4 col-xs-6">${longTile()}</div>
              <div class="col-lg-2 col-md-4 col-xs-6">${shortTile()}</div>
              <div class="col-lg-2 col-md-4 col-xs-6">${longTile()}</div>
            `,
          })}

          <div class="row dso-equal-heights">
            <div class="col-md-4 col-sm-6">${whitebox()}</div>
            <div class="col-md-4 col-sm-6">${whitebox()}</div>
            <div class="col-md-4 col-sm-6">${whitebox()}</div>
          </div>
        </main>
        ${footerPartial(templates)}
      </div>
    `;
  },
);
