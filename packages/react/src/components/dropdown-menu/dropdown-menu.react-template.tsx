import { DsoDropdownMenuItemCustomEvent } from "@dso-toolkit/core";
import { DropdownMenu, DropdownMenuItemClickEvent } from "dso-toolkit";
import * as React from "react";

import { DsoDropdownMenu, DsoDropdownMenuGroup, DsoDropdownMenuItem } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "react",
  template: () =>
    function dropdownMenuTemplate({ label, variant, checkable, groups, dropdownAlign }) {
      return (
        <DsoDropdownMenu
          label={label}
          variant={variant}
          dropdown-align={dropdownAlign === "right" ? "right" : undefined}
          checkable={checkable || undefined}
        >
          {groups.map((group, index) => (
            <DsoDropdownMenuGroup label={group.label} key={index}>
              {group.items.map((item, index) => (
                <DsoDropdownMenuItem
                  type={item.type}
                  href={("href" in item && item.href) || undefined}
                  checked={item.checked}
                  onDsoClick={(e: DsoDropdownMenuItemCustomEvent<DropdownMenuItemClickEvent>) => item.dsoClick?.(e)}
                  key={index}
                >
                  {item.label}
                </DsoDropdownMenuItem>
              ))}
            </DsoDropdownMenuGroup>
          ))}
        </DsoDropdownMenu>
      );
    },
};
