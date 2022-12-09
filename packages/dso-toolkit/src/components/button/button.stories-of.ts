import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { ButtonArgs, buttonArgsMapper, buttonArgTypes } from "./button.args.js";
import { Button, ButtonAnchor } from "./button.models.js";

export interface ButtonTemplates<TemplateFnReturnType> {
  buttonTemplate: (buttonProperties: Button | ButtonAnchor) => TemplateFnReturnType;
}

export function storiesOfButton<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ButtonTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Button", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: buttonArgTypes,
      args: {
        element: "button",
      },
    });

    const template = templateMapper<ButtonArgs>((args, { buttonTemplate }) => buttonTemplate(buttonArgsMapper(args)));

    stories.add("primary", template, {
      argTypes: {
        iconMode: {
          options: [undefined, "after"],
        },
      },
      args: {
        variant: "primary",
        label: "Primary button",
      },
    });

    stories.add("secondary (default)", template, {
      args: {
        variant: "secondary",
        label: "Secondary button",
      },
    });

    stories.add("tertiary (link)", template, {
      args: {
        variant: "tertiary",
        label: "Tertiary button",
      },
    });

    return stories;
  });
}
