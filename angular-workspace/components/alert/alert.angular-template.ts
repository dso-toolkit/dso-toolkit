import type { IStory } from "@storybook/angular";
import { Alert } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularAlert: ComponentImplementation<Alert<IStory>> = {
  component: "alert",
  implementation: "angular",
  template: () =>
    function alertTemplate(props) {
      return {
        props,
        template: `<dso-alert [status]="status" [roleAlert]="roleAlert" [compact]="compact" [closable]="closable" (dsoClose)="dsoClose?.($event)">
          <div class="dso-rich-content">
            ${typeof props.message === "string" ? props.message : props.message.template}
            @if(onClick){
              <button type="button" class="dso-alert-button" (click)="onClick($event)">Button</button>
            }
          </div>
        </dso-alert>`,
      };
    },
};
