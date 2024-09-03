import { Tabs } from "dso-toolkit";

import * as React from "react";

import { DsoTabs, DsoTab } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactTabs: ComponentImplementation<Tabs<JSX.Element>> = {
  component: "tabs",
  implementation: "react",
  template: () =>
    function tabsTemplate({ items, content }) {
      return (
        <DsoTabs>
          {items.map(({ label, identifier, href, modifiers, dsoTabSwitch }) => (
            <DsoTab
              href={href}
              label={label}
              identifier={identifier}
              active={modifiers === "active"}
              disabled={modifiers === "disabled"}
              onDsoTabSwitch={dsoTabSwitch}
            >
              {label}
            </DsoTab>
          ))}
          <div slot="panel">{content}</div>
        </DsoTabs>
      );
    },
};
