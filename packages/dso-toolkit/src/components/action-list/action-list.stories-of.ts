import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ActionListArgs, actionListArgsMapper, actionListArgTypes } from "./action-list.args.js";
import { ActionList, ActionListItem } from "./action-list.models.js";

export interface ActionListTemplates<TemplateFnReturnType> {
  actionListTemplate: (actionListProperties: ActionList<TemplateFnReturnType>) => TemplateFnReturnType;
  actionListItems: ActionListItem<TemplateFnReturnType>[];
  actionListWithWarningItems: ActionListItem<TemplateFnReturnType>[];
}

export function storiesOfActionList<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ActionListTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Action List", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: actionListArgTypes,
      args: {
        title: "Actielijst Omgevingsloket",
      },
    });

    stories.add(
      "default",
      templateMapper<ActionListArgs>((args, { actionListTemplate, actionListItems }) =>
        actionListTemplate(actionListArgsMapper(args, actionListItems)),
      ),
    );

    stories.add(
      "with warning",
      templateMapper<ActionListArgs>((args, { actionListTemplate, actionListWithWarningItems }) =>
        actionListTemplate(actionListArgsMapper(args, actionListWithWarningItems)),
      ),
    );

    return stories;
  });
}
