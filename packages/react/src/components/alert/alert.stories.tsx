import type { Meta } from "@storybook/web-components";
import { alertArgTypes, alertStories, alertArgs } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { alertWithHeadingsContent, errorMessage, infoMessage, successMessage, warningMessage } from "./alert.content";

const meta: Meta = {
  component: "dso-alert",
  title: "React/Alert",
  args: alertArgs,
  argTypes: alertArgTypes,
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

export { Success, Error, Info, Warning, WithHeadings };
