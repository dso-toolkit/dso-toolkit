import { DecoratorFunction } from "@storybook/addons";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

export const decorator: DecoratorFunction<StoryFnAngularReturnType> = (story) => {
  const { props, template } = story();

  return {
    props,
    template: `
      <span>toggle open control in the controls panel to expand/collapse.<span>
      ${template}

      <style>
        dso-expandable {
          border: 1px solid black;
        }
      </style>
    `,
  };
};
