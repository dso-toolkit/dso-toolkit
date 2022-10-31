import { Toggletip } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoToggletip } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactToggletip: ComponentImplementation<Toggletip> = {
  component: "toggletip",
  implementation: "react",
  template: () =>
    function toggletipTemplate({ children, label, position, small }) {
      return (
        <DsoToggletip label={label} position={position} small={small} dangerouslySetInnerHTML={{ __html: children }} />
      );
    },
};
