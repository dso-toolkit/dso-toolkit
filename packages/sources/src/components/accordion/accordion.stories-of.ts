import { bindTemplate, componentArgs, createStories, StorybookParameters } from '../../storybook';

import { AccordionArgs, accordionArgsMapper, accordionArgTypes } from './accordion.args';
import { Accordion } from './accordion.models';

export interface AccordionParameters<TemplateFnReturnType> {
  accordionTemplate: (accordionProperties: Accordion) => TemplateFnReturnType;
}

export function storiesOfAccordion<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    accordionTemplate
  }: AccordionParameters<TemplateFnReturnType>
) {
  const stories = createStories('Accordion', parameters, accordionArgTypes);
  const template = bindTemplate(accordionArgsMapper, accordionTemplate);

  stories.add(
    'default',
    template,
    {
      args: componentArgs<AccordionArgs>({
        handleElement: 'anchor',
        sections: [
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
          },
          {
            title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
            header: 'h2',
          },
          {
            title: 'Hoe lang duurt de Vergunningcheck?',
            header: 'h2',
            children: `De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle benodigde informatie bij de hand heeft.`,
            open: true
          },
          {
            title: 'Wat kan ik met de uitkomst van de Vergunningcheck?',
            header: 'h2',
          }
        ]
      })
    }
  );

  stories.add(
    'nested',
    template,
    {
      args: componentArgs<AccordionArgs>({
        handleElement: 'anchor',
        sections: [
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            open: true,
            subsections: [
              {
                title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
                header: 'h3',
              },
              {
                title: 'Hoe lang duurt de Vergunningcheck?',
                header: 'h3',
                open: true,
                children: `De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle benodigde informatie bij de hand heeft.`
              }
            ]
          },
          {
            title: 'Wat kan ik met de uitkomst van de Vergunningcheck?',
            header: 'h2',
          }
        ]
      })
    }
  );

  stories.add(
    'multiselectable',
    template,
    {
      args: componentArgs<AccordionArgs>({
        handleElement: 'anchor',
        sections: [
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            open: true,
            children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
              <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`,
            subsections: []
          },
          {
            title: 'Voor hoeveel locaties kan ik de Vergunningcheck doen?',
            header: 'h2',
            open: true,
            children: `De Vergunningcheck is bedoeld voor één locatie tegelijk. Wilt u dezelfde werkzaamheid op meerdere locaties doen? Dan is het verstandig om voor al deze locaties apart de Vergunningcheck te doen..`
          }
        ]
      })
    }
  );

  stories.add(
    'addons',
    template,
    {
      args: componentArgs<AccordionArgs>({
        handleElement: 'anchor',
        sections: [
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            icon: {
              icon: 'user-line'
            }
          },
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            icon: {
              icon: 'user-line'
            },
            open: true
          },
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            state: 'danger',
            status: '5 van 8 beantwoord'
          },
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            state: 'danger',
            status: '5 van 8 beantwoord',
            open: true
          },
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            attachmentsCounter: {
              count: 2
            }
          },
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            attachmentsCounter: {
              count: 2
            },
            open: true
          }
        ]
      })
    }
  );

  stories.add(
    'alignment',
    template,
    {
      args: componentArgs<AccordionArgs>({
        reverseAlign: true,
        handleElement: 'anchor',
        sections: [
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            icon: {
              icon: 'user-line'
            }
          },
          {
            title: 'Is het verplicht om de Vergunningcheck te doen?',
            header: 'h2',
            icon: {
              icon: 'user-line'
            },
            open: true,
            children: `<p>Nee, de Vergunningcheck is niet verplicht. Het is een hulpmiddel waarmee u kunt zien of u een vergunning nodig heeft of melding moet doen.</p>
              <p>Wel kunt u meteen na de check een aanvraag of melding starten. Een aantal gegevens uit de Vergunningcheck wordt dan meegenomen in de aanvraag of melding.</p>`
          }
        ]
      })
    }
  );
}
