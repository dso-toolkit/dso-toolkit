import { AccordionSection } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { getAnimatedFormContent } from "../../example-pages/Patronen/animated-form.content";
import { Templates } from "../../templates";

const section1: AccordionSection<TemplateResult> = {
  handleTitle: "Is het verplicht om de Vergunningcheck te doen?",
  heading: "h2",
  content: html`<p>
      Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig
      heeft of melding moet doen.
    </p>
    <p>
      Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt
      dan meegenomen in de aanvraag of melding.
    </p>`,
};

const section2: AccordionSection<TemplateResult> = {
  handleTitle: "Voor hoeveel locaties kan ik de Vergunningcheck doen?",
  heading: "h2",
  content: html`<div class="dso-rich-content">
    <h5>Toelichting</h5>
    <p>
      Er is aanvullende informatie nodig om te kunnen bepalen wat u moet doen volgens de regels van de gemeente, het
      waterschap, de provincie en het Rijk. Mogelijk moet u voorafgaand aan uw werkzaamheden een vergunning aanvragen,
      melding doen of informatie geven.
    </p>
    <h5>Voorbereiding</h5>
    <p>
      Neem contact op met de gemeente en het waterschap. Zij helpen u verder. Houd de informatie bij de hand die te
      maken heeft met 'Bouwwerk of deel van een bouwwerk slopen, of asbest verwijderen'.
    </p>
  </div>`,
};

const section3: AccordionSection<TemplateResult> = {
  handleTitle: "Hoe lang duurt de Vergunningcheck?",
  heading: "h2",
  content: html`De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u
  alle benodigde informatie bij de hand heeft.`,
};

function section4({ richContentTemplate }: Templates): AccordionSection<TemplateResult> {
  return {
    handleTitle: "Wat kan ik met de uitkomst van de Vergunningcheck?",
    heading: "h2",
    content: richContentTemplate({
      children: html`
        <ul>
          <li>Locatie 1</li>
          <li>
            Locatie 2
            <div class="dso-info">
              ${richContentTemplate({
                children: html`<p><strong>Let op:</strong> <i>voorbehoud A bij Locatie 2.</i></p>`,
              })}
            </div>
          </li>
          <li>
            Locatie 3
            <ul>
              <li>Locatie 3.1</li>
              <li>Locatie 3.2</li>
            </ul>
          </li>
        </ul>
      `,
    }),
  };
}

export function basicSections(templates: Templates): AccordionSection<TemplateResult>[] {
  return [
    section1,
    section2,
    {
      ...section3,
      open: true,
    },
    section4(templates),
  ];
}

export function anchorSections(templates: Templates): AccordionSection<TemplateResult>[] {
  return [
    {
      ...section1,
      handleUrl: "#",
    },
    {
      ...section2,
      handleUrl: "#",
    },
    {
      ...section3,
      handleUrl: "#",
      open: true,
    },
    {
      ...section4(templates),
      handleUrl: "#",
    },
  ];
}

export function nestedSections(templates: Templates): AccordionSection<TemplateResult>[] {
  const { accordionTemplate, richContentTemplate } = templates;

  return [
    section1,
    {
      ...section2,
      content: html`${richContentTemplate({ children: html`<p><strong>hallo</strong> dit is content</p>` })}
      ${accordionTemplate({
        sections: [
          {
            handleTitle: "(Genest) Voor hoeveel locaties kan ik de Vergunningcheck doen?",
            heading: "h4",
            content: richContentTemplate({
              children: html` <p><strong>hallo</strong> dit is content</p> `,
            }),
          },
          {
            handleTitle: "(Genest) Hoe lang duurt de Vergunningcheck?",
            heading: "h4",
            open: true,
            content: richContentTemplate({
              children: html`
                De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u
                alle benodigde informatie bij de hand heeft.
              `,
            }),
          },
        ],
      })}
      ${richContentTemplate({ children: html` <p><strong>hallo</strong> dit is content na de nested section</p> ` })}`,
    },
    section3,
    section4(templates),
  ];
}

export const addonsSections: AccordionSection<TemplateResult>[] = [
  {
    ...section1,
    icon: "user-outline",
  },
  {
    ...section1,
    status: "danger",
    icon: "user-outline",
    open: true,
  },
  {
    ...section1,
    status: "danger",
    statusDescription: "5 van 8 beantwoord",
  },
  {
    ...section1,
    status: "danger",
    statusDescription: "5 van 8 beantwoord",
  },
  {
    ...section1,
    attachmentCount: 2,
  },
  {
    ...section1,
    attachmentCount: 2,
  },
];

export const alignmentSections: AccordionSection<TemplateResult>[] = [
  {
    ...section1,
    icon: "user-outline",
    open: true,
  },
  {
    ...section2,
    icon: "user-outline",
  },
  {
    ...section3,
    icon: "user-outline",
  },
];

export const renvooiSections: AccordionSection<TemplateResult>[] = [
  {
    ...section1,
  },
  {
    ...section1,
    wijzigactie: "verwijder",
  },
  {
    ...section1,
    wijzigactie: "voegtoe",
    open: true,
  },
  {
    ...section1,
    handleTitle: {
      was: "Voor hoeveel locaties kan ik de Vergunningcheck doen?",
      wordt: "Voor hoeveel locaties mag ik de Vergunningcheck doen?",
    },
  },
  {
    ...section1,
    handleTitle: [
      {
        was: "Voor hoeveel locaties kan ik de Vergunningcheck doen?",
        wordt: "Voor hoeveel locaties mag ik de Vergunningcheck doen?",
      },
      " - ",
      { toegevoegd: "Zit er een limiet aan Vergunningchecks?" },
    ],
  },
];

export const activatableSections: AccordionSection<TemplateResult>[] = [
  {
    ...section1,
    activatable: true,
  },
  {
    ...section1,
    wijzigactie: "verwijder",
    activatable: true,
    active: true,
  },
  {
    ...section1,
    wijzigactie: "voegtoe",
    open: true,
    activatable: true,
  },
  {
    ...section1,
    handleTitle: {
      was: "Voor hoeveel locaties kan ik de Vergunningcheck doen?",
      wordt: "Voor hoeveel locaties mag ik de Vergunningcheck doen?",
    },
    activatable: true,
  },
  {
    ...section1,
    handleTitle: [
      {
        was: "Voor hoeveel locaties kan ik de Vergunningcheck doen?",
        wordt: "Voor hoeveel locaties mag ik de Vergunningcheck doen?",
      },
      " - ",
      { toegevoegd: "Zit er een limiet aan Vergunningchecks?" },
    ],
    activatable: true,
  },
];

export function animatedFormGroupSections(templates: Templates): AccordionSection<TemplateResult>[] {
  const content = getAnimatedFormContent(templates);

  return [
    section1,
    {
      handleTitle: "Wie zijn er bij dit project betrokken?",
      heading: "h2",
      content,
    },
    section3,
    section4(templates),
  ];
}
