import { DropdownMenu } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoDropdownMenu } from "../..";

export function dropdownMenuTemplate({
  button,
  dropdownAlign,
  isCheckable,
  groups,
}: DropdownMenu) {
  return (
    <DsoDropdownMenu dropdown-align={dropdownAlign === 'right' ? 'right' : undefined} checkable={isCheckable || undefined}>
      <button type="button" className={`dso-${button.variant}`} slot="toggle">
        <span>{button.label}</span>
      </button>
      <div className="dso-dropdown-options">
        {groups.map((group, index) => (
          <React.Fragment key={index}>
            {group.header ? (
              <h2 className="dso-group-label">{group.header}</h2>
            ) : undefined}

            <ul>
              {group.items.map((item) => (
                <li key={item.label} {...(item.checked ? { className: "dso-checked" } : {})}>
                  {item.type == "anchor" ? (
                    <a href={item.url}>{item.label}</a>
                  ) : (
                    <button type="button">{item.label}</button>
                  )}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </DsoDropdownMenu>
  );
}
