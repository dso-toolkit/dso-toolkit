import { ActionListItem } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { Templates } from "../../templates";
import { content as contactInformationContent } from "dso-toolkit/dist/components/contact-information/contact-information.content";

function item1({ buttonTemplate }: Templates): ActionListItem<TemplateResult> {
  return {
    flowLine: true,
    content: buttonTemplate({
      variant: "secondary",
      label: "Download de actielijst als PDF",
      icon: { icon: "download" },
    }),
  };
}

function item2({
  accordionTemplate,
  contactInformationTemplate,
  richContentTemplate,
}: Templates): ActionListItem<TemplateResult> {
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
                ${contactInformationTemplate(contactInformationContent())}
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

function item3({ accordionTemplate, richContentTemplate }: Templates): ActionListItem<TemplateResult> {
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

function item4({ accordionTemplate, richContentTemplate }: Templates): ActionListItem<TemplateResult> {
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

function item5({ accordionTemplate, richContentTemplate }: Templates, flowLine = true): ActionListItem<TemplateResult> {
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

const item6: ActionListItem<TemplateResult> = {
  title: "Start de werkzaamheden",
};

function warning({ richContentTemplate }: Templates): ActionListItem<TemplateResult> {
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

export function actionListItems(templates: Templates): ActionListItem<TemplateResult>[] {
  return [item1(templates), item2(templates), item3(templates), item4(templates), item5(templates), item6];
}

export function actionListWithWarningItems(templates: Templates): ActionListItem<TemplateResult>[] {
  return [
    item1(templates),
    item2(templates),
    item3(templates),
    item4(templates),
    item5(templates, false),
    warning(templates),
  ];
}
