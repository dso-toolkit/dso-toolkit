import { Addon_DecoratorFunction } from "@storybook/types";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export const decorator: Addon_DecoratorFunction<StoryFnAngularReturnType> = (story) => {
  const { props, template } = story();

  return {
    props,
    template: `
    <div
      id="scrollable-mock"
      style="background-color: #efefef; height: 750px; max-width: 500px"
    >
      ${template}
    </div>
    `,
  };
};
