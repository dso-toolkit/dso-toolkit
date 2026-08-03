import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { buttonRowTemplate } from "../../../components/button-row/button-row.template.js";
import { cardContainerTemplate } from "../../../components/card-container/card-container.template.js";
import { highlightBoxTemplate } from "../../../components/highlight-box/highlight-box.template.js";
import { linkTemplate } from "../../../components/link/link.template.js";
import { linkListTemplate } from "../../../components/link-list/link-list.template.js";
import { richContentTemplate } from "../../../components/rich-content/rich-content.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { linkList } from "./project-overzicht.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Mijn Omgevingsloket/Project Overzicht",
};

export default meta;

const ProjectOverzicht = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu(), userHomeActive: true, authStatus: "loggedIn" })}
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
              <div class="col-md-12 col-sm-6">
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
              <div class="col-md-12 col-sm-6">
                ${highlightBoxTemplate({
                  border: true,
                  content: richContentTemplate({
                    children: html`
                      <h2>Deelnemers</h2>
                      <p>
                        Wit u dat iemand anders uw aanvraag kan maken of indienen? Dan kunt u iemand hiervoor machtigen
                        bij Deelnemers
                      </p>
                      ${linkTemplate({
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
            <h2>Verdergaan met aanvullen</h2>
            ${cardContainerTemplate({
              mode: "list",
              cards: [
                {
                  href: "#",
                  label: "Oprit verleggen",
                  content: html`<dl>
                      <dt>Soort verzoek:</dt>
                      <dd>Aanvraag vergunning</dd>
                      <dt>Activiteiten:</dt>
                      <dd>Bouwactiviteit (omgevingsplan)</dd>
                      <dd>Stikstofemissie bij het uitvoeren van bouw- of sloopwerkzaamheden</dd>
                    </dl>
                    ${buttonRowTemplate({
                      buttons: [
                        {
                          url: "#",
                          label: "Verdergaan met aanvullen",
                          variant: "primary",
                          iconMode: "after",
                          icon: {
                            icon: "pencil",
                          },
                        },
                        {
                          url: "#",
                          label: "Aanvulling verwijderen",
                          variant: "secondary",
                          iconMode: "after",
                          icon: {
                            icon: "trash",
                          },
                        },
                      ],
                    })}`,
                },
              ],
            })}
            <h2>Ingediende verzoeken</h2>
            <p>Kies hier het verzoek dat u wilt bekijken, aanvullen of intrekken.</p>
            ${cardContainerTemplate({
              mode: "list",
              cards: [
                {
                  href: "#",
                  label: "Boom kappen op de oude manier",
                  content: html`<dl>
                    <dt>Soort verzoek:</dt>
                    <dd>Aanvraag vergunning</dd>
                    <dt>Datum:</dt>
                    <dd>02-20-2022</dd>
                  </dl>`,
                },
                {
                  href: "#",
                  label: "Boom kappen op de nieuwe manier",
                  content: html`<dl>
                    <dt>Soort verzoek:</dt>
                    <dd>Aanvraag toestemming gelijkwaardige maatregel</dd>
                    <dt>Datum:</dt>
                    <dd>02-20-2022</dd>
                  </dl>`,
                },
                {
                  href: "#",
                  label: "Boom kappen in de achtertuin 3",
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
      ${footerPartial()}
    </div>
  `;
});

export { ProjectOverzicht };
