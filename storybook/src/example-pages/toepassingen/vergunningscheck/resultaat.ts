import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import { footerPartial } from "../../partials/footer";
import { header } from "../../partials/header.content";
import { AlertType } from "dso-toolkit";

examplePageFactory(
  "Toepassingen/Vergunningscheck",
  "Resultaat",
  (
    {
      applicationHeadingTemplate,
      formButtonsTemplate,
      richContentTemplate,
      actionListTemplate,
      alertTemplate,
      helpcenterPanelTemplate,
    },
    templates
  ) => html`
    <div class="container">
      ${headerPartial(templates, {
        ...header,
        mainMenu: [
          {
            label: "Home",
            url: "#",
          },
          {
            label: "Vergunningscheck",
            url: "#",
            active: true,
          },
          {
            label: "Aanvragen",
            url: "#",
          },
          {
            label: "Regels op de kaart",
            url: "#",
          },
          {
            label: "Mijn Omgevingsloket",
            url: "#",
          },
        ],
      })}
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
                content: html`<button class="dso-secondary">
                  <dso-icon icon="download"></dso-icon>
                  Download de actielijst als PDF
                </button>`,
              },
              {
                title: "Neem contact op met het waterschap en de gemeente",
                flowLine: true,
                content: html`
                  <div class="dso-rich-content">
                    <dso-accordion variant="neutral">
                      <dso-accordion-section
                        handle-title='Waterschap: Wat u moet regelen voor "Wegen en bijbehorende constructies plaatsen of verwijderen waterkering"'
                        heading="h4"
                      >
                        <div class="dso-rich-content">
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
                          <span><dso-icon icon="call"></dso-icon> Telefoon: 0900 9394</span>
                          <span
                            ><dso-icon icon="air"></dso-icon>
                            <a href="#">www.agv.nl <dso-icon icon="external-link"></dso-icon></a
                          ></span>
                          <span
                            ><dso-icon icon="buildings"></dso-icon> Bezoekadres: Korte Ouderkerkerdijk 7, 1096AC
                            Amsterdam</span
                          >
                        </div>
                      </dso-accordion-section>

                      <dso-accordion-section
                        handle-title='Waterschap: Wat u moet regelen voor "Verharding aanbrengen of verwijderen bij oppervlaktewater"'
                        heading="h4"
                      ></dso-accordion-section>

                      <dso-accordion-section
                        handle-title='Gemeente: Wat u moet regelen voor "Verhard oppervlak en stedelijke uitbreiding"'
                        heading="h4"
                      ></dso-accordion-section>
                    </dso-accordion>
                  </div>
                `,
              },
              {
                title: "Vergunning aanvragen",
                flowLine: true,
                content: html`
                  <div class="dso-rich-content">
                    <dso-accordion variant="neutral">
                      <dso-accordion-section
                        open="true"
                        handle-title='Vraag een vergunning aan voor "Afvalwater, afkomstig van een zuiveringsvoorziening voor ingezameld of afgegeven afvalwater, lozen op een oppervlaktelichaam"'
                        heading="h4"
                        ><div class="dso-rich-content">
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
                        </div>
                      </dso-accordion-section>
                      <dso-accordion-section
                        handle-title='Vraag een vergunning aan voor "Zuiveringsvoorziening voor ingezameld of afgegeven afvalwater"'
                        heading="h4"
                      ></dso-accordion-section>
                      <dso-accordion-section
                        handle-title='Vraag een vergunning aan voor "Bouwactiviteit (technisch)"'
                        heading="h4"
                      ></dso-accordion-section>
                    </dso-accordion>
                  </div>
                `,
              },
              {
                title: "Melden en informatie geven",
                flowLine: true,
                content: html`
                  <div class="dso-rich-content">
                    <dso-accordion variant="neutral">
                      <dso-accordion-section
                        handle-title='Geef informatie over "Geluid veroorzaakt door activiteiten"'
                        heading="h4"
                      >
                      </dso-accordion-section>

                      <dso-accordion-section
                        handle-title='Geef informatie over "Bouwactiviteit (technisch)"'
                        heading="h4"
                      ></dso-accordion-section>
                    </dso-accordion>
                  </div>
                `,
              },
              {
                title: "Om rekening mee te houden",
                flowLine: true,
                divider: true,
                content: html`
                  <div class="dso-rich-content">
                    <dso-accordion variant="neutral">
                      <dso-accordion-section
                        handle-title="Bedrijf dat afvalwater zuivert"
                        heading="h4"
                      ></dso-accordion-section>
                    </dso-accordion>
                  </div>
                `,
              },
              {
                title: "Start de werkzaamheden",
              },
            ],
          })}
        </form>

        ${alertTemplate({
          message: html` <h2>Let op!</h2>
            <p>
              De actielijst wordt niet bewaard. Download daarom de actielijst. Ga daarna door naar "Aanvragen en
              voorbereiden", dan wordt de informatie uit de actielijst meegenomen in uw aanvraag.
            </p>`,
          status: AlertType.Warning,
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
            { label: "Aanvragen en voorbereiden", type: "button", variant: "primary" },
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
      ${footerPartial(templates)} ${helpcenterPanelTemplate({ label: "Hulp nodig?", url: "#" })}
    </div>
  `
);
