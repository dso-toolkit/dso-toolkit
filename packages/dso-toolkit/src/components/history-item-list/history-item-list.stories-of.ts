import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  HistoryItemListArgs,
  historyItemListArgTypes,
  historyItemListArgs,
  historyItemListArgsMapper,
} from "./history-item-list.args";
import { headings, historyItems } from "./history-item-list.content";
import { HistoryItemList } from "./history-item-list.models.js";

type HistoryItemListStory = StoryObj<HistoryItemListArgs, Renderer>;

interface HistoryItemListStories {
  Default: HistoryItemListStory;
}

interface HistoryItemListStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    HistoryItemListTemplates<TemplateFnReturnType>
  > {}

interface HistoryItemListTemplates<TemplateFnReturnType> {
  historyItemListTemplate: (historyItemListProperties: HistoryItemList) => TemplateFnReturnType;
}

export function historyItemListMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HistoryItemListArgs
> {
  return {
    argTypes: historyItemListArgTypes,
    args: historyItemListArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function historyItemListStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HistoryItemListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HistoryItemListStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { historyItemListTemplate }) =>
        historyItemListTemplate(historyItemListArgsMapper(args, headings, historyItems)),
      ),
    },
  };
}
