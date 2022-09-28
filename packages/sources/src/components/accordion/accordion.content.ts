import { AccordionDemoSection } from './accordion.models';

export const basicSections: AccordionDemoSection[] = [
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
  },
  {
    title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
    heading: 'h2',
  },
  {
    title: 'Hoe lang duurt de Vergunningcheck?',
    heading: 'h2',
    children: `De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle benodigde informatie bij de hand heeft.`,
    open: true
  },
  {
    title: 'Wat kan ik met de uitkomst van de Vergunningcheck?',
    heading: 'h2',
  }
];

export const anchorSections: AccordionDemoSection[] = [
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    handleHref: '#',
  },
  {
    title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
    heading: 'h2',
    handleHref: '#',
  },
  {
    title: 'Hoe lang duurt de Vergunningcheck?',
    heading: 'h2',
    children: `De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle benodigde informatie bij de hand heeft.`,
    open: true,
    handleHref: '#',
  },
  {
    title: 'Wat kan ik met de uitkomst van de Vergunningcheck?',
    heading: 'h2',
    handleHref: '#',
  }
];

export const subSections: AccordionDemoSection[] = [
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    open: true,
    children: `<div class="dso-rich-content">
      <p><strong>hallo</strong> dit is content</p>
    </div>

    <dso-accordion>
      <dso-accordion-section>
        <span slot="section-handle">Voor hoeveel locaties kan ik de Vergunningcheck doen?</span>
        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content</p>
        </div>
      </dso-accordion-section>
      <dso-accordion-section open>
        <span slot="section-handle">Hoe lang duurt de Vergunningcheck?</span>
        <div class="dso-rich-content">De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle benodigde informatie bij de hand heeft.</div>
      </dso-accordion-section>
    </dso-accordion>

    <div class="dso-rich-content">
      <p><strong>hallo</strong> dit is content na de nested section</p>
    </div>`,
    // subsections: [
    //   {
    //     title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
    //     header: 'h3',
    //   },
    //   {
    //     title: 'Hoe lang duurt de Vergunningcheck?',
    //     header: 'h3',
    //     open: true,
    //     children: `De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle benodigde informatie bij de hand heeft.`
    //   }
    // ]
  },
  {
    title: 'Wat kan ik met de uitkomst van de Vergunningcheck?',
    heading: 'h2',
  }
];

export const multiSelectableSections: AccordionDemoSection[] = [
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    open: true,
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
  },
  {
    title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
    heading: 'h2',
    open: true,
    children: `De Vergunningcheck is bedoeld voor één locatie tegelijk. Wilt u dezelfde werkzaamheid op meerdere locaties doen? Dan is het verstandig om voor al deze locaties apart de Vergunningcheck te doen..`
  }
];

export const addonsSections: AccordionDemoSection[] = [
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    icon: 'user-line',
  },
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    state: 'danger',
    icon: 'user-line',
    open: true,
  },
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    state: 'danger',
    status: '5 van 8 beantwoord',
  },
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    state: 'danger',
    status: '5 van 8 beantwoord',
    open: true,
  },
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    attachmentCount: 2,
  },
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
      <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
    attachmentCount: 2,
    open: true,
  }
];

export const alignmentSections: AccordionDemoSection[] = [
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    icon: 'user-line'
  },
  {
    title: 'Is het verplicht om de Vergunningcheck te doen?',
    heading: 'h2',
    icon: 'user-line',
    open: true,
    children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
              <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`
  }
];
