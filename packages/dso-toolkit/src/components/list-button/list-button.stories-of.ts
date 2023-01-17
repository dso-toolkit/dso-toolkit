import { v4 as uuidv4 } from "uuid";

import { ListButtonArgs, listButtonArgsMapper, listButtonArgTypes, listButtonDefaultArgs } from "./list-button.args.js";
import { ListButton } from "./list-button.models.js";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

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
        inputNumber: {
          id: uuidv4(),
        },
      },
    });

    const template = templateMapper<ListButtonArgs>((args, { listButtonTemplate }) =>
      listButtonTemplate(listButtonArgsMapper(args))
    );

    stories.add("single select", template, { args: {} });

    stories.add("multi select", template, {
      args: listButtonDefaultArgs({
        count: 0,
        min: 0,
        max: 99,
      }),
    });

    return stories;
  });
}
