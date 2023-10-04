import { Addon_PartialStoryFn } from "@storybook/types";

import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { LogoArgs, logoArgsMapper, logoArgTypes } from "./logo.args.js";
import { Logo } from "./logo.models.js";

export interface LogoTemplates<TemplateFnReturnType> {
  logoTemplate: (logoProperties: Logo) => TemplateFnReturnType;
}

export interface LogoParameters<TemplateFnReturnType> {
  decorator: (story: Addon_PartialStoryFn<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfLogo<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    LogoTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Logo", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: {
        logoArgTypes,
      },
      args: {
        label: "",
        ribbon: "",
      },
    });

    const template = templateMapper<LogoArgs>((args, { logoTemplate }) => logoTemplate(logoArgsMapper(args)));

    stories.add("default", template);

    stories.add("with label", template, {
      args: {
        label: "Regels op de kaart",
      },
    });

    stories.add("with (beta) ribbon", template, {
      args: {
        ribbon: "beta",
      },
    });

    stories.add("with label and ribbon", template, {
      args: {
        ribbon: "beta",
        label: "Regels op de kaart",
      },
    });

    return stories;
  });
}
