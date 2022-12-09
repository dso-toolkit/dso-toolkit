import { Icon } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  icon: "icon",
  slot: "slot",
};

export const angularIcon: ComponentImplementation<Icon> = {
  component: "icon",
  implementation: "angular",
  template: () =>
    function iconTemplate(props, propValues) {
      const { icon, slot } = {
        ...defaultPropValues,
        ...propValues,
      };

      return {
        props,
        template: `<dso-icon [icon]="${icon}" ${props.slot ? ` [slot]="${slot}"` : ""}></dso-icon>`,
      };
    },
};
