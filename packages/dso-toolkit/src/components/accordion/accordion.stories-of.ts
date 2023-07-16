import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { AccordionArgs, accordionArgs, accordionArgsMapper, accordionArgTypes } from "./accordion.args.js";
import { Accordion, AccordionSection } from "./accordion.models.js";

export interface AccordionTemplates<TemplateFnReturnType> {
  accordionTemplate: (accordionProperties: Accordion<TemplateFnReturnType>) => TemplateFnReturnType;
  basicSections: AccordionSection<TemplateFnReturnType>[];
  conclusionSections: AccordionSection<TemplateFnReturnType>[];
  compactSections: AccordionSection<TemplateFnReturnType>[];
  neutralSections: AccordionSection<TemplateFnReturnType>[];
  anchorSections: AccordionSection<TemplateFnReturnType>[];
  subSections: AccordionSection<TemplateFnReturnType>[];
  addonsSections: AccordionSection<TemplateFnReturnType>[];
  alignmentSections: AccordionSection<TemplateFnReturnType>[];
}

export function storiesOfAccordion<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AccordionTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Accordion", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: accordionArgTypes,
      args: accordionArgs,
    });

    stories.add(
      "default",
      templateMapper<AccordionArgs>((args, { accordionTemplate, basicSections }) =>
        accordionTemplate(accordionArgsMapper(args, basicSections))
      )
    );

    stories.add(
      "compact",
      templateMapper<AccordionArgs>((args, { accordionTemplate, compactSections }) =>
        accordionTemplate(accordionArgsMapper(args, compactSections))
      ),
      {
        args: {
          variant: "compact",
        },
      }
    );

    stories.add(
      "conclusion",
      templateMapper<AccordionArgs>((args, { accordionTemplate, conclusionSections }) =>
        accordionTemplate(accordionArgsMapper(args, conclusionSections))
      ),
      {
        args: {
          variant: "conclusion",
        },
      }
    );

    stories.add(
      "neutral (core only)",
      templateMapper<AccordionArgs>((args, { accordionTemplate, neutralSections }) =>
        accordionTemplate(accordionArgsMapper(args, neutralSections))
      ),
      {
        args: {
          variant: "neutral",
        },
      }
    );

    stories.add(
      "handle anchors",
      templateMapper<AccordionArgs>((args, { accordionTemplate, anchorSections }) =>
        accordionTemplate(accordionArgsMapper(args, anchorSections))
      )
    );

    stories.add(
      "nested",
      templateMapper<AccordionArgs>((args, { accordionTemplate, subSections }) =>
        accordionTemplate(accordionArgsMapper(args, subSections))
      )
    );

    stories.add(
      "addonsSections",
      templateMapper<AccordionArgs>((args, { accordionTemplate, addonsSections }) =>
        accordionTemplate(accordionArgsMapper(args, addonsSections))
      )
    );

    stories.add(
      "alignmentSections",
      templateMapper<AccordionArgs>((args, { accordionTemplate, alignmentSections }) =>
        accordionTemplate(accordionArgsMapper(args, alignmentSections))
      )
    );

    return stories;
  });
}
