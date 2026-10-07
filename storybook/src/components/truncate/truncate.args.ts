import { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";

import { noControl } from "../../shared/no-control.js";

export interface TruncateArgs {
  content: TemplateResult;
}

export const truncateArgTypes: ArgTypes<TruncateArgs> = {
  content: noControl(),
};
