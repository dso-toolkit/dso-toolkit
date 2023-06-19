import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export const expandableContent: StoryFnAngularReturnType = {
  template: `
    <div slot="expandable-content" class="dso-rich-content">
      <h3>Expandable</h3>
      <span>Dit is een expandable</span>
    </div>
  `,
};
