import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters2, StoryObj } from "../../template-container.js";

import { AlertArgs, alertArgTypes, alertArgsMapper } from "./alert.args.js";
import { Alert } from "./alert.models.js";

type AlertStory = StoryObj<AlertArgs, Renderer>;

interface AlertStories {
  Success: AlertStory;
  Info: AlertStory;
  Warning: AlertStory;
  Error: AlertStory;
  WithHeadings: AlertStory;
}

interface AlertStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  AlertTemplates<TemplateFnReturnType>
> {}

interface AlertTemplates<TemplateFnReturnType> {
  alertTemplate: (alertProperties: Alert<TemplateFnReturnType>) => TemplateFnReturnType;
  errorMessage: TemplateFnReturnType;
  infoMessage: TemplateFnReturnType;
  successMessage: TemplateFnReturnType;
  warningMessage: TemplateFnReturnType;
  alertWithHeadingsContent: TemplateFnReturnType;
}

export function alertMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AlertArgs
> {
  return {
    argTypes: alertArgTypes,
    args: {
      withButton: true,
      closable: false,
      dsoClose: fn(),
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function alertStories<TemplateFnReturnType>({
  storyTemplates,
}: AlertStoriesParameters<TemplateFnReturnType>): AlertStories {
  return {
    Success: {
      args: {
        status: "success",
      },
      render: (args) => storyTemplates().alertTemplate(alertArgsMapper(args, storyTemplates().successMessage)),
    },
    Info: {
      args: {
        status: "info",
      },
      render: (args) => storyTemplates().alertTemplate(alertArgsMapper(args, storyTemplates().infoMessage)),
    },
    Warning: {
      args: {
        status: "warning",
      },
      render: (args) => storyTemplates().alertTemplate(alertArgsMapper(args, storyTemplates().warningMessage)),
    },
    Error: {
      args: {
        status: "error",
      },
      render: (args) => storyTemplates().alertTemplate(alertArgsMapper(args, storyTemplates().errorMessage)),
    },
    WithHeadings: {
      args: {
        status: "info",
      },
      render: (args) =>
        storyTemplates().alertTemplate(alertArgsMapper(args, storyTemplates().alertWithHeadingsContent)),
    },
  };
}
