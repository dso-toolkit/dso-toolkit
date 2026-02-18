import { MapMessage } from "@dso-toolkit/core/src/components/map-message/map-message.interfaces";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreMapMessage: ComponentImplementation<MapMessage> = {
  component: "mapMessage",
  implementation: "core",
  template: () =>
    function mapMessageTemplate({ variant, message, buttonLabels, dsoActionClick }: MapMessage) {
      return html`<dso-map-message
        variant=${variant}
        message=${message}
        .buttonLabels=${buttonLabels}
        @dsoActionClick=${ifDefined(dsoActionClick)}
      >
      </dso-map-message>`;
    },
};
