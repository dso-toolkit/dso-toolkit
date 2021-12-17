import { bindTemplate, componentArgs, StorybookParameters } from '../../stories-helpers';

import { AccordionArgs, accordionArgsMapper, accordionArgTypes } from './accordion.args';
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
      argTypes: accordionArgTypes,
      args: componentArgs<Pick<AccordionArgs, 'variant'>>({
        variant: 'default'
      }),
    });

  stories.add(
    'default',
    template,
    {
      args: componentArgs<AccordionArgs>({
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2',
            type: 'link'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2',
            type: 'link'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2',
            type: 'link',
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`,
            open: true
          },
          {
            title: 'Sectie titel',
            id: 'accordion-default-1',
            header: 'h2',
            type: 'link'
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
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-nested-1',
            header: 'h2',
            type: 'link',
            open: true,
            subsections: [
              {
                title: 'Sectie titel',
                id: 'accordion-nested-1-1',
                header: 'h2',
                type: 'link'
              },
              {
                title: 'Sectie titel',
                id: 'accordion-nested-1-2',
                header: 'h2',
                type: 'link',
                open: true,
                richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
              }
            ]
          },
          {
            title: 'Sectie titel',
            id: 'accordion-nested-2',
            header: 'h2',
            type: 'link'
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
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-multiselect-1',
            header: 'h2',
            type: 'link',
            open: true,
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`,
            subsections: []
          },
          {
            title: 'Sectie titel',
            id: 'accordion-multiselect-2',
            header: 'h2',
            type: 'link',
            open: true,
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
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
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            type: 'link',
            icon: 'user-line'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            type: 'link',
            icon: 'user-line',
            open: true
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            type: 'link',
            state: 'danger',
            status: '5 van 8 beantwoord'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            type: 'link',
            state: 'danger',
            status: '5 van 8 beantwoord',
            open: true
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            type: 'link',
            attachments: 2
          },
          {
            title: 'Sectie titel',
            id: 'accordion-addon-1',
            header: 'h2',
            type: 'link',
            attachments: 2,
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
        sections: [
          {
            title: 'Sectie titel',
            id: 'accordion-alignment-1',
            header: 'h2',
            type: 'link',
            icon: 'user-line'
          },
          {
            title: 'Sectie titel',
            id: 'accordion-alignment-2',
            header: 'h2',
            type: 'link',
            icon: 'user-line',
            open: true,
            richContent: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
          }
        ]
      })
    }
  );
}
