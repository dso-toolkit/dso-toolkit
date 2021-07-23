import { DropdownMenu } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoDropdownMenu } from "../..";

export function dropdownMenuTemplate({
  button,
  dropdownAlign,
  isCheckable,
  children,
}: DropdownMenu<JSX.Element>) {
  return (
    <DsoDropdownMenu dropdown-align={dropdownAlign} checkable={isCheckable || undefined}>
      <button type="button" className={`dso-${button.variant}`} slot="button">
        <span>{button.label}</span>
      </button>
      <div className="dso-dropdown-menu">{children}</div>
    </DsoDropdownMenu>
  );
}
