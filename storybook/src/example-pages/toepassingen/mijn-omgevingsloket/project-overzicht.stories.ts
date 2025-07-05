import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { linkList } from "./project-overzicht.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Mijn Omgevingsloket/Project Overzicht",
};

export default meta;

const ProjectOverzicht = examplePageStories((templates) => {
  const {
    linkTemplate,
    applicationHeadingTemplate,
    buttonRowTemplate,
    cardListTemplate,
    highlightBoxTemplate,
    linkListTemplate,
    richContentTemplate,
  } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu(), userHomeActive: true, authStatus: "loggedIn" })}
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
            ${cardListTemplate({
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
            ${cardListTemplate({
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
      ${footerPartial(templates)}
    </div>
  `;
});

export { ProjectOverzicht };
