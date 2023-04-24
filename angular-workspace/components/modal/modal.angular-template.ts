import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { Modal } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { ModalDemoContentComponent } from "projects/component-library/src/lib/components/modal-controller-demo/modal-controller-demo.component";

export const angularModal: ComponentImplementation<Modal<StoryFnAngularReturnType>> = {
  component: "modal",
  implementation: "angular",
  template: () =>
    function modalTemplate(props) {
      return {
        props: {
          ...props,
          body: props.body.template === "USE_COMPONENT" ? ModalDemoContentComponent : props.body,
        },
        template: `
          <modal-controller-demo
            [body]="bodyRef"
            [footer]="footerRef"
            [modalTitle]="modalTitle"
            [showCloseButton]="showCloseButton"
            [startOpen]="true"
          ></modal-controller-demo>



          <ng-template #bodyRef
            ><div [outerHTML]="$any(body?.template) | trustHtml"></div
          ></ng-template>

          ${
            props.footer !== undefined
              ? `<ng-template #footerRef
                  ><div [outerHTML]="$any(footer?.template) | trustHtml"></div
                ></ng-template>`
              : ""
          }
          `,
        // template: `
        //   <dso-modal
        //     [role]="role"
        //     [modalTitle]="modalTitle"
        //     [showCloseButton]="showCloseButton"
        //     [initialFocus]="initialFocus"
        //     (dsoClose)="dsoClose?.($event)"
        //   >
        //     <div slot="body" [innerHTML]="body.template | trustHtml"></div>
        //     <div *ngIf="footer" slot="footer" [innerHTML]="footer.template | trustHtml"></div>
        //   </dso-modal>`,
      };
    },
};
