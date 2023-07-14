import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Accordion, AccordionHeading, AccordionSection, AccordionSectionState } from "./accordion.models.js";

export interface AccordionArgs {
  variant: undefined | "compact" | "conclusion";
  reverseAlign: boolean;
  dsoToggleSection: HandlerFunction;
  dsoToggleSectionAnimationEnd: HandlerFunction;
  open: boolean;
  status: string;
  state: AccordionSectionState;
  attachmentCount: number;
  icon: string;
  heading: AccordionHeading;
  handleUrl: string;
  handleTitle: string;
}

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, "compact", "conclusion", "neutral"],
    control: {
      type: "select",
      labels: {
        undefined: "default",
      },
    },
  },
  reverseAlign: {
    control: {
      type: "boolean",
    },
  },
  dsoToggleSection: {
    ...noControl,
    action: "dsoToggleSection",
  },
  dsoToggleSectionAnimationEnd: {
    ...noControl,
    action: "dsoToggleSectionAnimationEnd",
  },
  /* Section args */
  open: {
    control: {
      type: "boolean",
    },
  },
  status: {
    control: {
      type: "text",
    },
  },
  state: {
    options: [undefined, "success", "info", "warning", "danger", "error"],
    control: {
      type: "select",
    },
  },
  attachmentCount: {
    control: {
      type: "number",
    },
  },
  icon: {
    options: [undefined, "", "plus", "table"],
    control: {
      type: "select",
    },
  },
  heading: {
    options: ["h2", "h3", "h4", "h5"],
    control: {
      type: "select",
    },
  },
  handleUrl: {
    control: {
      text: "select",
    },
  },
  handleTitle: {
    control: {
      type: "text",
    },
  },
};

export function accordionArgsMapper<TemplateFnReturnType>(
  a: AccordionArgs,
  sections: AccordionSection<TemplateFnReturnType>[]
): Accordion<TemplateFnReturnType> {
  const firstSection = sections[0];

  if (firstSection) {
    firstSection.open = a.open;
    firstSection.status = a.status;
    firstSection.state = a.state;
    firstSection.attachmentCount = a.attachmentCount;
    firstSection.icon = a.icon;
    firstSection.heading = a.heading;
    firstSection.handleUrl = a.handleUrl;
  }

  return {
    variant: a.variant,
    reverseAlign: a.reverseAlign,
    dsoToggleSection: (e) => a.dsoToggleSection(e.detail),
    dsoToggleSectionAnimationEnd: (e) => a.dsoToggleSectionAnimationEnd(e.detail),
    sections,
  };
}
