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
          }
        ]
      }
    }
  );
}
