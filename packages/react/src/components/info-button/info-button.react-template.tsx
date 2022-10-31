import { InfoButton } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoInfoButton } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactInfoButton: ComponentImplementation<InfoButton> = {
  component: "infoButton",
  implementation: "react",
  template: () =>
    function infoButtonTemplate({ label, active, secondary, dsoToggle }) {
      return (
        <DsoInfoButton
          label={label}
          active={active}
          secondary={secondary}
          onDsoToggle={(e: CustomEvent) => dsoToggle(e.detail)}
        ></DsoInfoButton>
      );
    },
};
