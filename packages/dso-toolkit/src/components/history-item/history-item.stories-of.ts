import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HistoryItemArgs, historyItemArgTypes, historyItemArgs, historyItemArgsMapper } from "./history-item.args.js";
import { HistoryItem } from "./history-item.models.js";

type HistoryItemStory = StoryObj<HistoryItemArgs, Renderer>;

interface HistoryItemStories {
  Default: HistoryItemStory;
}

interface HistoryItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HistoryItemTemplates<TemplateFnReturnType>
  > {}

interface HistoryItemTemplates<TemplateFnReturnType> {
  historyItemTemplate: (historyItemProperties: HistoryItem) => TemplateFnReturnType;
}

export function historyItemMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HistoryItemArgs
> {
  return {
    argTypes: historyItemArgTypes,
    args: historyItemArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function historyItemStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HistoryItemStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HistoryItemStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { historyItemTemplate }) =>
        historyItemTemplate(historyItemArgsMapper(args)),
      ),
    },
  };
}
