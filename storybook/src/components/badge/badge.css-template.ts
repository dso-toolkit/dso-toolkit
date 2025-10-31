import { Badge } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssBadge: ComponentImplementation<Badge> = {
  component: "badge",
  implementation: "html-css",
  template: () =>
    function badgeTemplate({ status, message }) {
      return html`<!-- START DEPRECATED: use <dso-badge> --><span class="dso-badge ${status ? `badge-${status}` : ""}">
          ${message} </span
        ><!-- END DEPRECATED -->`;
    },
};
