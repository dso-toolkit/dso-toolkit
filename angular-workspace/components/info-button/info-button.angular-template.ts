import type { IStory } from "@storybook/angular";
import { InfoButton } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularInfoButton: ComponentImplementation<InfoButton<IStory>> = {
  component: "infoButton",
  implementation: "angular",
  template: () =>
    function infoButtonTemplate(props) {
      return {
        props,
        template: `
          <dso-info-button
            [label]="label"
            [active]="active"
            [secondary]="secondary"
            [toggletipPlacement]="toggletipPlacement"
            (dsoToggle)="dsoToggle?.($event)">
            ${props.children ? `<div slot="toggletip">${props.children.template}</div>` : ""}
          </dso-info-button>
        `,
      };
    },
};
