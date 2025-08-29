import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";
import { AdvancedSelect, selectExampleOption } from "../advanced-select";
import { options } from "../advanced-select/advanced-select.content";
import { DefinitionList } from "../definition-list";

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
  statusMessage?: string;
  variant?: "ontwerp" | "besluitversie";
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
  statusMessage: {
    control: {
      type: "text",
    },
  },
  variant: {
    options: [undefined, "ontwerp", "besluitversie"],
    control: {
      type: "select",
    },
  },
};

export function documentHeaderArgsMapper<TemplateFnReturnType>(
  a: DocumentHeaderArgs,
  featuresContent: Map<string, Map<string, DefinitionList<TemplateFnReturnType>>>,
): DocumentHeader<TemplateFnReturnType> {
  return {
    title: a.title,
    owner: a.owner,
    type: a.type,
    featuresContent,
    featureAction: a.featureAction,
    featuresOpen: a.featuresOpen,
    advancedSelect: {
      ...a.advancedSelect,
      active: selectExampleOption(a.activeIndex, options),
    },
    sticky: a.sticky,
    variant: a.variant,
    statusMessage: a.statusMessage,
  };
}
