import { Parameters } from "@storybook/addons";
import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { ToggletipArgs, toggletipArgsMapper, toggletipArgTypes } from "./toggletip.args";
import { Toggletip } from "./toggletip.models";

export interface ToggletipTemplates<TemplateFnReturnType> {
  toggletipTemplate: (toggletipProperties: Toggletip<TemplateFnReturnType>) => TemplateFnReturnType;
  children: TemplateFnReturnType;
}

export function storiesOfToggletip<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ToggletipTemplates<TemplateFnReturnType>
  >,
  parameters?: Parameters
) {
  return storiesOfFactory("Toggletip", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: toggletipArgTypes,
      ...parameters,
    });

    const template = templateMapper<ToggletipArgs>((args, { toggletipTemplate, children }) =>
      toggletipTemplate(toggletipArgsMapper(args, children))
    );

    stories.add("Toggletip", template, {});

    return stories;
  });
}
