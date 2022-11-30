import { Label } from "../../../sources";
import { ComponentImplementation } from "../../templates";

const defaultPropNames = {
  label: "label",
  symbol: "symbol",
  status: "status",
  compact: "compact",
  truncate: "truncate",
  removable: "removable",
  dsoRemoveClick: "dsoRemoveClick",
};

export const angularLabel: ComponentImplementation<Label> = {
  component: "label",
  implementation: "angular",
  template: () =>
    function labelTemplate(props, propNames) {
      const { label, symbol, status, compact, truncate, removable, dsoRemoveClick } = {
        ...defaultPropNames,
        ...propNames,
      };

      return {
        props: {
          [label]: props.label,
          [symbol]: props.symbol,
          [status]: props.status,
          [compact]: props.compact,
          [truncate]: props.truncate,
          [removable]: props.removable,
          [dsoRemoveClick]: props.dsoRemoveClick,
        },
        template: `
          <dso-label
            [status]="${status}"
            [compact]="${compact}"
            [truncate]="${truncate}"
            [removable]="${removable}"
            (dsoRemoveClick)="${dsoRemoveClick}($event)"
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
