import { Parameters } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { IconArgs, iconArgsMapper, iconArgTypes } from "./icon.args";
import { Icon } from "./icon.models";

export interface IconTemplates<TemplateFnReturnType> {
  iconTemplate: (iconProperties: Icon) => TemplateFnReturnType;
}

export function storiesOfIcon<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    IconTemplates<TemplateFnReturnType>
  >,
  parameters?: Parameters
) {
  return storiesOfFactory("Icon", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: iconArgTypes,
      args: {
        icon: "user",
      },
      ...parameters,
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
