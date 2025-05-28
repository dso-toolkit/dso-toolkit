import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  PlekinfoCardArgs,
  plekinfoCardArgTypes,
  plekinfoCardArgs,
  plekinfoCardArgsMapper,
} from "./plekinfo-card.args.js";
import { plekinfoCardDemoCss } from "./plekinfo-card.demo";
import { PlekinfoCard } from "./plekinfo-card.models.js";

export type PlekinfoCardDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type PlekinfoCardStory = StoryObj<PlekinfoCardArgs, Renderer>;

interface PlekinfoCardStories {
  Default: PlekinfoCardStory;
  Static: PlekinfoCardStory;
  WithoutSymbol: PlekinfoCardStory;
  WithSlideToggle: PlekinfoCardStory;
  WithLabel: PlekinfoCardStory;
  WithNameChange: PlekinfoCardStory;
  WithNameChangeComplex: PlekinfoCardStory;
}

interface PlekinfoCardStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    PlekinfoCardTemplates<TemplateFnReturnType>
  > {
  decorator: PlekinfoCardDecorator<TemplateFnReturnType>;
}

interface PlekinfoCardTemplates<TemplateFnReturnType> {
  plekinfoCardTemplate: (plekinfoCardProperties: PlekinfoCard<TemplateFnReturnType>) => TemplateFnReturnType;
  defaultSymbol: TemplateFnReturnType;
  content: TemplateFnReturnType;
}

export function plekinfoCardMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  PlekinfoCardArgs
> {
  return {
    argTypes: plekinfoCardArgTypes,
    args: plekinfoCardArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function plekinfoCardStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: PlekinfoCardStoriesParameters<Implementation, Templates, TemplateFnReturnType>): PlekinfoCardStories {
  return {
    Default: {
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    Static: {
      args: {
        ...plekinfoCardArgs,
        href: "",
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    WithoutSymbol: {
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, undefined, content)),
      ),
    },
    WithSlideToggle: {
      args: {
        ...plekinfoCardArgs,
        interaction: {
          checked: false,
          accessibleLabel: "sr-only label van het schuifje",
        },
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    WithLabel: {
      args: {
        ...plekinfoCardArgs,
        meta: {
          status: "warning",
          compact: true,
          label: "Gewijzigde locatie",
        },
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    WithNameChange: {
      args: {
        ...plekinfoCardArgs,
        label: {
          value: {
            was: "Radargebieden",
            wordt: "Radarverstorende bouwwerken",
          },
        },
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    WithNameChangeComplex: {
      args: {
        ...plekinfoCardArgs,
        label: {
          value: [
            "Waardes worden weergegeven op de kaart",
            {
              was: "50 dB",
              wordt: "45 dB",
            },
            "55 dB",
          ],
        },
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
  };
}
