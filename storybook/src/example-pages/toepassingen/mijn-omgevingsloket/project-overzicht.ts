import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { linkList, mainMenu } from "./project-overzicht.content";

examplePageFactory(
  "Toepassingen/Mijn Omgevingsloket",
  "Project Overzicht",
  (
    {
      anchorTemplate,
      applicationHeadingTemplate,
      buttonRowTemplate,
      cardListTemplate,
      highlightBoxTemplate,
      linkListTemplate,
      richContentTemplate,
    },
    templates,
  ) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu })}
      <main>
        <div class="row">
          <div class="col-md-12">
            ${buttonRowTemplate({
              buttons: [
                {
                  variant: "tertiary",
                  label: "Bekijk andere projecten",
                  url: "#",
                  icon: { icon: "chevron-left" },
                },
              ],
            })}
            ${applicationHeadingTemplate({ title: "Boom kappen in de achtertuin" })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="row dso-equal-heights">
              <div class="col-md-12 col-sm-6 col-xs-12">
                ${highlightBoxTemplate({
                  border: true,
                  content: richContentTemplate({
                    children: html`
                      <h2>Mijn project</h2>
                      ${linkListTemplate(linkList)}
                    `,
                  }),
                })}
              </div>
              <div class="col-md-12 col-sm-6 col-xs-12">
                ${highlightBoxTemplate({
                  border: true,
                  content: richContentTemplate({
                    children: html`
                      <h2>Deelnemers</h2>
                      <p>
                        Wit u dat iemand anders uw aanvraag kan maken of indienen? Dan kunt u iemand hiervoor machtigen
                        bij Deelnemers
                      </p>
                      ${anchorTemplate({
                        label: "Deelnemers",
                        url: "#",
                        modifier: "dso-secondary",
                        icon: { icon: "chevron-right" },
                      })}
                    `,
                  }),
                })}
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <h2>Verzoeken</h2>
            <p>Kies hier de verzoeken die u wilt bekijken, aanvullen of intrekken</p>
            <div class="row">
              <div class="col-md-12">
                ${cardListTemplate({
                  cards: [
                    {
                      label: "Boom kappen in de achtertuin 1",
                      interactions: [{ type: "button", label: "Ingediend", variant: "tertiary" }],
                      content: html`<dl>
                        <dt>Soort verzoek:</dt>
                        <dd>Aanvraag</dd>
                        <dt>Datum:</dt>
                        <dd>02-20-2022</dd>
                      </dl>`,
                    },
                    {
                      label: "Boom kappen in de achtertuin 2",
                      interactions: [{ type: "button", label: "Ingediend", variant: "tertiary" }],
                      content: html`<dl>
                        <dt>Soort verzoek:</dt>
                        <dd>Aanvraag toestemming gelijkwaardige maatregel</dd>
                        <dt>Datum:</dt>
                        <dd>02-20-2022</dd>
                      </dl>`,
                    },
                    {
                      label: "Boom kappen in de achtertuin 3",
                      interactions: [{ type: "button", label: "Conceptverzoek", variant: "tertiary" }],
                      content: html`<dl>
                        <dt>Soort verzoek:</dt>
                        <dd>Melding</dd>
                        <dt>Datum:</dt>
                        <dd>02-20-2022</dd>
                      </dl>`,
                    },
                  ],
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            ${buttonRowTemplate({
              buttons: [
                {
                  variant: "tertiary",
                  label: "Bekijk andere projecten",
                  url: "#",
                  icon: { icon: "chevron-left" },
                },
              ],
            })}
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
