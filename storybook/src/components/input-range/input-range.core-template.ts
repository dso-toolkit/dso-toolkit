import { InputRange, InputRangeChangeEvent } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { DsoInputRangeCustomEvent } from "@dso-toolkit/core";

export const coreInputRange: ComponentImplementation<InputRange> = {
  component: "inputRange",
  implementation: "core",
  template: () =>
    function inputRangeTemplate({ min, max, value, step, label, unit, description, dsoChange }) {
      return html`<dso-input-range
        min=${ifDefined(min)}
        max=${ifDefined(max)}
        value=${ifDefined(value)}
        step=${ifDefined(step)}
        label=${ifDefined(label)}
        unit=${ifDefined(unit)}
        description=${ifDefined(description)}
        @dsoChange=${(e: DsoInputRangeCustomEvent<InputRangeChangeEvent>) => dsoChange?.(e.detail)}
      ></dso-input-range>`;
    },
};
