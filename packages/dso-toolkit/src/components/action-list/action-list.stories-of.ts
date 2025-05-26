import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ActionListArgs, actionListArgTypes, actionListArgs, actionListArgsMapper } from "./action-list.args.js";
import { ActionList, ActionListItem } from "./action-list.models.js";

type ActionListStory = StoryObj<ActionListArgs, Renderer>;

interface ActionListStories {
  Default: ActionListStory;
  WithWarning: ActionListStory;
}

interface ActionListStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
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

export function actionListStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ActionListStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ActionListStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { actionListTemplate, actionListItems }) =>
        actionListTemplate(actionListArgsMapper(args, actionListItems)),
      ),
    },
    WithWarning: {
      render: templateContainer.render(storyTemplates, (args, { actionListTemplate, actionListWithWarningItems }) =>
        actionListTemplate(actionListArgsMapper(args, actionListWithWarningItems)),
      ),
    },
  };
}
