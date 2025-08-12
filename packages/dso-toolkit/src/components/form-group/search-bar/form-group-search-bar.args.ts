import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../../storybook";

import { FormGroupSearchBar } from "./form-group-search-bar.models";

export interface FormGroupSearchBarArgs {
  id: string;
  label: string;
  errorText?: string;
  helpText?: string;
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
  state?: "invalid" | "valid";
  searchBarValue: string;
  searchBarButtonLabel: string;
}

export const formGroupSearchBarArgs: FormGroupSearchBarArgs = {
  id: "mijn-id",
  label: "Search bar",
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  searchBarValue: "een waarde",
  searchBarButtonLabel: "Zoeken",
  infoButtonHandler: fn(),
  infoCloseHandler: fn(),
};

export const formGroupSearchBarArgTypes: ArgTypes<FormGroupSearchBarArgs> = {
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
  errorText: {
    control: {
      type: "text",
    },
  },
  helpText: {
    control: {
      type: "text",
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
  state: {
    options: [undefined, "invalid", "valid"],
    control: {
      type: "select",
    },
  },
  searchBarValue: {
    control: {
      type: "text",
    },
  },
  searchBarButtonLabel: {
    control: {
      type: "text",
    },
  },
};

export function formGroupSearchBarArgsMapper<TemplateFnReturnType>(
  a: FormGroupSearchBarArgs,
): FormGroupSearchBar<TemplateFnReturnType> {
  return {
    group: "search-bar",
    id: a.id,
    label: a.label,
    errorText: a.errorText,
    helpText: a.helpText,
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
    state: a.state,
    searchBar: {
      value: a.searchBarValue,
      id: a.id,
      buttonLabel: a.searchBarButtonLabel,
      hideSearchButton: true,
      icon: true,
      clearButton: true,
    },
  };
}
