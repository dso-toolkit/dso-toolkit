import { Badge } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularBadge: ComponentImplementation<Badge> = {
  component: "badge",
  implementation: "angular",
  template: () =>
    function badgeTemplate(props) {
      return {
        props,
        template: `<dso-badge [status]="status">{{ message }}</dso-badge>`,
      };
    },
};
