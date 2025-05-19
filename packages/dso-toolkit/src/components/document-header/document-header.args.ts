import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { AdvancedSelect, selectExampleOption } from "../advanced-select";
import { options } from "../advanced-select/advanced-select.content";
import { DefinitionList } from "../definition-list/definition-list.models.js";

import { DocumentHeader } from "./document-header.models.js";

export interface DocumentHeaderArgs {
  title: string;
  owner: string;
  type: string;
  featureAction: HandlerFunction;
  featuresOpen: boolean;
  activeIndex: number;
  advancedSelect: AdvancedSelect<unknown>;
  sticky: boolean;
}

export const documentHeaderArgTypes: ArgTypes<DocumentHeaderArgs> = {
  title: {
    control: {
      type: "text",
    },
  },
  owner: {
    control: {
      type: "text",
    },
  },
  type: {
    control: {
      type: "text",
    },
  },
  featureAction: {
    ...noControl,
    action: "dsoToggleSection",
  },
  featuresOpen: {
    control: {
      type: "boolean",
    },
  },
  activeIndex: {
    name: "Active option",
    control: {
      type: "number",
    },
  },
  advancedSelect: {
    ...noControl,
  },
  sticky: {
    control: {
      type: "boolean",
    },
  },
};

export function documentHeaderArgsMapper<TemplateFnReturnType>(
  a: DocumentHeaderArgs,
  features: DefinitionList<TemplateFnReturnType>,
): DocumentHeader<TemplateFnReturnType> {
  return {
    title: a.title,
    owner: a.owner,
    type: a.type,
    features,
    featureAction: a.featureAction,
    featuresOpen: a.featuresOpen,
    advancedSelect: {
      ...a.advancedSelect,
      active: selectExampleOption(a.activeIndex, options),
    },
    sticky: a.sticky,
  };
}
