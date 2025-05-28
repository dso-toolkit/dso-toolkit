import type { Meta } from "@storybook/web-components";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/alert/readme.md?raw";

import { templateContainer } from "../../templates";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
  title: "HTML|CSS/Alert",
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
