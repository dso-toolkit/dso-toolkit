import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { IconArgs, iconArgsMapper, iconArgTypes } from "./icon.args.js";
import { Icon } from "./icon.models.js";

export interface IconTemplates<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

export function storiesOfIcon<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    IconTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Icon", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: iconArgTypes,
      args: {
        icon: "user",
      },
    });

    const template = templateMapper<IconArgs>((args, { iconTemplate }) => iconTemplate(iconArgsMapper(args)));

    stories.add("Icon", template, {
      args: {
        icon: "user",
      },
    });

    return stories;
  });
}
