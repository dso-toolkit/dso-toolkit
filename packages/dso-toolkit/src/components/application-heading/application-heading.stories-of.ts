import { Renderer } from "@storybook/types";

import { ApplicationHeadingArgs, applicationHeadingArgsMapper } from "./application-heading.args.js";
import { ApplicationHeading } from "./application-heading.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";

type ApplicationHeadingStory = StoryObj<ApplicationHeadingArgs, Renderer>;

interface ApplicationHeadingStories {
  Default: ApplicationHeadingStory;
  WithSubtitel: ApplicationHeadingStory;
  WithSubtitelAndSteps: ApplicationHeadingStory;
  SubtitleOnly: ApplicationHeadingStory;
  SubtitleAndStepsOnly: ApplicationHeadingStory;
}

interface ApplicationHeadingStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ApplicationHeadingTemplates<TemplateFnReturnType>
  > {}

interface ApplicationHeadingTemplates<TemplateFnReturnType> {
  applicationHeadingTemplate: (applicationHeadingProperties: ApplicationHeading) => TemplateFnReturnType;
}

export function applicationHeadingStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ApplicationHeadingStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ApplicationHeadingStories {
  return {
    Default: {
      args: {
        title: "H1 Paginatitel",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args))
      ),
    },
    WithSubtitel: {
      args: {
        title: "H1 Paginatitel",
        subtitle: "H2 Subtitel",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args))
      ),
    },
    WithSubtitelAndSteps: {
      args: {
        title: "H1 Paginatitel",
        subtitle: "H2 Subtitel",
        step: "Stap x van x",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args))
      ),
    },
    SubtitleOnly: {
      args: {
        subtitle: "H2 Subtitel",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args))
      ),
    },
    SubtitleAndStepsOnly: {
      args: {
        subtitle: "H2 Subtitel",
        step: "Stap x van x",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args))
      ),
    },
  };
}
