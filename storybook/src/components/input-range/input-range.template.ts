import { DsoInputRangeCustomEvent } from "@dso-toolkit/core";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { InputRange, InputRangeChangeEvent } from "./input-range.models.js";

export function inputRangeTemplate({ min, max, value, step, label, unit, description, dsoChange }: InputRange) {
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
}
