import { SlideToggle } from "dso-toolkit";
import * as React from "react";

import { DsoSlideToggle } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactSlideToggle: ComponentImplementation<SlideToggle> = {
  component: "slideToggle",
  implementation: "react",
  template: () =>
    function slideToggleTemplate({ checked, disabled, identifier, arialabelledbyid }) {
      return (
        <DsoSlideToggle
          checked={checked}
          disabled={disabled}
          identifier={identifier}
          arialabelledbyid={arialabelledbyid}
        ></DsoSlideToggle>
      );
    },
};
