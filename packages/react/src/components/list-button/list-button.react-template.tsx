import { ListButton } from "dso-toolkit";
import * as React from "react";

import { DsoListButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactListButton: ComponentImplementation<ListButton> = {
  component: "listButton",
  implementation: "react",
  template: () =>
    function listButtonTemplate({
      disabled,
      label,
      sublabel,
      subcontent,
      count,
      checked,
      min,
      max,
      dsoSelectedChange,
      dsoCountChange,
    }) {
      return (
        <DsoListButton
          label={label}
          sublabel={sublabel}
          subcontent={subcontent}
          count={count}
          min={min}
          max={max}
          disabled={disabled}
          checked={checked}
          onDsoCountChange={dsoCountChange}
          onDsoSelectedChange={dsoSelectedChange}
        ></DsoListButton>
      );
    },
};
