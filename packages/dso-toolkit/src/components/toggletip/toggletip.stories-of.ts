import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ToggletipArgs, toggletipArgsMapper, toggletipArgTypes } from "./toggletip.args.js";
import { Toggletip } from "./toggletip.models.js";

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
) {
  return storiesOfFactory("Toggletip", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: toggletipArgTypes,
    });

    const template = templateMapper<ToggletipArgs>((args, { toggletipTemplate, children }) =>
      toggletipTemplate(toggletipArgsMapper(args, children)),
    );

    stories.add("Toggletip", template, {});

    return stories;
  });
}
