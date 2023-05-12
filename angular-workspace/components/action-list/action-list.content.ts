import { ActionListItem } from "dso-toolkit";

import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

const item1: ActionListItem<StoryFnAngularReturnType> = {
  content: {
    template: `
      <button class="dso-secondary">
        <dso-icon icon="download"></dso-icon>
        Download de actielijst als PDF
      </button>`,
  },
};

const item2: ActionListItem<StoryFnAngularReturnType> = {
  title: "Neem contact op met het waterschap en de gemeente",
  content: {
    template: `
        <dso-accordion>
          <dso-accordion-section
            open="true"
            handle-title='Waterschap: Wat u moet regelen voor "Wegen en bijbehorende constructies plaatsen of verwijderen waterkering"'
            heading="h4"
          >
            <div class="dso-rich-content">
              <h5>Algemene toelichting</h5>
              <p>
                Het waterschap heeft aanvullende informatie nodig om met zekerheid te kunnen zeggen wat u moet regelen.
                Mogelijk moet u voorafgaand aan uw werkzaamheden een vergunning aanvragen, melding doen of informatie
                geven.
              </p>
              <h5>Voorbereiding</h5>
              <p>
                Houd de informatie bij de hand die te maken heeft met de werkzaamheden "Verharding aanbrengen of
                vervangen".
              </p>
              <h5>Contactinfromatie Waterschap Amstel, Gooi en Vecht</h5>
              <span><dso-icon icon="call"></dso-icon> Telefoon: 0900 9394</span>
              <span><dso-icon icon="air"></dso-icon> <a href="#">www.agv.nl <dso-icon icon="external-link"></dso-icon></a></span
              >
              <span><dso-icon icon="buildings"></dso-icon> Bezoekadres: Korte Ouderkerkerdijk 7, 1096AC Amsterdam</span>
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
      `,
  },
};

const item3: ActionListItem<StoryFnAngularReturnType> = {
  title: "Vergunningen aanvragen",
  content: {
    template: `
          <dso-accordion>
            <dso-accordion-section
              handle-title='Vraag een vergunning aan voor "Een bouwwerk of ander werk aanbrengen, wijzigen of verwijderen"'
              heading="h4"
            ></dso-accordion-section>

            <dso-accordion-section
              handle-title='Vraag een vergunning aan voor "Tank, drukvat, explosiegevaarlijke stof of installatie plaatsen"'
              heading="h4"
            ></dso-accordion-section>
          </dso-accordion>
        `,
  },
};

const item4: ActionListItem<StoryFnAngularReturnType> = {
  title: "Meldingen en informatie voorbereiden",
  content: {
    template: `
      <dso-accordion>
        <dso-accordion-section
          handle-title='Doe een melding voor "Kleine en middelgrote stookinstallatie voor standaard brandstoffen (minder dan 50MW)"'
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title='Doe een melding voor "Opslaan van propaan of propeen in opslagtanks"'
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title='Doe een melding voor "Bouwwerk brandveilig gebruiken"'
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title='Geef informatie over "Kleine en middelgrote stookinstallatie voor standaard brandstoffen (minder dan 50MW)"'
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title='Geef informatie over "Lozen bij niet industriële voedselbereiding"'
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title='Geef informatie over "Voedsel bereiden, geen voedingsmiddelenindustrie"'
          heading="h4"
        ></dso-accordion-section>
      </dso-accordion>
    `,
  },
};

const item5: ActionListItem<StoryFnAngularReturnType> = {
  title: "Om rekening mee te houden",
  divider: true,
  content: {
    template: `
      <dso-accordion>
        <dso-accordion-section
          handle-title="Horecabedrijf"
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title="Aanbouw, uitbouw of bijgebouw bouwen of vervangen"
          heading="h4"
        ></dso-accordion-section>

        <dso-accordion-section
          handle-title="Gas opslaan in een opslagtank"
          heading="h4"
        ></dso-accordion-section>
      </dso-accordion>
    `,
  },
};

const item6: ActionListItem<StoryFnAngularReturnType> = {
  title: "Start de werkzaamheden",
};

const warning: ActionListItem<StoryFnAngularReturnType> = {
  title: "Let op",
  warning: true,
  content: {
    template: `
        <div class="dso-rich-content">
        <p>
          Deze actielijst is niet compleet. Mogelijk moet u meer of andere zaken regelen voordat u daadwerkelijk met de
          werkzaamheden mag starten. <a href="#">Ga terug naar de vorige stap</a> en beantwoord openstaande vragen.
        </p>
        </div>
      `,
  },
};

export const actionListItems: ActionListItem<StoryFnAngularReturnType>[] = [item1, item2, item3, item4, item5, item6];

export const actionListWithWarningItems: ActionListItem<StoryFnAngularReturnType>[] = [
  item1,
  item2,
  item3,
  item4,
  item5,
  warning,
];
