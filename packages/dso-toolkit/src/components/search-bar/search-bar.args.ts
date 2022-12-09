import { ArgTypes } from "../../storybook/index.js";

import { SearchBar } from "./search-bar.models.js";

export interface SearchBarArgs {
  label: string;
  id: string;
  icon: boolean;
  hiddenLabel: boolean;
  invalid: boolean;
  placeholder?: string;
  value?: string;
  buttonLabel: string;
  hideSearchButton: boolean;
  resultsMessage?: string;
  resultsHidden: boolean;
  ariaDescribedBy?: string;
  ariaErrorMessage?: string;
}

export const searchBarArgTypes: ArgTypes<SearchBarArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  id: {
    control: {
      type: "text",
    },
  },
  icon: {
    control: {
      type: "boolean",
    },
  },
  hiddenLabel: {
    control: {
      type: "boolean",
    },
  },
  invalid: {
    control: {
      type: "boolean",
    },
  },
  placeholder: {
    control: {
      type: "text",
    },
  },
  value: {
    control: {
      type: "text",
    },
  },
  buttonLabel: {
    control: {
      type: "text",
    },
  },
  hideSearchButton: {
    control: {
      type: "boolean",
    },
  },
  resultsMessage: {
    control: {
      type: "text",
    },
  },
  resultsHidden: {
    control: {
      type: "boolean",
    },
  },
  ariaDescribedBy: {
    control: {
      type: "text",
    },
  },
  ariaErrorMessage: {
    control: {
      type: "text",
    },
  },
};

export function searchBarArgsMapper(a: SearchBarArgs): SearchBar {
  return {
    label: a.label,
    id: a.id,
    icon: a.icon,
    hiddenLabel: a.hiddenLabel,
    invalid: a.invalid,
    placeholder: a.placeholder,
    value: a.value,
    buttonLabel: a.buttonLabel,
    hideSearchButton: a.hideSearchButton,
    resultsMessage: a.resultsMessage,
    resultsHidden: a.resultsHidden,
    ariaDescribedBy: a.ariaDescribedBy,
    ariaErrorMessage: a.ariaErrorMessage,
  };
}
