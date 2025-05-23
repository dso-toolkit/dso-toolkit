import { Tabs } from "dso-toolkit";
import * as React from "react";

import { DsoTab, DsoTabs } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactTabs: ComponentImplementation<Tabs<JSX.Element>> = {
  component: "tabs",
  implementation: "react",
  template: () =>
    function tabsTemplate({ items, content }) {
      return (
        <DsoTabs>
          {items.map(({ label, href, modifier, dsoTabSwitch }) => (
            <DsoTab
              href={href}
              active={modifier === "active"}
              disabled={modifier === "disabled"}
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
