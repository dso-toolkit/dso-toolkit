import { Modal } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularStoryReturn } from "../helpers";

export const angularModal: ComponentImplementation<Modal<AngularStoryReturn>> = {
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
            [closable]="closable"
            (dsoClose)="dsoClose?.($event)"
          >
            <div slot="body" [innerHTML]="body.template | trustHtml"></div>
            <div *ngIf="footer" slot="footer" [innerHTML]="footer.template | trustHtml"></div>
          </dso-modal>`,
      };
    },
};
