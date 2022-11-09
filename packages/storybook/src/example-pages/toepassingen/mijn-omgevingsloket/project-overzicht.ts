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
      buttonRowTemplate,
      applicationHeadingTemplate,
      highlightBoxTemplate,
      linkListTemplate,
      anchorTemplate,
      cardListTemplate,
    },
    templates
  ) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu })}
      <main>
        <div class="row">
          <div class="col-md-12">
            ${buttonRowTemplate({
              buttons: [{ label: "Bekijk andere projecten", variant: "tertiary", icon: { icon: "chevron-left" } }],
            })}
            <!-- ButtonAnchor kan niet in een buttonRowTemplate?? -->
            <!-- <div class="dso-button-row">
              {% render '@anchor', {modifier: 'dso-tertiary', label: 'Bekijk andere projecten', url: '#', icon:
              'chevron-left'} %}
            </div> -->
            ${applicationHeadingTemplate({ title: "Boom kappen in de achtertuin" })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="row dso-equal-heights">
              <div class="col-md-12 col-sm-6 col-xs-12">
                ${highlightBoxTemplate({
                  border: true,
                  content: html`
                    <div class="dso-rich-content">
                      <h2>Mijn project</h2>
                      ${linkListTemplate(linkList)}
                    </div>
                  `,
                })}
              </div>
              <div class="col-md-12 col-sm-6 col-xs-12">
                ${highlightBoxTemplate({
                  border: true,
                  content: html`
                    <div class="dso-rich-content">
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
                    </div>
                  `,
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
                      interactions: [{ label: "", variant: "primary" }],
                      content: "ja",
                    },
                  ],
                })}
                <ul class="dso-card-list">
                  <li>
                    <div class="dso-card">
                      <div class="dso-card-heading">
                        <a href="#">
                          <h3>
                            <span>Boom kappen in de achtertuin 1</span>
                            <dso-icon icon="chevron-right"></dso-icon>
                          </h3>
                        </a>
                        <div class="dso-card-interactions">
                          <div class="dso-card-interaction">
                            <p class="text-muted">
                              <dso-toggletip secondary="true">
                                Uw verzoek is ingediend. Meestal krijgt u binnen acht weken het besluit van de
                                behandelende organisatie
                              </dso-toggletip>
                              Ingediend
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="dso-card-content">
                        <div class="dso-rich-content">
                          <dl>
                            <dt>Soort verzoek:</dt>
                            <dd>Aanvraag</dd>
                            <dt>Datum:</dt>
                            <dd>02-20-2022</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="dso-card">
                      <div class="dso-card-heading">
                        <a href="#">
                          <h3>
                            <span>Boom kappen in de achtertuin 2</span>
                            <dso-icon icon="chevron-right"></dso-icon>
                          </h3>
                        </a>
                        <div class="dso-card-interactions">
                          <div class="dso-card-interaction">
                            <p class="text-muted">
                              <dso-toggletip secondary="true">
                                Uw verzoek is ingediend. Meestal krijgt u binnen acht weken het besluit van de
                                behandelende organisatie
                              </dso-toggletip>
                              Ingediend
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="dso-card-content">
                        <div class="dso-rich-content">
                          <dl>
                            <dt>Soort verzoek:</dt>
                            <dd>Aanvraag toestemming gelijkwaardige maatregel</dd>
                            <dt>Datum:</dt>
                            <dd>02-20-2022</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="dso-card">
                      <div class="dso-card-heading">
                        <a href="#">
                          <h3>
                            <span>Boom kappen in de achtertuin 3</span>
                            <dso-icon icon="chevron-right"></dso-icon>
                          </h3>
                        </a>
                        <div class="dso-card-interactions">
                          <div class="dso-card-interaction">
                            <p class="text-muted">
                              <dso-toggletip secondary="true">
                                Uw verzoek is ingediend. Meestal krijgt u binnen acht weken het besluit van de
                                behandelende organisatie
                              </dso-toggletip>
                              Omgevingsoverleg
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="dso-card-content">
                        <div class="dso-rich-content">
                          <dl>
                            <dt>Soort verzoek:</dt>
                            <dd>Melding</dd>
                            <dt>Datum:</dt>
                            <dd>02-20-2022</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="dso-button-row">
              ${anchorTemplate({
                label: "Bekijk andere projecten",
                url: "#",
                modifier: "dso-tertiary",
                icon: { icon: "chevron-left" },
              })}
            </div>
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `
);
