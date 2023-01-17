import { SlideToggle } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularSlideToggle: ComponentImplementation<SlideToggle> = {
  component: "slideToggle",
  implementation: "angular",
  template: () =>
    function slideToggleTemplate(props) {
      return {
        props,
        template: `<dso-slide-toggle [checked]="checked"></dso-slide-toggle>`,
      };
    },
};
