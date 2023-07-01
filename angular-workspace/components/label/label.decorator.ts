import { LabelParameters } from "dso-toolkit";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export const decorator: LabelParameters<StoryFnAngularReturnType>["decorator"] = (story, css) => {
  const { props, template } = story();

  return {
    props,
    template: `
      ${template}

      <style>${css}</style>
    `,
  };
};
