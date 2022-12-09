import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Selectable } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  type: "type",
  identifier: "id",
  label: "label",
  value: "value",
  name: "name",
  describedById: "describedById",
  invalid: "invalid",
  disabled: "disabled",
  required: "required",
  checked: "checked",
  indeterminate: "indeterminate",
  infoFixed: "info?.fixed",
  slot: "slot",
  dsoChange: "dsoChange?.($event.detail)",
};

export const angularSelectable: ComponentImplementation<Selectable<StoryFnAngularReturnType>> = {
  component: "selectable",
  implementation: "angular",
  template: () =>
    function selectableTemplate(props, propValues) {
      const {
        type,
        identifier,
        label,
        value,
        name,
        describedById,
        invalid,
        disabled,
        required,
        checked,
        indeterminate,
        infoFixed,
        slot,
        dsoChange,
      } = { ...defaultPropValues, ...propValues };

      return {
        props,
        template: `
        <dso-selectable
          [type]="${type}"
          [identifier]="${identifier}"
          [value]="${value}"
          ${props.name ? `[name] = "${name}"` : ""}
          ${props.describedById ? `[describedById]="${describedById}"` : ""}
          ${props.invalid ? `[invalid]="${invalid}"` : ""}
          ${props.disabled ? `[disabled]="${disabled}"` : ""}
          ${props.required ? `[required]="${required}"` : ""}
          ${props.checked ? `[checked]="${checked}"` : ""}
          ${props.indeterminate ? `[indeterminate]="${indeterminate}"` : ""}
          [infoFixed]="${infoFixed}"
          ${props.slot ? `[slot]="${slot}"` : ""}
          ${props.dsoChange ? `(dsoChange)="${dsoChange}"` : ""}
        >
          {{ ${label} }}
          ${props.info?.content ?? ""}
        </dso-selectable>
      `,
      };
    },
};
