import readme from "@dso-toolkit/core/src/components/alert/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { AlertArgs, alertArgTypes, alertArgsMapper } from "./alert.args.js";
import {
  alertWithHeadingsContent,
  errorMessage,
  infoMessage,
  successMessage,
  warningMessage,
} from "./alert.content.js";
import { alertTemplate } from "./alert.template.js";

type AlertStory = StoryObj<AlertArgs, Renderer>;

const meta: Meta<AlertArgs> = {
  title: "Core/Alert",
  argTypes: alertArgTypes,
  args: {
    withButton: true,
    closable: false,
    dsoClose: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Success: AlertStory = {
  args: {
    status: "success",
  },
  render: (args) => alertTemplate(alertArgsMapper(args, successMessage)),
};

export const Info: AlertStory = {
  args: {
    status: "info",
  },
  render: (args) => alertTemplate(alertArgsMapper(args, infoMessage)),
};

export const Warning: AlertStory = {
  args: {
    status: "warning",
  },
  render: (args) => alertTemplate(alertArgsMapper(args, warningMessage)),
};

export const Error: AlertStory = {
  args: {
    status: "error",
  },
  render: (args) => alertTemplate(alertArgsMapper(args, errorMessage)),
};

export const WithHeadings: AlertStory = {
  args: {
    status: "info",
  },
  render: (args) => alertTemplate(alertArgsMapper(args, alertWithHeadingsContent)),
};
