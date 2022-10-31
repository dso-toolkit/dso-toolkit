import { v4 as uuidv4 } from "uuid";

import { ListButtonArgs, listButtonArgsMapper, listButtonArgTypes } from "./list-button.args";
import { ListButton } from "./list-button.models";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

export interface ListButtonTemplates<TemplateFnReturnType> {
  listButtonTemplate: (listButtonProperties: ListButton) => TemplateFnReturnType;
}

export function storiesOfListButton<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ListButtonTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("List Button", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: listButtonArgTypes,
      args: {
        label: "Milieubelastende activiteit - Melding",
        count: 0,
        inputNumber: {
          id: uuidv4(),
        },
      },
    });

    const template = templateMapper<ListButtonArgs>((args, { listButtonTemplate }) =>
      listButtonTemplate(listButtonArgsMapper(args))
    );

    stories.add("List Button", template);
  });
}
