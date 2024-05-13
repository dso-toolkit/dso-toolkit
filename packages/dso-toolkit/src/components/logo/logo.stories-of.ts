import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import { LogoArgs, logoArgsMapper, logoArgTypes } from "./logo.args.js";
import { Logo } from "./logo.models.js";

export interface LogoTemplates<TemplateFnReturnType> {
  logoTemplate: (logoProperties: Logo) => TemplateFnReturnType;
}

export function storiesOfLogo<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    LogoTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Logo", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: logoArgTypes,
    });

    const template = templateMapper<LogoArgs>((args, { logoTemplate }) => logoTemplate(logoArgsMapper(args)));

    stories.add("default", template);

    stories.add("with logoUrl", template, {
      args: {
        logoUrl: "/",
      },
    });

    stories.add("with label", template, {
      args: {
        label: "Regels op de kaart",
      },
    });

    stories.add("with label and labelUrl", template, {
      args: {
        label: "Regels op de kaart",
        labelUrl: "regels-op-de-kaart",
      },
    });

    stories.add("with logoUrl and label and labelUrl", template, {
      args: {
        label: "Regels op de kaart",
        labelUrl: "regels-op-de-kaart",
        logoUrl: "/",
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
