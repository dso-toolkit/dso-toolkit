import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { InfoButtonArgs, infoButtonArgsMapper, infoButtonArgTypes } from "./info-button.args";
import { InfoButton } from "./info-button.models";

export interface InfoButtonTemplates<TemplateFnReturnType> {
  infoButtonTemplate: (infoButtonProperties: InfoButton) => TemplateFnReturnType;
}

export function storiesOfInfoButton<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    InfoButtonTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Info Button", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: infoButtonArgTypes,
      args: {
        label: "Toelichting bij vraag",
      },
    });

    const template = templateMapper<InfoButtonArgs>((args, { infoButtonTemplate }) =>
      infoButtonTemplate(infoButtonArgsMapper(args))
    );

    stories.add("inactive", template, {
      args: {
        active: false,
      },
    });

    stories.add("active", template, {
      args: {
        active: true,
      },
    });

    stories.add("secondary inactive", template, {
      args: {
        active: false,
        secondary: true,
      },
    });

    stories.add("secondary active", template, {
      args: {
        active: true,
        secondary: true,
      },
    });
  });
}
