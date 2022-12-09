import { Icon } from "dso-toolkit";
import * as React from "react";

import { DsoIcon } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactIcon: ComponentImplementation<Icon> = {
  component: "icon",
  implementation: "react",
  template: () =>
    function iconTemplate({ icon, slot }) {
      return <DsoIcon icon={icon} slot={slot}></DsoIcon>;
    },
};
