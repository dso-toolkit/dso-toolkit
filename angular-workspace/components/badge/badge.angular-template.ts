import { IStory } from "@storybook/angular";
import { Badge } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularBadge: ComponentImplementation<Badge<IStory>> = {
  component: "badge",
  implementation: "angular",
  template: () =>
    function badgeTemplate(props) {
      return {
        props,
        template: `
          <dso-badge
            [status]="status"
            [label]="label"
            [toggletipPlacement]="toggletipPlacement"
            [tooltipPlacement]="tooltipPlacement">
              {{ message }}
              ${props.children ? `<div slot="toggletip">${props.children.template}</div>` : ""}
          </dso-badge>
        `,
      };
    },
};
