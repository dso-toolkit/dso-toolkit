import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import type { SegmentedButton } from "../../../../packages/dso-toolkit/src/components/segmented-button/segmented-button.models";
import { ComponentImplementation } from "../../templates";

export const coreSegmentedButton: ComponentImplementation<SegmentedButton> = {
  component: "segmentedButton",
  implementation: "core",
  template: () =>
    function segmentedButtonTemplate({ options, activeOption, dsoChange }) {
      return html`
        <dso-segmented-button
          .options=${options}
          activeOption=${activeOption}
          @dsoChange=${ifDefined(dsoChange)}
        ></dso-segmented-button>
      `;
    },
};
