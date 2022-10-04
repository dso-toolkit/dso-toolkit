import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { accordionArgsMapper, accordionArgTypes } from './accordion.args';
import { Accordion, AccordionSection } from './accordion.models';

import * as AccordionContent from './accordion.content';

type AccordionTemplateFnType<TemplateFnReturnType> = (
  properties: Accordion & AccordionSection & { content: string; }
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
        content: AccordionContent.basicSections,
      }
    }
  );

  stories.add(
    'handle anchors',
    template,
    {
      args: {
        content: AccordionContent.anchorSections,
      }
    }
  );

  stories.add(
    'nested',
    template,
    {
      args: {
        content: AccordionContent.subSections,
      }
    }
  );

  stories.add(
    'allowMultiple',
    template,
    {
      args: {
        content: AccordionContent.allowMultipleSections,
        allowMultiple: true,
      }
    }
  );

  stories.add(
    'addons',
    template,
    {
      args: {
        content: AccordionContent.addonsSections,
      }
    }
  );

  stories.add(
    'alignment',
    template,
    {
      args: {
        content: AccordionContent.alignmentSections,
        reverseAlign: true,
      }
    }
  );
}
