import type { Meta } from "@storybook/web-components";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

import readme from "dso-toolkit/src/components/alert/readme.md?raw";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
  component: "dso-alert",
  title: "Alert",
};

export default meta;

const { Success, Error, Info, Warning, WithHeadings } = alertStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { alertTemplate } = templates;

    return {
      alertTemplate,
      alertWithHeadingsContent,
      errorMessage: errorMessage(templates),
      infoMessage: infoMessage(templates),
      successMessage,
      warningMessage,
    };
  },
});

export { Success, Error, Info, Warning, WithHeadings };
