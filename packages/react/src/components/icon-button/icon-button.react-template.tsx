import { IconButton } from "dso-toolkit";
import React from "react";

import { DsoIconButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "react",
  template: () =>
    function iconButtonTemplate(props) {
      return <DsoIconButton {...props} />;
    },
};
