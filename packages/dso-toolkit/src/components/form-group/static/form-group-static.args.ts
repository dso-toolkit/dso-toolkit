import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../../storybook";

import { FormGroupStatic } from "./form-group-static.models";

export interface FormGroupStaticArgs {
  id: string;
  label: string;
  value: string;
  edit: boolean;
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
}

export const formGroupStaticArgs: FormGroupStaticArgs = {
  id: "mijn-id",
  label: "Kleur van object",
  value: "rood",
  edit: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  infoButtonHandler: fn(),
  infoCloseHandler: fn(),
};

export const formGroupStaticArgTypes: ArgTypes<FormGroupStaticArgs> = {
  id: {
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
  edit: {
    control: {
      type: "boolean",
    },
  },
  infoActive: {
    control: {
      type: "boolean",
    },
  },
  infoButtonHandler: argTypeAction(),
  infoButtonLabel: {
    control: {
      type: "text",
    },
  },
  infoText: {
    control: {
      type: "text",
    },
  },
  infoCloseHandler: argTypeAction(),
  infoFixed: {
    control: {
      type: "boolean",
    },
  },
};

export function formGroupStaticArgsMapper<TemplateFnReturnType>(
  a: FormGroupStaticArgs,
): FormGroupStatic<TemplateFnReturnType> {
  return {
    group: "static",
    id: a.id,
    label: a.label,
    value: a.value,
    edit: a.edit,
    infoButton:
      a.infoButtonLabel && a.infoText
        ? {
            dsoToggle: a.infoButtonHandler,
            active: a.infoActive,
            label: a.infoButtonLabel,
          }
        : undefined,
    info:
      a.infoButtonLabel && a.infoText
        ? {
            active: a.infoActive,
            fixed: a.infoFixed,
            dsoClose: a.infoCloseHandler,
            content: a.infoText,
          }
        : undefined,
  };
}
