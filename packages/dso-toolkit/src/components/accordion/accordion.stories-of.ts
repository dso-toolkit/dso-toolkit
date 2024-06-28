import { ComponentAnnotations, Renderer } from "@storybook/types";

import { AccordionArgs, accordionArgs, accordionArgsMapper, accordionArgTypes } from "./accordion.args.js";
import { Accordion, AccordionSection } from "./accordion.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

type AccordionStory = StoryObj<AccordionArgs, Renderer>;

interface AccordionStories {
  Default: AccordionStory;
  Compact: AccordionStory;
  CompactBlack: AccordionStory;
  Neutral: AccordionStory;
  Conclusion: AccordionStory;
  HandleAnchors: AccordionStory;
  Nested: AccordionStory;
  AddonsSections: AccordionStory;
  AlignmentSections: AccordionStory;
}

interface AccordionStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AccordionTemplates<TemplateFnReturnType>
  > {}

interface AccordionTemplates<TemplateFnReturnType> {
  accordionTemplate: (accordionProperties: Accordion<TemplateFnReturnType>) => TemplateFnReturnType;
  basicSections: AccordionSection<TemplateFnReturnType>[];
  conclusionSections: AccordionSection<TemplateFnReturnType>[];
  compactSections: AccordionSection<TemplateFnReturnType>[];
  neutralSections: AccordionSection<TemplateFnReturnType>[];
  compactBlackSections: AccordionSection<TemplateFnReturnType>[];
  anchorSections: AccordionSection<TemplateFnReturnType>[];
  subSections: AccordionSection<TemplateFnReturnType>[];
  addonsSections: AccordionSection<TemplateFnReturnType>[];
  alignmentSections: AccordionSection<TemplateFnReturnType>[];
}

export function accordionMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AccordionArgs
> {
  return {
    argTypes: accordionArgTypes,
    args: accordionArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function accordionStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AccordionStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AccordionStories {
  return {
    Default: {
      args: {
        badgeMessage: "Onbepaald",
        badgeStatus: "outline",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, basicSections }) =>
        accordionTemplate(accordionArgsMapper(args, basicSections)),
      ),
    },
    Compact: {
      args: {
        variant: "compact",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, compactSections }) =>
        accordionTemplate(accordionArgsMapper(args, compactSections)),
      ),
    },
    CompactBlack: {
      args: {
        variant: "compact-black",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, compactBlackSections }) =>
        accordionTemplate(accordionArgsMapper(args, compactBlackSections)),
      ),
    },
    Neutral: {
      args: {
        variant: "neutral",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, neutralSections }) =>
        accordionTemplate(accordionArgsMapper(args, neutralSections)),
      ),
    },
    Conclusion: {
      args: {
        variant: "conclusion",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, conclusionSections }) =>
        accordionTemplate(accordionArgsMapper(args, conclusionSections)),
      ),
    },
    HandleAnchors: {
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, anchorSections }) =>
        accordionTemplate(accordionArgsMapper(args, anchorSections)),
      ),
    },
    Nested: {
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, subSections }) =>
        accordionTemplate(accordionArgsMapper(args, subSections)),
      ),
    },
    AddonsSections: {
      args: {},
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, addonsSections }) =>
        accordionTemplate(accordionArgsMapper(args, addonsSections)),
      ),
    },
    AlignmentSections: {
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, alignmentSections }) =>
        accordionTemplate(accordionArgsMapper(args, alignmentSections)),
      ),
    },
  };
}
