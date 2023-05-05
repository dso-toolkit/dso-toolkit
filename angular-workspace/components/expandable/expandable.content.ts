import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

export const expandableContent: StoryFnAngularReturnType = {
  template: `
    <div slot="expandable-content" class="dso-rich-content">
      <h3>Expandable</h3>
      <span>Dit is een expandable</span>
    </div>
  `,
};
