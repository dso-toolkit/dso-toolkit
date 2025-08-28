import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HistoryItemsArgs, historyItemsArgTypes, historyItemsArgs, historyItemsArgsMapper } from "./history-items.args";
import { headings, historyItems } from "./history-items.content";
import { HistoryItems } from "./history-items.models.js";

type HistoryItemsStory = StoryObj<HistoryItemsArgs, Renderer>;

interface HistoryItemsStories {
  Default: HistoryItemsStory;
}

interface HistoryItemsStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HistoryItemsTemplates<TemplateFnReturnType>
  > {}

interface HistoryItemsTemplates<TemplateFnReturnType> {
  historyItemsTemplate: (historyItemsProperties: HistoryItems) => TemplateFnReturnType;
}

export function historyItemsMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HistoryItemsArgs
> {
  return {
    argTypes: historyItemsArgTypes,
    args: historyItemsArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function historyItemsStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HistoryItemsStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HistoryItemsStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { historyItemsTemplate }) =>
        historyItemsTemplate(historyItemsArgsMapper(args, headings(args.listPattern), historyItems(args.listPattern))),
      ),
    },
  };
}
