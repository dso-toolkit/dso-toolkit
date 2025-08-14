import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

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

interface AlertStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, AlertTemplates<TemplateFnReturnType>> {}

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

export function alertStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AlertStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AlertStories {
  return {
    Success: {
      args: {
        status: "success",
      },
      render: templateContainer.render(storyTemplates, (args, { alertTemplate, successMessage }) =>
        alertTemplate(alertArgsMapper(args, successMessage)),
      ),
    },
    Info: {
      args: {
        status: "info",
      },
      render: templateContainer.render(storyTemplates, (args, { alertTemplate, infoMessage }) =>
        alertTemplate(alertArgsMapper(args, infoMessage)),
      ),
    },
    Warning: {
      args: {
        status: "warning",
      },
      render: templateContainer.render(storyTemplates, (args, { alertTemplate, warningMessage }) =>
        alertTemplate(alertArgsMapper(args, warningMessage)),
      ),
    },
    Error: {
      args: {
        status: "error",
      },
      render: templateContainer.render(storyTemplates, (args, { alertTemplate, errorMessage }) =>
        alertTemplate(alertArgsMapper(args, errorMessage)),
      ),
    },
    WithHeadings: {
      args: {
        status: "info",
      },
      render: templateContainer.render(storyTemplates, (args, { alertTemplate, alertWithHeadingsContent }) =>
        alertTemplate(alertArgsMapper(args, alertWithHeadingsContent)),
      ),
    },
  };
}
