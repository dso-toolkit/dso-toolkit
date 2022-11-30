import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Selectable } from "../../../sources";
import { ComponentImplementation } from "../../templates";
import { SelectableVariables } from "./selectable.models";

export const angularSelectable: ComponentImplementation<Selectable<StoryFnAngularReturnType>> = {
  component: "selectable",
  implementation: "angular",
  template: () =>
    function selectableTemplate(props) {
      const template = selectableHtml({
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
        infoContent: "info?.content.template",
        infoFixed: "info?.fixed",
        slot: "slot",
        dsoChange: "dsoChange?.($event.detail)",
      });

      return {
        props,
        template,
      };
    },
};

export function selectableHtml(variables: SelectableVariables) {
  const template = `
    <dso-selectable
      [type]="${variables.type}"
      [identifier]="${variables.identifier}"
      [value]="${variables.value}"
      ${variables.name ? `[name] = "${variables.name}"` : ""}
      ${variables.describedById ? `[describedById]="${variables.describedById}"` : ""}
      ${variables.invalid ? `[invalid]="${variables.invalid}"` : ""}
      ${variables.disabled ? `[disabled]="${variables.disabled}"` : ""}
      ${variables.required ? `[required]="${variables.required}"` : ""}
      ${variables.checked ? `[checked]="${variables.checked}"` : ""}
      ${variables.indeterminate ? `[indeterminate]="${variables.indeterminate}"` : ""}
      [infoFixed]="${variables.infoFixed}"
      ${variables.slot ? `[slot]="${variables.slot}"` : ""}
      (dsoChange)="${variables.dsoChange}"
    >
      {{ ${variables.label} }}
      ${variables.infoContent ? `<div [outerHTML]="${variables.infoContent}"></div>` : ""}
    </dso-selectable>
  `;

  return template;
}

export function selectableMapper(selectable: Selectable<StoryFnAngularReturnType>): SelectableVariables {
  return {
    type: `'${selectable.type}'`,
    identifier: `'${selectable.id}'`,
    label: typeof selectable.label === "string" ? `'${selectable.label}'` : `'${selectable.label.template}'`,
    name: selectable.name ? `'${selectable.name}'` : "",
    value: `'${selectable.value}'`,
    required: selectable.required,
    invalid: selectable.invalid,
    describedById: selectable.describedById ? `'${selectable.describedById}'` : "",
    checked: selectable.checked,
    indeterminate: selectable.indeterminate,
    disabled: selectable.disabled,
    infoContent: selectable.info
      ? typeof selectable.info.content === "string"
        ? `'${selectable.info.content}'`
        : `'${selectable.info.content.template}'`
      : "",
    infoFixed: selectable.info && selectable.info.fixed,
    slot: selectable.slot ? `'${selectable.slot}'` : "",
    // dsoChange: "",
  };
}
