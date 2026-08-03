import type { IStory } from "@storybook/angular";
import { HighlightBox } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { iconTemplate } from "../icon/icon.angular-template";

export const angularHighlightBox: ComponentImplementation<HighlightBox<IStory>> = {
  component: "highlightBox",
  implementation: "angular",
  template: () =>
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
          ${props.icon ? iconTemplate({ icon: props.icon, slot: "'icon'" }, { icon: props.icon, slot: "'icon'" }).template : ""}
          ${typeof props.content === "string" ? props.content : props.content.template}
        </dso-highlight-box>
      `,
      };
    },
};
