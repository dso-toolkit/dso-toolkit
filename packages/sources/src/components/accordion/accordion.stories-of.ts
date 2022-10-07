import { storiesOfFactory } from '../../storybook/stories-of-factory';
import { AccordionArgs, accordionArgsMapper, accordionArgTypes } from './accordion.args';
import * as AccordionContent from './accordion.content';
import { Accordion } from './accordion.models';

type AccordionTemplateFnType<TemplateFnReturnType> = (
  properties: Accordion
) => TemplateFnReturnType;

export interface AccordionTemplates<TemplateFnReturnType> {
  accordionTemplate: AccordionTemplateFnType<TemplateFnReturnType>;
}

export const storiesOfAccordion = storiesOfFactory<AccordionTemplates<any>, AccordionArgs>('Accordion', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: accordionArgTypes
    });

  const template = templateMapper((args, { accordionTemplate }) => accordionTemplate(accordionArgsMapper(args)));

  stories.add(
    'default',
    template,
    {
      args: {
        sections: AccordionContent.basicSections,
      }
    }
  );

  stories.add(
    'handle anchors',
    template,
    {
      args: {
        sections: AccordionContent.anchorSections,
      }
    }
  );

  stories.add(
    'nested',
    template,
    {
      args: {
        sections: AccordionContent.subSections,
      }
    }
  );

  stories.add(
    'allowMultipleOpen',
    template,
    {
      args: {
        sections: AccordionContent.allowMultipleOpenSections,
        allowMultipleOpen: true,
      }
    }
  );

  stories.add(
    'addons',
    template,
    {
      args: {
        sections: AccordionContent.addonsSections,
      }
    }
  );

  stories.add(
    'alignment',
    template,
    {
      args: {
        sections: AccordionContent.alignmentSections,
        reverseAlign: true,
      }
    }
  );
})

// export function storiesOfAccordion<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     accordionTemplate
//   }: AccordionParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Accordion', parameters, accordionArgTypes);
//   const template = bindTemplate(accordionArgsMapper, accordionTemplate);


// }
