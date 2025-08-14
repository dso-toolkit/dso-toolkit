import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import {
  ApplicationHeadingArgs,
  applicationHeadingArgTypes,
  applicationHeadingArgsMapper,
} from "./application-heading.args.js";
import { ApplicationHeading } from "./application-heading.models.js";

type ApplicationHeadingStory = StoryObj<ApplicationHeadingArgs, Renderer>;

interface ApplicationHeadingStories {
  Default: ApplicationHeadingStory;
  WithSubtitle: ApplicationHeadingStory;
  WithSubtitleAndSteps: ApplicationHeadingStory;
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

export function applicationHeadingMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ApplicationHeadingArgs
> {
  return {
    argTypes: applicationHeadingArgTypes,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
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
        applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
      ),
    },
    WithSubtitle: {
      args: {
        title: "H1 Paginatitel",
        subtitle: "H2 Subtitel",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
      ),
    },
    WithSubtitleAndSteps: {
      args: {
        title: "H1 Paginatitel",
        subtitle: "H2 Subtitel",
        step: "Stap x van x",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
      ),
    },
    SubtitleOnly: {
      args: {
        subtitle: "H2 Subtitel",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
      ),
    },
    SubtitleAndStepsOnly: {
      args: {
        subtitle: "H2 Subtitel",
        step: "Stap x van x",
      },
      render: templateContainer.render(storyTemplates, (args, { applicationHeadingTemplate }) =>
        applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
      ),
    },
  };
}
