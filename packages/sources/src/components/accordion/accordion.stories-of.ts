import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { accordionArgsMapper, accordionArgTypes } from './accordion.args';
import * as AccordionContent from './accordion.content';
import { Accordion } from './accordion.models';

type AccordionTemplateFnType<TemplateFnReturnType> = (
  properties: Accordion
) => TemplateFnReturnType;

export interface AccordionParameters<TemplateFnReturnType> {
  accordionTemplate: AccordionTemplateFnType<TemplateFnReturnType>;
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
}
