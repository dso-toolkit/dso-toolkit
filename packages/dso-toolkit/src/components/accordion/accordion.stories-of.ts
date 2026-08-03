import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { AccordionArgs, accordionArgTypes, accordionArgs, accordionArgsMapper } from "./accordion.args.js";
import { Accordion, AccordionSection } from "./accordion.models.js";

type AccordionStory = StoryObj<AccordionArgs, Renderer>;

interface AccordionStories {
  Default: AccordionStory;
  Activatable: AccordionStory;
  Compact: AccordionStory;
  CompactBlack: AccordionStory;
  Neutral: AccordionStory;
  Conclusion: AccordionStory;
  HandleAnchors: AccordionStory;
  Nested: AccordionStory;
  AddonsSections: AccordionStory;
  AlignmentSections: AccordionStory;
  RenvooiSections: AccordionStory;
  AnimatedFormGroupSections: AccordionStory;
}

interface AccordionStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
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
  nestedSections: AccordionSection<TemplateFnReturnType>[];
  addonsSections: AccordionSection<TemplateFnReturnType>[];
  alignmentSections: AccordionSection<TemplateFnReturnType>[];
  renvooiSections: AccordionSection<TemplateFnReturnType>[];
  activatableSections: AccordionSection<TemplateFnReturnType>[];
  animatedFormGroupSections: AccordionSection<TemplateFnReturnType>[];
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

export function accordionStories<TemplateFnReturnType>({
  storyTemplates,
}: AccordionStoriesParameters<TemplateFnReturnType>): AccordionStories {
  return {
    Default: {
      args: {
        label: "Attentie",
        labelStatus: "attention",
      },
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().basicSections)),
    },
    Compact: {
      args: {
        variant: "compact",
      },
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().compactSections)),
    },
    CompactBlack: {
      args: {
        variant: "compact-black",
      },
      render: (args) =>
        storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().compactBlackSections)),
    },
    Activatable: {
      args: {
        variant: "compact-black",
        activatable: true,
        active: true,
      },
      render: (args) =>
        storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().activatableSections)),
    },
    Neutral: {
      args: {
        variant: "neutral",
      },
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().neutralSections)),
    },
    Conclusion: {
      args: {
        variant: "conclusion",
      },
      render: (args) =>
        storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().conclusionSections)),
    },
    HandleAnchors: {
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().anchorSections)),
    },
    Nested: {
      args: {
        open: true,
      },
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().nestedSections)),
    },
    AddonsSections: {
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().addonsSections)),
    },
    AlignmentSections: {
      render: (args) =>
        storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().alignmentSections)),
    },
    RenvooiSections: {
      args: {
        variant: "compact-black",
      },
      render: (args) => storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().renvooiSections)),
    },
    AnimatedFormGroupSections: {
      args: {
        open: true,
      },
      render: (args) =>
        storyTemplates().accordionTemplate(accordionArgsMapper(args, storyTemplates().animatedFormGroupSections)),
    },
  };
}
