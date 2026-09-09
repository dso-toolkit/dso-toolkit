import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Selectable } from "./selectable.models.js";

export interface SelectableArgs {
  type: "radio" | "checkbox";
  id: string;
  name?: string;
  label: string;
  value?: string;
  required?: boolean;
  invalid?: boolean;
  describedById?: string;
  errormessage?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  dsoChange: HandlerFunction;
  infoRichContent?: TemplateResult | string;
  infoFixed?: boolean;
  infoActive?: boolean;
  infoClosed: HandlerFunction;
  infoToggled: HandlerFunction;
  options?: Selectable[];
}

export const selectableArgTypes: ArgTypes<SelectableArgs> = {
  type: {
    options: ["radio", "checkbox"],
    control: {
      type: "select",
    },
  },
  id: {
    control: {
      type: "text",
      required: true,
    },
  },
  name: {
    control: {
      type: "text",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  value: {
    control: {
      type: "text",
    },
  },
  required: {
    control: {
      type: "boolean",
    },
  },
  invalid: {
    control: {
      type: "boolean",
    },
  },
  describedById: {
    control: {
      type: "text",
    },
  },
  errormessage: {
    control: {
      type: "text",
    },
  },
  checked: {
    control: {
      type: "boolean",
    },
  },
  indeterminate: {
    control: {
      type: "boolean",
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  dsoChange: argTypeAction(),
  infoFixed: {
    control: {
      type: "boolean",
    },
  },
  infoRichContent: {
    control: {
      disable: true,
    },
  },
  infoActive: {
    control: {
      type: "boolean",
    },
  },
  infoClosed: argTypeAction(),
  infoToggled: argTypeAction(),
  options: {
    control: {
      type: "object",
    },
  },
};

export function selectableArgsMapper(
  a: SelectableArgs,
  infoRichContent: TemplateResult | string | undefined,
): Selectable {
  return {
    ...a,
    info: infoRichContent
      ? {
          dsoClose: (e) => a.infoClosed(e),
          content: infoRichContent,
          active: a.infoActive,
          fixed: a.infoFixed,
        }
      : undefined,
  };
}
