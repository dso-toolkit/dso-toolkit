import { ArgTypes } from "../../storybook";
import { HelpcenterPanel } from "./helpcenter-panel.models";

export interface HelpcenterPanelArgs {
  label?: string;
  url: string;
}

export const helpcenterPanelArgTypes: ArgTypes<HelpcenterPanelArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  url: {
    control: {
      type: "text",
    },
  },
};

export function helpcenterPanelArgsMapper(a: HelpcenterPanelArgs): HelpcenterPanel {
  return {
    label: a.label,
    url: a.url,
  };
}
