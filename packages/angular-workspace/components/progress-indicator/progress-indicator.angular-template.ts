import { ProgressIndicator } from "../../../sources";
import { ComponentImplementation, DefaultPropValues } from "../../templates";

const defaultPropValues: DefaultPropValues<ProgressIndicator> = {
  label: "label",
  block: "block",
  size: "size",
};

export const angularProgressIndicator: ComponentImplementation<ProgressIndicator> = {
  component: "progressIndicator",
  implementation: "angular",
  template: () =>
    function progressIndicatorTemplate(props, propValues) {
      const { label, block, size } = { ...defaultPropValues, ...propValues };

      return {
        props,
        template: `
          <dso-progress-indicator
            [label]="${label}"
            ${block ? `[block]="${block}"` : ""}
            ${size ? `[size]="${size}"` : ""}
          ></dso-progress-indicator>
        `,
      };
    },
};
