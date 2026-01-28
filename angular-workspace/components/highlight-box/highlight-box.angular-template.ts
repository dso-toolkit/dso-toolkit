import type { IStory } from "@storybook/angular";
import { HighlightBox, HighlightBoxColor } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularHighlightBox: ComponentImplementation<HighlightBox<IStory>> = {
  component: "highlightBox",
  implementation: "angular",
  template: ({ iconTemplate }) =>
    function highlightBoxTemplate(props) {
      const defaultColor = props.color ?? HighlightBoxColor.grey;
      return {
        props,
        template: `
        <dso-highlight-box
          [step]="${props.step}"
          [attr.color]="'${defaultColor}'"
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
