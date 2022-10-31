import { ArgTypes } from "../../storybook";
import { HandlerFunction } from "@storybook/addon-actions";
import { Info } from "./info.models";

export interface InfoArgs {
  id: string;
  fixed: boolean;
  active: boolean;
  dsoClose: HandlerFunction;
}

export const infoArgTypes: ArgTypes<InfoArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
  fixed: {
    control: {
      type: "boolean",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  dsoClose: {
    action: "dsoClosed",
  },
};

export function infoArgsMapper<TemplateFnReturnType>(
  a: InfoArgs,
  richContent: TemplateFnReturnType
): Required<Info<TemplateFnReturnType>> {
  return {
    id: a.id,
    fixed: a.fixed,
    active: a.active,
    richContent,
    dsoClose: a.dsoClose,
  };
}
