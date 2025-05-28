import readme from "@dso-toolkit/core/src/components/alert/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
  title: "Core/Alert",
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

export { Error, Info, Success, Warning, WithHeadings };
