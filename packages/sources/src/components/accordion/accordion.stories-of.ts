import { Args } from '@storybook/addons';

import { createStories, StorybookParameters } from '../../storybook';
import { AccordionArgs, accordionArgTypes } from './accordion.args';
import { Accordion, AccordionDemoSection } from './accordion.models';

import * as AccordionContent from './accordion.content';

type AccordionTemplateFnType<TemplateFnReturnType> = (
  properties: Accordion,
  sections: AccordionDemoSection[],
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

  stories.add(
    'default',
    (a: Args) => accordionTemplate(a as AccordionArgs, AccordionContent.basicSections),
    {
      args: {
      }
    }
  );

  stories.add(
    'handle anchors',
    (a: Args) => accordionTemplate(a as AccordionArgs, AccordionContent.anchorSections),
    {
      args: {
      }
    }
  );

  stories.add(
    'nested',
    (a: Args) => accordionTemplate(a as AccordionArgs, AccordionContent.subSections),
    {
      args: {
      }
    }
  );

  stories.add(
    'multiSelectable',
    (a: Args) => accordionTemplate(a as AccordionArgs, AccordionContent.multiSelectableSections),
    {
      args: {
        multiSelectable: true,
      }
    }
  );

  stories.add(
    'addons',
    (a: Args) => accordionTemplate(a as AccordionArgs, AccordionContent.addonsSections),
    {
      args: {
      }
    }
  );

  stories.add(
    'alignment',
    (a: Args) => accordionTemplate(a as AccordionArgs, AccordionContent.alignmentSections),
    {
      args: {
        reverseAlign: true,
      }
    }
  );
}
