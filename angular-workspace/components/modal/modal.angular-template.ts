import type { IStory } from "@storybook/angular";
import { Modal } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularModal: ComponentImplementation<Modal<IStory>> = {
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
            @if(footer){
              <div slot="footer" [innerHTML]="footer.template | trustHtml"></div>
            }
          </dso-modal>`,
      };
    },
};
