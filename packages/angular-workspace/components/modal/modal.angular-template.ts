import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Modal } from "../../../sources";
import { ComponentImplementation } from "../../templates";

export const angularModal: ComponentImplementation<Modal<StoryFnAngularReturnType>> = {
  component: "modal",
  implementation: "angular",
  template: () =>
    function modalTemplate(props) {
      return {
        props,
        template: `
          <dso-modal
            [role]="role"
            [modalTitle]="modalTitle"
            [showCloseButton]="showCloseButton"
            (dsoClose)="dsoClose()"
          >
            <div slot="body" [innerHTML]="body.template"></div>
            <div *ngIf="footer" slot="footer" [innerHTML]="footer.template"></div>
          </dso-modal>`,
      };
    },
};
