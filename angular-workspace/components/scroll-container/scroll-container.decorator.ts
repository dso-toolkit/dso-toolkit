import { DecoratorFunction } from "@storybook/addons";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

export const decorator: DecoratorFunction<StoryFnAngularReturnType> = (story) => {
  const { props, template } = story();

  return {
    props,
    template: `
    <div
      id="scroll-container-mock"
      style="background-color: #efefef; height: 750px; max-width: 500px"
    >
      ${template}
    </div>
    `,
  };
};
