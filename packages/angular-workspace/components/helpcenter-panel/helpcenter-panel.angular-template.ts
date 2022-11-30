import { HelpcenterPanel } from "../../../sources";
import { ComponentImplementation } from "../../templates";

export const angularHelpcenterPanel: ComponentImplementation<HelpcenterPanel> = {
  component: "helpcenterPanel",
  implementation: "angular",
  template: () =>
    function helpcenterPanelTemplate(props) {
      return {
        props,
        template: `<dso-helpcenter-panel [label]="label" [url]="url"></dso-helpcenter-panel>`,
      };
    },
};
