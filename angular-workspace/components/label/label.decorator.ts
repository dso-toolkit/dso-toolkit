import { LabelDecorator } from "dso-toolkit";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export const decorator: LabelDecorator<StoryFnAngularReturnType> = (story, css) => {
  return {
    template: `
      ${story}
      
      <style>${css}</style>
    `,
  };
};
