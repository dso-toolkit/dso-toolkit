import { Icon } from "../../../sources";
import { ComponentImplementation } from "../../templates";

const defaultPropNames = {
  icon: "icon",
  slot: "slot",
};

export const angularIcon: ComponentImplementation<Icon> = {
  component: "icon",
  implementation: "angular",
  template: () =>
    function iconTemplate(props, propNames) {
      const { icon, slot } = {
        ...defaultPropNames,
        ...propNames,
      };

      return {
        props: {
          [icon]: props.icon,
          [slot]: props.slot,
        },
        template: `<dso-icon [icon]="${icon}" ${props.slot ? ` [slot]="${slot}"` : ""}></dso-icon>`,
      };
    },
};
