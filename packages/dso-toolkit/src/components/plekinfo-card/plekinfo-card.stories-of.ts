import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  PlekinfoCardArgs,
  plekinfoCardArgTypes,
  plekinfoCardArgs,
  plekinfoCardArgsMapper,
} from "./plekinfo-card.args.js";
import { plekinfoCardDemoCss } from "./plekinfo-card.demo";
import { PlekinfoCard, PlekinfoCardItem } from "./plekinfo-card.models.js";

export type PlekinfoCardDecorator<TemplateFnReturnType> = (story: PartialStoryFn, css: string) => TemplateFnReturnType;

type PlekinfoCardStory = StoryObj<PlekinfoCardArgs, Renderer>;

interface PlekinfoCardStories {
  Default: PlekinfoCardStory;
  WithItems: PlekinfoCardStory;
  Static: PlekinfoCardStory;
  WithoutSymbol: PlekinfoCardStory;
  WithSlideToggle: PlekinfoCardStory;
  WithLabel: PlekinfoCardStory;
  WithNameChange: PlekinfoCardStory;
  WithNameChangeComplex: PlekinfoCardStory;
}

interface PlekinfoCardStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
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
  withItemsContent: PlekinfoCardItem<TemplateFnReturnType>[];
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
      args: {
        ...plekinfoCardArgs,
        noStroke: true,
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    WithItems: {
      args: {
        ...plekinfoCardArgs,
        interaction: {
          checked: false,
          accessibleLabel: "sr-only label van het schuifje",
        },
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(
        storyTemplates,
        (args, { plekinfoCardTemplate, defaultSymbol, withItemsContent: withItems }) =>
          plekinfoCardTemplate({ ...plekinfoCardArgsMapper(args, defaultSymbol), items: withItems }),
      ),
    },
    Static: {
      args: {
        ...plekinfoCardArgs,
        noStroke: true,
        href: "",
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, defaultSymbol, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, defaultSymbol, content)),
      ),
    },
    WithoutSymbol: {
      args: {
        ...plekinfoCardArgs,
        noStroke: true,
      },
      decorators: [(story) => decorator(story, plekinfoCardDemoCss)],
      render: templateContainer.render(storyTemplates, (args, { plekinfoCardTemplate, content }) =>
        plekinfoCardTemplate(plekinfoCardArgsMapper(args, undefined, content)),
      ),
    },
    WithSlideToggle: {
      args: {
        ...plekinfoCardArgs,
        noStroke: true,
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
        noStroke: true,
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
        noStroke: true,
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
        noStroke: true,
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
