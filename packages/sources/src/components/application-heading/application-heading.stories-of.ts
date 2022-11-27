import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import {
  ApplicationHeadingArgs,
  applicationHeadingArgsMapper,
  applicationHeadingArgTypes,
} from "./application-heading.args";
import { ApplicationHeading } from "./application-heading.models";

export interface ApplicationHeadingTemplates<TemplateFnReturnType> {
  applicationHeadingTemplate: (applicationHeadingProperties: ApplicationHeading) => TemplateFnReturnType;
}

export function storiesOfApplicationHeading<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ApplicationHeadingTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Application Heading", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: applicationHeadingArgTypes,
    });

    const template = templateMapper<ApplicationHeadingArgs>((args, { applicationHeadingTemplate }) =>
      applicationHeadingTemplate(applicationHeadingArgsMapper(args))
    );

    stories.add("default", template, {
      args: {
        title: "H1 Paginatitel",
      },
    });

    stories.add("with subtitle", template, {
      args: {
        title: "H1 Paginatitel",
        subtitle: "H2 Subtitel",
      },
    });

    stories.add("with subtitle and steps", template, {
      args: {
        title: "H1 Paginatitel",
        subtitle: "H2 Subtitel",
        step: "Stap x van x",
      },
    });

    stories.add("subtitle only", template, {
      args: {
        subtitle: "H2 Subtitel",
      },
    });

    stories.add("subtitle and steps only", template, {
      args: {
        subtitle: "H2 Subtitel",
        step: "Stap x van x",
      },
    });

    return stories;
  });
}
