import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { ActionListArgs, actionListArgTypes, actionListArgs, actionListArgsMapper } from "./action-list.args.js";
import { ActionList, ActionListItem } from "./action-list.models.js";

type ActionListStory = StoryObj<ActionListArgs, Renderer>;

interface ActionListStories {
  Default: ActionListStory;
  WithWarning: ActionListStory;
}

interface ActionListStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  ActionListTemplates<TemplateFnReturnType>
> {}

export interface ActionListTemplates<TemplateFnReturnType> {
  actionListTemplate: (actionListProperties: ActionList<TemplateFnReturnType>) => TemplateFnReturnType;
  actionListItems: ActionListItem<TemplateFnReturnType>[];
  actionListWithWarningItems: ActionListItem<TemplateFnReturnType>[];
}

export function actionListMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ActionListArgs
> {
  return {
    argTypes: actionListArgTypes,
    args: actionListArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function actionListStories<TemplateFnReturnType>({
  storyTemplates,
}: ActionListStoriesParameters<TemplateFnReturnType>): ActionListStories {
  return {
    Default: {
      render: (args) =>
        storyTemplates().actionListTemplate(actionListArgsMapper(args, storyTemplates().actionListItems)),
    },
    WithWarning: {
      render: (args) =>
        storyTemplates().actionListTemplate(actionListArgsMapper(args, storyTemplates().actionListWithWarningItems)),
    },
  };
}
