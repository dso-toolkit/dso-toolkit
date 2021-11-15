import { storiesOfDropdownMenu } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { dropdownMenuTemplate } from "./dropdown-menu.template";
import readme from "./readme.md";

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme,
  },
  {
    dropdownMenuTemplate,
    children: (content) => (
      <>
        {content.map((group, index) => (
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
      </>
    ),
  }
);
