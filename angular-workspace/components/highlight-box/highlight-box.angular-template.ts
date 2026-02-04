import type { IStory } from "@storybook/angular";
import { HighlightBox } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularHighlightBox: ComponentImplementation<HighlightBox<IStory>> = {
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
          [green]="${props.green}"
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
