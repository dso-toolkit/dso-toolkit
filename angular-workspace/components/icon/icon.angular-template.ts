import { Icon } from "dso-toolkit";

import { PropValues, SlottableTemplate } from "../../templates";

const defaultPropValues = {
  icon: "icon",
  slot: "slot",
};

export function iconTemplate(
  props: Icon & SlottableTemplate,
  propValues: PropValues<Icon & SlottableTemplate> | undefined,
) {
  const { icon, slot } = {
    ...defaultPropValues,
    ...propValues,
  };

  return {
    props,
    template: `<dso-icon [icon]="${icon}" ${props.slot ? ` [slot]="${slot}"` : ""}></dso-icon>`,
  };
}
