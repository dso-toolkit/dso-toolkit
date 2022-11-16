import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";

import { AlertArgs, alertArgsMapper, alertArgTypes } from "./alert.args";
import { Alert } from "./alert.models";

export interface AlertTemplates<TemplateFnReturnType> {
  alertTemplate: (alertProperties: Alert<TemplateFnReturnType>) => TemplateFnReturnType;
  dangerMessage: TemplateFnReturnType;
  infoMessage: TemplateFnReturnType;
  successMessage: TemplateFnReturnType;
  warningMessage: TemplateFnReturnType;
  alertWithHeadingsContent: TemplateFnReturnType;
}

export function storiesOfAlert<Implementation, Templates, TemplateFnReturnType>(
  storyFunctionArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AlertTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Alert", storyFunctionArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: alertArgTypes,
      args: {
        withRoleAlert: false,
        withButton: true,
      },
    });

    stories.add(
      "success",
      templateMapper<AlertArgs>((args, { alertTemplate, successMessage }) =>
        alertTemplate(alertArgsMapper(args, successMessage))
      ),
      {
        args: {
          status: "success",
        },
      }
    );

    stories.add(
      "info",
      templateMapper<AlertArgs>((args, { alertTemplate, infoMessage }) =>
        alertTemplate(alertArgsMapper(args, infoMessage))
      ),
      {
        args: {
          status: "info",
        },
      }
    );

    stories.add(
      "warning",
      templateMapper<AlertArgs>((args, { alertTemplate, warningMessage }) =>
        alertTemplate(alertArgsMapper(args, warningMessage))
      ),
      {
        args: {
          status: "warning",
        },
      }
    );

    stories.add(
      "danger",
      templateMapper<AlertArgs>((args, { alertTemplate, dangerMessage }) =>
        alertTemplate(alertArgsMapper(args, dangerMessage))
      ),
      {
        args: {
          status: "danger",
        },
      }
    );

    stories.add(
      "with headings",
      templateMapper<AlertArgs>((args, { alertTemplate, alertWithHeadingsContent }) =>
        alertTemplate(alertArgsMapper(args, alertWithHeadingsContent))
      ),
      {
        argTypes: {
          message: {
            control: {
              disable: true,
            },
          },
        },
        args: {
          status: "info",
        },
      }
    );
  });
}
