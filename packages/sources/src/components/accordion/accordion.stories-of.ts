import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { AccordionArgs, accordionArgsMapper, accordionArgTypes } from "./accordion.args";
import * as AccordionContent from "./accordion.content";
import { Accordion } from "./accordion.models";

export interface AccordionTemplates<TemplateFnReturnType> {
  accordionTemplate: (accordionProperties: Accordion) => TemplateFnReturnType;
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
    });

    const template = templateMapper<AccordionArgs>((args, { accordionTemplate }) =>
      accordionTemplate(accordionArgsMapper(args))
    );

    stories.add("default", template, {
      args: {
        sections: AccordionContent.basicSections,
      },
    });

    stories.add("handle anchors", template, {
      args: {
        sections: AccordionContent.anchorSections,
      },
    });

    stories.add("nested", template, {
      args: {
        sections: AccordionContent.subSections,
      },
    });

    stories.add("allowMultipleOpen", template, {
      args: {
        sections: AccordionContent.allowMultipleOpenSections,
        allowMultipleOpen: true,
      },
    });

    stories.add("addons", template, {
      args: {
        sections: AccordionContent.addonsSections,
      },
    });

    stories.add("alignment", template, {
      args: {
        sections: AccordionContent.alignmentSections,
        reverseAlign: true,
      },
    });
  });
}
