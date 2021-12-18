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
            header: 'h2',
            handleType: 'anchor'
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor'
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            children: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`,
            open: true
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor'
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
            header: 'h2',
            handleType: 'anchor',
            open: true,
            subsections: [
              {
                title: 'Sectie titel',
                header: 'h2',
                handleType: 'anchor'
              },
              {
                title: 'Sectie titel',
                header: 'h2',
                handleType: 'anchor',
                open: true,
                children: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
              }
            ]
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor'
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
            header: 'h2',
            handleType: 'anchor',
            open: true,
            children: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`,
            subsections: []
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            open: true,
            children: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
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
            header: 'h2',
            handleType: 'anchor',
            icon: {
              icon: 'user-line'
            }
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            icon: {
              icon: 'user-line'
            },
            open: true
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            state: 'danger',
            status: '5 van 8 beantwoord'
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            state: 'danger',
            status: '5 van 8 beantwoord',
            open: true
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            attachmentsCounter: {
              count: 2
            }
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
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
        sections: [
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            icon: {
              icon: 'user-line'
            }
          },
          {
            title: 'Sectie titel',
            header: 'h2',
            handleType: 'anchor',
            icon: {
              icon: 'user-line'
            },
            open: true,
            children: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.`
          }
        ]
      })
    }
  );
}
