import { Addon_DecoratorFunction } from "@storybook/types";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export const decorator: Addon_DecoratorFunction<StoryFnAngularReturnType> = (story) => {
  const { props, template } = story();

  return {
    props,
    template: `
      <span>toggle open control in the controls panel to expand/collapse.<span>
      ${template}

      <style>
        dso-expandable[open],
        dso-expandable:not(.dso-hide) {
          border: 1px solid #000;
        }
      </style>
    `,
  };
};
