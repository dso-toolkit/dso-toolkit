import { TemplateResult, html } from "lit-html";

import { accordionTemplate } from "../accordion/accordion.template.js";
import { buttonTemplate } from "../button/button.template.js";
import { contactInformationContent } from "../contact-information/contact-information.content.js";
import { contactInformationTemplate } from "../contact-information/contact-information.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { ActionListItem } from "./action-list.models.js";

function item1(): ActionListItem<TemplateResult> {
  return {
    flowLine: true,
    content: buttonTemplate({
      variant: "secondary",
      label: "Download de actielijst als PDF",
      icon: { icon: "download" },
    }),
  };
}

function item2(): ActionListItem<TemplateResult> {
  return {
    title: "Neem contact op met het waterschap en de gemeente",
    flowLine: true,
    content: richContentTemplate({
      children: accordionTemplate({
        variant: "neutral",
        sections: [
          {
            handleTitle:
              'Waterschap: Wat u moet regelen voor "Wegen en bijbehorende constructies plaatsen of verwijderen waterkering"',
            heading: "h4",
            open: true,
            content: richContentTemplate({
              children: html`
                <h5>Algemene toelichting</h5>
                <p>
                  Het waterschap heeft aanvullende informatie nodig om met zekerheid te kunnen zeggen wat u moet
                  regelen. Mogelijk moet u voorafgaand aan uw werkzaamheden een vergunning aanvragen, melding doen of
                  informatie geven.
                </p>
                <h5>Voorbereiding</h5>
                <p>
                  Houd de informatie bij de hand die te maken heeft met de werkzaamheden "Verharding aanbrengen of
                  vervangen".
                </p>
                ${contactInformationTemplate({
                  ...contactInformationContent,
                  heading: {
                    level: 4,
                    children: "Gemeente Utrecht",
                  },
                })}
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
      }),
    }),
  };
}

function item3(): ActionListItem<TemplateResult> {
  return {
    title: "Vergunningen aanvragen",
    flowLine: true,
    content: richContentTemplate({
      children: accordionTemplate({
        variant: "neutral",
        sections: [
          {
            handleTitle:
              'Vraag een vergunning aan voor "Een bouwwerk of ander werk aanbrengen, wijzigen of verwijderen"',
            heading: "h4",
          },
          {
            handleTitle:
              'Vraag een vergunning aan voor "Tank, drukvat, explosiegevaarlijke stof of installatie plaatsen"',
            heading: "h4",
          },
        ],
      }),
    }),
  };
}

function item4(): ActionListItem<TemplateResult> {
  return {
    title: "Meldingen en informatie voorbereiden",
    flowLine: true,
    content: richContentTemplate({
      children: accordionTemplate({
        variant: "neutral",
        sections: [
          {
            handleTitle:
              'Doe een melding voor "Kleine en middelgrote stookinstallatie voor standaard brandstoffen (minder dan 50MW)"',
            heading: "h4",
          },
          {
            handleTitle: 'Doe een melding voor "Opslaan van propaan of propeen in opslagtanks"',
            heading: "h4",
          },
          {
            handleTitle: 'Doe een melding voor "Bouwwerk brandveilig gebruiken"',
            heading: "h4",
          },
          {
            handleTitle:
              'Geef informatie over "Kleine en middelgrote stookinstallatie voor standaard brandstoffen (minder dan 50MW)"',
            heading: "h4",
          },
          {
            handleTitle: 'Geef informatie over "Lozen bij niet industriële voedselbereiding"',
            heading: "h4",
          },
          {
            handleTitle: 'Geef informatie over "Voedsel bereiden, geen voedingsmiddelenindustrie"',
            heading: "h4",
          },
        ],
      }),
    }),
  };
}

function item5(flowLine = true): ActionListItem<TemplateResult> {
  return {
    title: "Om rekening mee te houden",
    flowLine,
    divider: true,
    content: richContentTemplate({
      children: accordionTemplate({
        variant: "neutral",
        sections: [
          {
            handleTitle: "Horecabedrijf",
            heading: "h4",
          },
          {
            handleTitle: "Aanbouw, uitbouw of bijgebouw bouwen of vervangen",
            heading: "h4",
          },
          {
            handleTitle: "Gas opslaan in een opslagtank",
            heading: "h4",
          },
        ],
      }),
    }),
  };
}

function item6(flowLine = true): ActionListItem<TemplateResult> {
  return {
    title: "Start de werkzaamheden",
    flowLine,
    content: richContentTemplate({
      children: html`
        <h2>Heeft u vragen?</h2>
        ${accordionTemplate({
          variant: "neutral",
          sections: [
            {
              handleTitle: "Contactinformatie gemeente Utrecht",
              heading: "h3",
              open: true,
              content: html`
                ${contactInformationTemplate({
                  ...contactInformationContent,
                  heading: {
                    level: 4,
                    children: "Gemeente Utrecht",
                  },
                })}
                ${contactInformationTemplate({ ...contactInformationContent })}
              `,
            },
            {
              handleTitle: "Contactinformatie waterschap Amstel, Gooi en Vecht",
              heading: "h3",
            },
          ],
        })}
      `,
    }),
  };
}

function warning(): ActionListItem<TemplateResult> {
  return {
    title: "Let op",
    warning: true,
    content: richContentTemplate({
      children: html`<p>
        Deze actielijst is niet compleet. Mogelijk moet u meer of andere zaken regelen voordat u daadwerkelijk met de
        werkzaamheden mag starten. <a href="#">Ga terug naar de vorige stap</a> en beantwoord openstaande vragen.
      </p>`,
    }),
  };
}

export const actionListItems: ActionListItem<TemplateResult>[] = [
  item1(),
  item2(),
  item3(),
  item4(),
  item5(),
  item6(false),
];

export const actionListWithWarningItems: ActionListItem<TemplateResult>[] = [
  item1(),
  item2(),
  item3(),
  item4(),
  item5(false),
  warning(),
];
