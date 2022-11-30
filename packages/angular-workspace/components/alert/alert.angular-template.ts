import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Alert } from "../../../sources";
import { ComponentImplementation } from "../../templates";

export const angularAlert: ComponentImplementation<Alert<StoryFnAngularReturnType>> = {
  component: "alert",
  implementation: "angular",
  template: () =>
    function alertTemplate(props) {
      return {
        props,
        template: `<dso-alert [status]="status" [roleAlert]="roleAlert">
          <div class="dso-rich-content">
            ${typeof props.message === "string" ? props.message : props.message.template}
            <button *ngIf="onClick" type="button" class="btn">Button</button>
          </div>
        </dso-alert>`,
      };
    },
};
