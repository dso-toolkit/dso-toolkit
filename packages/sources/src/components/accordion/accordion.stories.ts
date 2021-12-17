import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { accordionArgsMapper, accordionArgTypes } from './accordion.args';
import { Accordion } from './accordion.models';

export interface AccordionParameters<TemplateFnReturnType> {
  accordionTemplate: (accordionProperties: Accordion) => TemplateFnReturnType;
}

export function storiesOfAccordion<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    accordionTemplate
  }: AccordionParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(accordionArgsMapper, accordionTemplate);

  const stories = storiesOf('Accordion', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      args: {
        variant: 'default'
      },
      argTypes: accordionArgTypes
    });

  stories.add(
    'default',
    template,
    {
      args: {
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2',
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`,
            open: true
          },
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2'
          }
        ]
      }
    }
  );

  stories.add(
    'nested',
    template,
    {
      args: {
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-nested-1',
            header: 'h2',
            open: true,
            sections: [
              {
                title: 'Sectie titel',
                id: 'accordion-nested-1-1',
                header: 'h2'
              },
              {
                title: 'Sectie titel',
                id: 'accordion-nested-1-2',
                header: 'h2',
                open: true,
                richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
              }
            ]
          },
          {
            title: 'Sectie titel',
            id: 'accordion-nested-2',
            header: 'h2'
          }
        ]
      }
    }
  );

  stories.add(
    'multiselectable',
    template,
    {
      args: {
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-multiselect-1',
            header: 'h2',
            open: true,
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
          },
          {
            title: 'Sectie titel',
            id: 'accordion-multiselect-2',
            header: 'h2',
            open: true,
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
          }
        ]
      }
    }
  );

  stories.add(
    'addons',
    template,
    {
      args: {
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            icon: 'user-line'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            icon: 'user-line',
            open: true
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            state: 'danger',
            status: '5 van 8 beantwoord'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            state: 'danger',
            status: '5 van 8 beantwoord',
            open: true
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            attachments: 2
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            attachments: 2,
            open: true
          }
        ]
      }
    }
  );

  stories.add(
    'alignment',
    template,
    {
      args: {
        reverseAlign: true,
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-alignment-1',
            header: 'h2',
            icon: 'user-line'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-alignment-2',
            header: 'h2',
            icon: 'user-line',
            open: true,
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
          }
        ]
      }
    }
  );
}
