import { Label } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  slotName: "slotName",
  label: "label",
  symbol: "symbol",
  status: "status",
  compact: "compact",
  truncate: "truncate",
  removable: "removable",
  dsoRemoveClick: "dsoRemoveClick($event)",
};

export const angularLabel: ComponentImplementation<Label> = {
  component: "label",
  implementation: "angular",
  template: () =>
    function labelTemplate(props, propValues) {
      const { slotName, label, symbol, status, compact, truncate, removable, dsoRemoveClick } = {
        ...defaultPropValues,
        ...propValues,
      };

      return {
        props,
        template: `
          <dso-label
            [slot]="${slotName}"
            [status]="${status}"
            [compact]="${compact}"
            [truncate]="${truncate}"
            [removable]="${removable}"
            (dsoRemoveClick)="${dsoRemoveClick}"
          >
            <span
              *ngIf="${symbol}"
              slot="${symbol}"
              [innerHTML]="${symbol}"
            ></span>
            {{ ${label} }}
          </dso-label>
        `,
      };
    },
};
