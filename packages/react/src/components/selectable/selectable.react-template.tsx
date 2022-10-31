import { Selectable } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoSelectable } from "../..";
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
      checked,
      indeterminate,
      disabled,
      dsoChange,
      info,
    }) {
      return (
        <DsoSelectable
          type={type}
          identifier={id || undefined}
          value={value}
          name={name}
          describedById={describedById}
          invalid={invalid}
          disabled={disabled}
          required={required}
          checked={checked}
          indeterminate={indeterminate}
          infoFixed={info?.fixed}
          onDsoChange={(e: CustomEvent<Event>) => dsoChange?.(e.detail)}
        >
          {label}
          {info?.richContent ?? ""}
        </DsoSelectable>
      );
    },
};
