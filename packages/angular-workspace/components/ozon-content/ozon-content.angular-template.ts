import { OzonContent } from "../../../sources";
import { ComponentImplementation } from "../../templates";

export const angularOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "angular",
  template: () =>
    function ozonContentTemplate(props) {
      return {
        props,
        template: `<dso-ozon-content [content]="content" (dsoAnchorClick)="dsoAnchorClick()"></dso-ozon-content>`,
      };
    },
};
