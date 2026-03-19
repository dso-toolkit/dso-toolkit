import { DsoSegmentedButtonCustomEvent, SegmentedButtonChangeEvent } from "@dso-toolkit/core";
import type { SegmentedButton } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreSegmentedButton: ComponentImplementation<SegmentedButton> = {
  component: "segmentedButton",
  implementation: "core",
  template: () =>
    function segmentedButtonTemplate({ options, activeOption, dsoChange, segmentedAriaRequired, segmentedAriaLabel }) {
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
    },
};
