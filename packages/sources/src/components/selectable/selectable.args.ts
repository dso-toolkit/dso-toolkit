import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes } from "../../storybook";

import { Selectable } from "./selectable.models";

export interface SelectableArgs<TemplateFnReturnType> {
  type: "radio" | "checkbox";
  id: string;
  name?: string;
  label: string;
  value: string;
  required?: boolean;
  invalid?: boolean;
  describedById?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  dsoChange: HandlerFunction;
  infoRichContent?: TemplateFnReturnType;
  infoFixed?: boolean;
  infoActive?: boolean;
  infoClosed: HandlerFunction;
  infoToggled: HandlerFunction;
}

export const selectableArgTypes: ArgTypes<SelectableArgs<unknown>> = {
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
    control: "text",
    required: true,
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
  dsoChange: {
    action: "dsoChange",
  },
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
  infoClosed: {
    action: "infoClosed",
  },
  infoToggled: {
    action: "infoToggled",
  },
};

export function selectableArgsMapper<TemplateFnReturnType>(
  a: SelectableArgs<TemplateFnReturnType>
): Selectable<TemplateFnReturnType> {
  return {
    ...a,
    info: a.infoRichContent
      ? {
          dsoClose: (e) => a.infoClosed(e),
          content: a.infoRichContent,
          active: a.infoActive,
          fixed: a.infoFixed,
        }
      : undefined,
  };
}
