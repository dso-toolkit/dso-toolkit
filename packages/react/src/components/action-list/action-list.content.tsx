import { ActionListItem, contactInformationContent } from "dso-toolkit";
import React from "react";

import { Templates } from "../../templates";

function item1({ iconTemplate }: Templates): ActionListItem<JSX.Element> {
  return {
    flowLine: true,
    content: (
      <button className="dso-secondary">
        {iconTemplate({ icon: "download" })}
        Download de actielijst als PDF
      </button>
    ),
  };
}

function item2({ accordionTemplate, contactInformationTemplate }: Templates): ActionListItem<JSX.Element> {
  return {
    title: "Neem contact op met het waterschap en de gemeente",
    flowLine: true,
    content: (
      <div className="dso-rich-content">
        {accordionTemplate({
          variant: "neutral",
          sections: [
            {
              handleTitle:
                'Waterschap: Wat u moet regelen voor "Wegen en bijbehorende constructies plaatsen of verwijderen waterkering"',
              heading: "h4",
              open: true,
              content: (
                <div className="dso-rich-content">
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
                  {contactInformationTemplate({
                    ...contactInformationContent,
                    heading: {
                      level: 4,
                      children: "Gemeente Utrecht",
                    },
                  })}
                </div>
              ),
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
      </div>
    ),
  };
}

function item3({ accordionTemplate }: Templates): ActionListItem<JSX.Element> {
  return {
    title: "Vergunningen aanvragen",
    flowLine: true,
    content: (
      <div className="dso-rich-content">
        {accordionTemplate({
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
        })}
      </div>
    ),
  };
}

function item4({ accordionTemplate }: Templates): ActionListItem<JSX.Element> {
  return {
    title: "Meldingen en informatie voorbereiden",
    flowLine: true,
    content: (
      <div className="dso-rich-content">
        {accordionTemplate({
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
        })}
      </div>
    ),
  };
}

function item5({ accordionTemplate }: Templates, flowLine = true): ActionListItem<JSX.Element> {
  return {
    title: "Om rekening mee te houden",
    flowLine,
    divider: true,
    content: (
      <div className="dso-rich-content">
        {accordionTemplate({
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
        })}
      </div>
    ),
  };
}

const item6: ActionListItem<JSX.Element> = {
  title: "Start de werkzaamheden",
};

const warning: ActionListItem<JSX.Element> = {
  title: "Let op",
  warning: true,
  content: (
    <div className="dso-rich-content">
      <p>
        Deze actielijst is niet compleet. Mogelijk moet u meer of andere zaken regelen voordat u daadwerkelijk met de
        werkzaamheden mag starten. <a href="#">Ga terug naar de vorige stap</a> en beantwoord openstaande vragen.
      </p>
    </div>
  ),
};

export function actionListItems(templates: Templates): ActionListItem<JSX.Element>[] {
  return [item1(templates), item2(templates), item3(templates), item4(templates), item5(templates), item6];
}

export function actionListWithWarningItems(templates: Templates): ActionListItem<JSX.Element>[] {
  return [item1(templates), item2(templates), item3(templates), item4(templates), item5(templates, false), warning];
}
