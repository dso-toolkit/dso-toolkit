import { DsoSegmentedButtonCustomEvent } from "@dso-toolkit/core";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { SegmentedButton, SegmentedButtonChangeEvent } from "./segmented-button.models.js";

export function segmentedButtonTemplate({
  options,
  activeOption,
  dsoChange,
  segmentedAriaRequired,
  segmentedAriaLabel,
}: SegmentedButton) {
  function statefulChangeHandler(event: DsoSegmentedButtonCustomEvent<SegmentedButtonChangeEvent>) {
    dsoChange?.(event);

    event.target.activeOption = event.detail.option;
  }

  return html`
    <dso-segmented-button
      .options=${options}
      .activeOption=${ifDefined(activeOption)}
      ?segmented-aria-required=${segmentedAriaRequired}
      segmented-aria-label=${ifDefined(segmentedAriaLabel)}
      @dsoChange=${statefulChangeHandler}
    ></dso-segmented-button>
  `;
}
