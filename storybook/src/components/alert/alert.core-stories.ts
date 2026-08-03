import readme from "@dso-toolkit/core/src/components/alert/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { AlertArgs, alertMeta, alertStories } from "dso-toolkit";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";
import { alertTemplate } from "./alert.core-template";

const meta: Meta<AlertArgs> = {
  ...alertMeta({ readme }),
  title: "Core/Alert",
};

export default meta;

const { Success, Error, Info, Warning, WithHeadings } = alertStories({
  storyTemplates: () => {
    return {
      alertTemplate,
      alertWithHeadingsContent,
      errorMessage,
      infoMessage,
      successMessage,
      warningMessage,
    };
  },
});

export { Error, Info, Success, Warning, WithHeadings };
