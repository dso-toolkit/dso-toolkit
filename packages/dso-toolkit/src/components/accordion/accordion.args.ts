import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Accordion, AccordionHeading, AccordionSection, AccordionSectionStatus } from "./accordion.models.js";

export interface AccordionArgs {
  variant: undefined | "compact" | "conclusion";
  reverseAlign: boolean;
  dsoToggleClick: HandlerFunction;
  dsoAnimationEnd: HandlerFunction;
  open: boolean;
  statusDescription: string;
  status: AccordionSectionStatus;
  attachmentCount: number;
  icon: string;
  heading: AccordionHeading;
  handleUrl: string;
  handleTitle: string;
  demoScrollIntoViewAfterOpen: boolean;
}

export const accordionArgs: Pick<AccordionArgs, "demoScrollIntoViewAfterOpen" | "open"> = {
  open: false,
  demoScrollIntoViewAfterOpen: true,
};

export const accordionArgTypes: ArgTypes<AccordionArgs> = {
  variant: {
    options: [undefined, "compact", "conclusion", "neutral", "compact-black"],
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
  /* Section args */
  dsoToggleClick: {
    ...noControl,
    action: "dsoToggleClick",
  },
  dsoAnimationEnd: {
    ...noControl,
    action: "dsoAnimationEnd",
  },
  open: {
    control: {
      type: "boolean",
    },
  },
  statusDescription: {
    control: {
      type: "text",
    },
  },
  status: {
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
  /** demo args */
  demoScrollIntoViewAfterOpen: {
    control: {
      type: "boolean",
    },
  },
};

export function accordionArgsMapper<TemplateFnReturnType>(
  a: AccordionArgs,
  sections: AccordionSection<TemplateFnReturnType>[]
): Accordion<TemplateFnReturnType> {
  return {
    variant: a.variant,
    reverseAlign: a.reverseAlign,
    sections: sections.map((s, i) => {
      const section: AccordionSection<TemplateFnReturnType> = {
        ...s,
        dsoToggleClick: (e) => a.dsoToggleClick(e.detail),
      };

      if (i === 1) {
        section.open = a.open;
        section.statusDescription = a.statusDescription;
        section.status = a.status;
        section.attachmentCount = a.attachmentCount;
        section.icon = a.icon;
        section.heading = a.heading;
        section.handleUrl = a.handleUrl;
        section.dsoAnimationEnd = (e) => {
          if (a.demoScrollIntoViewAfterOpen && a.open) {
            e.detail.scrollIntoView();
          }

          a.dsoAnimationEnd(e.detail);
        };
      }

      if (a.demoScrollIntoViewAfterOpen) {
        if (i === 0) {
          section.open = true;
        }

        if (i === sections.length - 1) {
          section.open = true;
        }
      }

      return section;
    }),
  };
}
