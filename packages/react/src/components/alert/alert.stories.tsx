import readme from "@dso-toolkit/react/src/components/alert/readme.md?raw";
import type { Meta } from "@storybook/react";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
  title: "Alert",
};

export default meta;

const { Success, Error, Info, Warning, WithHeadings } = alertStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { alertTemplate } = templates;

    return {
      alertTemplate,
      errorMessage,
      infoMessage,
      successMessage,
      warningMessage,
      alertWithHeadingsContent,
    };
  },
});

export { Error, Info, Success, Warning, WithHeadings };
