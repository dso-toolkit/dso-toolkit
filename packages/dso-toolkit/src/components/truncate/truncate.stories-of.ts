import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { Truncate } from "./truncate.models.js";

export type TruncateDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

type TruncateStory = StoryObj<{}, Renderer>;

interface TruncateStories {
  Passend: TruncateStory;
  Ingekort: TruncateStory;
  IngekortMetRenvooi: TruncateStory;
  RenvooiWijzigingNaLaden: TruncateStory;
}

interface TruncateStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  TruncateTemplates<TemplateFnReturnType>
> {
  decorator: TruncateDecorator<TemplateFnReturnType>;
}

export interface TruncateTemplates<TemplateFnReturnType> {
  truncateTemplate: (truncateProperties: Truncate<TemplateFnReturnType>) => TemplateFnReturnType;
  passendContent: TemplateFnReturnType;
  ingekortContent: TemplateFnReturnType;
  ingekortMetRenvooiContent: TemplateFnReturnType;
  renvooiWijzigingNaLadenContent: TemplateFnReturnType;
}

export function truncateMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function truncateStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: TruncateStoriesParameters<Implementation, Templates, TemplateFnReturnType>): TruncateStories {
  return {
    Passend: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { truncateTemplate, passendContent }) =>
        truncateTemplate({
          children: passendContent,
        }),
      ),
    },

    Ingekort: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { truncateTemplate, ingekortContent }) =>
        truncateTemplate({
          children: ingekortContent,
        }),
      ),
    },

    IngekortMetRenvooi: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { truncateTemplate, ingekortMetRenvooiContent }) =>
        truncateTemplate({
          children: ingekortMetRenvooiContent,
        }),
      ),
    },

    RenvooiWijzigingNaLaden: {
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (_args, { truncateTemplate, renvooiWijzigingNaLadenContent }) =>
        truncateTemplate({
          children: renvooiWijzigingNaLadenContent,
        }),
      ),
    },
  };
}
