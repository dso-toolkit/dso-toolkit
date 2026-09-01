import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

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

interface AccordionStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
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
  nestedSections: AccordionSection<TemplateFnReturnType>[];
  addonsSections: AccordionSection<TemplateFnReturnType>[];
  alignmentSections: AccordionSection<TemplateFnReturnType>[];
  renvooiSections: AccordionSection<TemplateFnReturnType>[];
  activatableSections: AccordionSection<TemplateFnReturnType>[];
  animatedFormGroupSections?: AccordionSection<TemplateFnReturnType>[];
  badgeChildren?: TemplateFnReturnType;
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
        label: "Attentie",
        labelStatus: "attention",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, basicSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, basicSections, badgeChildren)),
      ),
    },
    Compact: {
      args: {
        variant: "compact",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, compactSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, compactSections, badgeChildren)),
      ),
    },
    CompactBlack: {
      args: {
        variant: "compact-black",
      },
      render: templateContainer.render(
        storyTemplates,
        (args, { accordionTemplate, compactBlackSections, badgeChildren }) =>
          accordionTemplate(accordionArgsMapper(args, compactBlackSections, badgeChildren)),
      ),
    },
    Activatable: {
      args: {
        variant: "compact-black",
        activatable: true,
        active: true,
      },
      render: templateContainer.render(
        storyTemplates,
        (args, { accordionTemplate, activatableSections, badgeChildren }) =>
          accordionTemplate(accordionArgsMapper(args, activatableSections, badgeChildren)),
      ),
    },
    Neutral: {
      args: {
        variant: "neutral",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, neutralSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, neutralSections, badgeChildren)),
      ),
    },
    Conclusion: {
      args: {
        variant: "conclusion",
      },
      render: templateContainer.render(
        storyTemplates,
        (args, { accordionTemplate, conclusionSections, badgeChildren }) =>
          accordionTemplate(accordionArgsMapper(args, conclusionSections, badgeChildren)),
      ),
    },
    HandleAnchors: {
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, anchorSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, anchorSections, badgeChildren)),
      ),
    },
    Nested: {
      args: {
        open: true,
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, nestedSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, nestedSections, badgeChildren)),
      ),
    },
    AddonsSections: {
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, addonsSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, addonsSections, badgeChildren)),
      ),
    },
    AlignmentSections: {
      render: templateContainer.render(
        storyTemplates,
        (args, { accordionTemplate, alignmentSections, badgeChildren }) =>
          accordionTemplate(accordionArgsMapper(args, alignmentSections, badgeChildren)),
      ),
    },
    RenvooiSections: {
      args: {
        variant: "compact-black",
      },
      render: templateContainer.render(storyTemplates, (args, { accordionTemplate, renvooiSections, badgeChildren }) =>
        accordionTemplate(accordionArgsMapper(args, renvooiSections, badgeChildren)),
      ),
    },
    AnimatedFormGroupSections: {
      args: {
        open: true,
      },
      render: templateContainer.render(
        storyTemplates,
        (args, { accordionTemplate, animatedFormGroupSections, badgeChildren }) =>
          accordionTemplate(accordionArgsMapper(args, animatedFormGroupSections ?? [], badgeChildren)),
      ),
    },
  };
}
