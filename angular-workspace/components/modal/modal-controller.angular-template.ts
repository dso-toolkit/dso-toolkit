import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { Modal } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularModalController: ComponentImplementation<Modal<StoryFnAngularReturnType>> = {
  component: "modalController",
  implementation: "angular",
  template: () =>
    function modalControllerTemplate(props) {
      return {
        props,
        template: `<modal-controller-demo
          [body]="bodyRef"
          [footer]="footerRef"
          [startOpen]="true"
        ></modal-controller-demo>

        <ng-template [ngIf]="body.template !== undefined" #bodyRef
          ><div [outerHTML]="$any(body.template) | trustHtml"></div
        ></ng-template>

        <ng-template [ngIf]="footer.template !== undefined" #footerRef
          ><div [outerHTML]="$any(footer.template) | trustHtml"></div
        ></ng-template>`,
      };
    },
};
