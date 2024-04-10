import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

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

export function storiesOfAccordion<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AccordionTemplates<TemplateFnReturnType>
  >,
  showNeutralAndCompactBlack = false,
) {
  return storiesOfFactory("Accordion", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: accordionArgTypes,
      args: accordionArgs,
    });

    stories.add(
      "default",
      templateMapper<AccordionArgs>((args, { accordionTemplate, basicSections }) =>
        accordionTemplate(accordionArgsMapper(args, basicSections)),
      ),
    );

    stories.add(
      "compact",
      templateMapper<AccordionArgs>((args, { accordionTemplate, compactSections }) =>
        accordionTemplate(accordionArgsMapper(args, compactSections)),
      ),
      {
        args: {
          variant: "compact",
        },
      },
    );

    if (showNeutralAndCompactBlack) {
      stories.add(
        "compact black",
        templateMapper<AccordionArgs>((args, { accordionTemplate, compactBlackSections }) =>
          accordionTemplate(accordionArgsMapper(args, compactBlackSections)),
        ),
        {
          args: {
            variant: "compact-black",
          },
        },
      );

      stories.add(
        "neutral",
        templateMapper<AccordionArgs>((args, { accordionTemplate, neutralSections }) =>
          accordionTemplate(accordionArgsMapper(args, neutralSections)),
        ),
        {
          args: {
            variant: "neutral",
          },
        },
      );
    }

    stories.add(
      "conclusion",
      templateMapper<AccordionArgs>((args, { accordionTemplate, conclusionSections }) =>
        accordionTemplate(accordionArgsMapper(args, conclusionSections)),
      ),
      {
        args: {
          variant: "conclusion",
        },
      },
    );

    stories.add(
      "handle anchors",
      templateMapper<AccordionArgs>((args, { accordionTemplate, anchorSections }) =>
        accordionTemplate(accordionArgsMapper(args, anchorSections)),
      ),
    );

    stories.add(
      "nested",
      templateMapper<AccordionArgs>((args, { accordionTemplate, subSections }) =>
        accordionTemplate(accordionArgsMapper(args, subSections)),
      ),
    );

    stories.add(
      "addonsSections",
      templateMapper<AccordionArgs>((args, { accordionTemplate, addonsSections }) =>
        accordionTemplate(accordionArgsMapper(args, addonsSections)),
      ),
    );

    stories.add(
      "alignmentSections",
      templateMapper<AccordionArgs>((args, { accordionTemplate, alignmentSections }) =>
        accordionTemplate(accordionArgsMapper(args, alignmentSections)),
      ),
    );

    return stories;
  });
}
