import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

import { HighlightBox } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularHighlightBox: ComponentImplementation<HighlightBox<StoryFnAngularReturnType>> = {
  component: "highlightBox",
  implementation: "angular",
  template: ({ iconTemplate }) =>
    function highlightBoxTemplate(props) {
      return {
        props,
        template: `
        <dso-highlight-box
          [step]="${props.step}"
          [yellow]="${props.yellow}"
          [white]="${props.white}"
          [dropShadow]="${props.dropShadow}"
          [border]="${props.border}"
        >
          ${props.icon ? iconTemplate({ icon: "icon", slot: "'icon'" }).template : ""}
          ${typeof props.content === "string" ? props.content : props.content.template}
        </dso-highlight-box>
      `,
      };
    },
};
