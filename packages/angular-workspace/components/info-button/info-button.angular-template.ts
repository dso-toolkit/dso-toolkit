import { InfoButton } from "../../../sources";

import { ComponentImplementation } from "../../templates";

export const angularInfoButton: ComponentImplementation<InfoButton> = {
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
            (dsoToggle)="dsoToggle?.($event)"
          ></dso-info-button>
        `,
      };
    },
};
