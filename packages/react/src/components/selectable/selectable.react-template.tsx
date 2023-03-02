import { Selectable } from "dso-toolkit";
import * as React from "react";

import { DsoSelectable } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactSelectable: ComponentImplementation<Selectable<JSX.Element>> = {
  component: "selectable",
  implementation: "react",
  template: () =>
    function selectableTemplate({
      type,
      id,
      name,
      label,
      value,
      required,
      invalid,
      describedById,
      labelledById,
      checked,
      indeterminate,
      disabled,
      dsoChange,
      info,
      slot,
    }) {
      return (
        <DsoSelectable
          type={type}
          identifier={id || undefined}
          value={value}
          name={name}
          describedById={describedById}
          labelledById={labelledById}
          invalid={invalid}
          disabled={disabled}
          required={required}
          checked={checked}
          indeterminate={indeterminate}
          infoFixed={info?.fixed}
          slot={slot}
          onDsoChange={(e: CustomEvent<Event>) => dsoChange?.(e.detail)}
        >
          {!labelledById ? label : ""}
          {info?.content ?? ""}
        </DsoSelectable>
      );
    },
};
