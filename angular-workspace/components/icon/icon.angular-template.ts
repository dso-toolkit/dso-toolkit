import { Icon } from "dso-toolkit";

import { PropValues } from "../../templates";

const defaultPropValues = {
  icon: "icon",
  slot: "slot",
};

export function iconTemplate(props: Icon, propValues: PropValues<Icon>) {
  const { icon, slot } = {
    ...defaultPropValues,
    ...propValues,
  };

  return {
    props,
    template: `<dso-icon [icon]="${icon}" ${props.slot ? ` [slot]="${slot}"` : ""}></dso-icon>`,
  };
}
