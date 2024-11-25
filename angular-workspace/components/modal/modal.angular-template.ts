import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";
import { Modal } from "dso-toolkit";

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
            [fullscreen]="fullscreen"
            [dialogRole]="role"
            [modalTitle]="modalTitle"
            [showCloseButton]="showCloseButton"
            (dsoClose)="dsoClose?.($event)"
          >
            <div slot="body" [innerHTML]="body.template | trustHtml"></div>
            <div *ngIf="footer" slot="footer" [innerHTML]="footer.template | trustHtml"></div>
          </dso-modal>`,
      };
    },
};
