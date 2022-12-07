import { AttachmentsCounter } from "../../../sources";
import { ComponentImplementation } from "../../templates";

export const angularAttachmentsCounter: ComponentImplementation<AttachmentsCounter> = {
  component: "attachmentsCounter",
  implementation: "angular",
  template: () =>
    function attachmentsCounterTemplate(props) {
      return {
        props,
        template: `<dso-attachments-counter [count]="count"></dso-attachments-counter>`,
      };
    },
};
