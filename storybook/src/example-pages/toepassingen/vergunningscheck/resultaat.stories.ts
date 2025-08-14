import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Vergunningscheck/Resultaat",
};

export default meta;

const Resultaat = examplePageStories((templates) => {
  const {
    accordionTemplate,
    actionListTemplate,
    alertTemplate,
    linkTemplate,
    applicationHeadingTemplate,
    formButtonsTemplate,
    buttonTemplate,
    iconTemplate,
    richContentTemplate,
  } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Vergunningscheck") })}
      <main>
        <form>
          ${applicationHeadingTemplate({ title: "Vergunningcheck", subtitle: "4. Resultaat", step: "Stap 4/4" })}

          <h2>Wat gaat u doen?</h2>

          ${richContentTemplate({
            children: html`
              <p>U heeft een vergunningscheck gedaan voor de volgende werkzaamheden:</p>
              <ul>
                <li>Bedrijf dat afvalwater zuivert</li>
                <li>Antenne plaatsen, verplaatsen of vervangen</li>
              </ul>
              <p>Hieronder staat uitgelegd wat u moet regelen en waar u rekening mee moet houden.</p>
            `,
          })}
          ${actionListTemplate({
            title: "Actielijst Omgevingsloket",
            actionListItems: [
              {
                flowLine: true,
                content: buttonTemplate({
                  variant: "secondary",
                  icon: { icon: "download" },
                  label: "Download de actielijst als PDF",
                }),
              },
              {
                title: "Neem contact op met het waterschap en de gemeente",
                flowLine: true,
                content: html`
                  ${accordionTemplate({
                    variant: "neutral",
                    sections: [
                      {
                        handleTitle:
                          'Waterschap: Wat u moet regelen voor "Wegen en bijbehorende constructies plaatsen of verwijderen waterkering"',
                        heading: "h4",
                        content: richContentTemplate({
                          children: html`
                            <h5>Algemene toelichting</h5>
                            <p>
                              Het waterschap heeft aanvullende informatie nodig om met zekerheid te kunnen zeggen wat u
                              moet regelen. Mogelijk moet u voorafgaand aan uw werkzaamheden een vergunning aanvragen,
                              melding doen of informatie geven.
                            </p>
                            <h5>Voorbereiding</h5>
                            <p>
                              Houd de informatie bij de hand die te maken heeft met de werkzaamheden "Verharding
                              aanbrengen of vervangen".
                            </p>
                            <h5>Contactinfromatie Waterschap Amstel, Gooi en Vecht</h5>
                            <span>${iconTemplate({ icon: "call" })} Telefoon: 0900 9394</span>
                            <span
                              >${iconTemplate({ icon: "air" })}
                              ${linkTemplate({ url: "#", label: "www.agv.nl", mode: "extern" })}</span
                            >
                            <span
                              >${iconTemplate({ icon: "buildings" })} Bezoekadres: Korte Ouderkerkerdijk 7, 1096AC
                              Amsterdam</span
                            >
                          `,
                        }),
                      },
                      {
                        handleTitle:
                          'Waterschap: Wat u moet regelen voor "Verharding aanbrengen of verwijderen bij oppervlaktewater"',
                        heading: "h4",
                      },
                      {
                        handleTitle: 'Gemeente: Wat u moet regelen voor "Verhard oppervlak en stedelijke uitbreiding"',
                        heading: "h4",
                      },
                    ],
                  })}
                `,
              },
              {
                title: "Vergunning aanvragen",
                flowLine: true,
                content: html`
                  ${accordionTemplate({
                    variant: "neutral",
                    sections: [
                      {
                        handleTitle:
                          'Vraag een vergunning aan voor "Afvalwater, afkomstig van een zuiveringsvoorziening voor ingezameld of afgegeven afvalwater, lozen op een oppervlaktelichaam"',
                        heading: "h4",
                        open: true,
                        content: richContentTemplate({
                          children: html`
                            <h5>Algemene informatie</h5>
                            <p>
                              U heeft de vergunning nodig voordat u mag beginnen met hieronder genoemde werkzaamheden.
                              Houd rekening met een doorlooptijd voor de behandeling van uw aanvraag.
                            </p>
                            <h5>Toelichting</h5>
                            <p>
                              U moet zich naast de regels uit de vergunning ook houden aan de algemene regels voor deze
                              activiteit. In
                              <span>
                                <a href="#">Maatregelen op Maat<dso-icon icon="external-link"></dso-icon></a
                              ></span>
                              vindt u de maatregelen waarmee u aan deze regels kunt voldoen.
                            </p>
                            <h5>Voorbereiding op uw aanvraag</h5>
                            <p>
                              Houd de informatie bij de hand die te maken heeft met de werkzaamheden 'Bedrijf dat
                              afvalwater zuivert'.
                            </p>
                            ${formButtonsTemplate({
                              buttons: [
                                {
                                  label: "Aanvraag voorbereiden",
                                  icon: { icon: "chevron-right" },
                                  iconMode: "after",
                                  type: "button",
                                  variant: "secondary",
                                },
                              ],
                            })}
                          `,
                        }),
                      },
                      {
                        handleTitle:
                          'Vraag een vergunning aan voor "Zuiveringsvoorziening voor ingezameld of afgegeven afvalwater"',
                        heading: "h4",
                      },
                      {
                        handleTitle: 'Vraag een vergunning aan voor "Bouwactiviteit (technisch)"',
                        heading: "h4",
                      },
                    ],
                  })}
                `,
              },
              {
                title: "Melden en informatie geven",
                flowLine: true,
                content: html`
                  ${accordionTemplate({
                    variant: "neutral",
                    sections: [
                      {
                        handleTitle: 'Geef informatie over "Geluid veroorzaakt door activiteiten"',
                        heading: "h4",
                      },
                      {
                        handleTitle: 'Geef informatie over "Bouwactiviteit (technisch)"',
                        heading: "h4",
                      },
                    ],
                  })}
                `,
              },
              {
                title: "Om rekening mee te houden",
                flowLine: true,
                divider: true,
                content: html`
                  ${accordionTemplate({
                    variant: "neutral",
                    sections: [
                      {
                        handleTitle: "Bedrijf dat afvalwater zuivert",
                        heading: "h4",
                      },
                    ],
                  })}
                `,
              },
              {
                title: "Start de werkzaamheden",
              },
            ],
          })}
        </form>

        ${alertTemplate({
          message: html`<h2>Let op!</h2>
            <p>
              De actielijst wordt niet bewaard. Download daarom de actielijst. Ga daarna door naar "Aanvragen en
              voorbereiden", dan wordt de informatie uit de actielijst meegenomen in uw aanvraag.
            </p>`,
          status: "warning",
        })}
        ${formButtonsTemplate({
          asideButtons: [
            {
              label: "Antwoorden aanpassen",
              variant: "secondary",
              type: "button",
              icon: { icon: "chevron-left" },
            },
          ],
          buttons: [
            {
              label: "Actielijst downloaden",
              variant: "secondary",
              type: "button",
              icon: { icon: "download" },
            },
            {
              label: "Aanvragen en voorbereiden",
              type: "button",
              variant: "primary",
            },
          ],
        })}

        <hr />

        ${richContentTemplate({
          children: html`
            <p>
              <em class="text-muted"
                >De Vergunningcheck is een serviceproduct van de Nederlandse overheid. Het geeft u een algemene indruk
                of er voor uw activiteit een vergunning of melding nodig is. De makers van de Vergunningcheck hebben met
                veel aandacht gewerkt aan de vragen en antwoorden. Toch geeft het resultaat van de Vergunningcheck u
                geen absolute zekerheid. Bijvoorbeeld doordat sommige activiteiten of combinaties van activiteiten (nog)
                niet in de Vergunningcheck staan. Of doordat er nog andere regels zijn waardoor u nog andere
                vergunningen moet aanvragen of andere meldingen moet doen. U kunt daarom geen rechten ontlenen aan deze
                Vergunningcheck. Wilt u zeker weten of en hoe u uw activiteit kunt uitvoeren? Dan raden wij u aan
                contact op te nemen met uw gemeente en/of waterschap.</em
              >
            </p>
          `,
        })}
      </main>
      ${footerPartial(templates)}
    </div>
  `;
});

export { Resultaat };
