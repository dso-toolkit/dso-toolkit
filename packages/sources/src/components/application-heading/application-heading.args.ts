import { ArgTypes } from "../../storybook";
import { ApplicationHeading } from "./application-heading.models";

export interface ApplicationHeadingArgs {
  title: string;
  subtitle?: string;
  step?: string;
}

export const applicationHeadingArgTypes: ArgTypes<ApplicationHeadingArgs> = {
  title: {
    control: {
      type: "text",
    },
  },
  subtitle: {
    control: {
      type: "text",
    },
  },
  step: {
    control: {
      type: "text",
    },
  },
};

export function applicationHeadingArgsMapper(a: ApplicationHeadingArgs): ApplicationHeading {
  return {
    title: a.title,
    subtitle: a.subtitle,
    step: a.step,
  };
}
