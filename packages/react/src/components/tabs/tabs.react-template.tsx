import { Tabs } from "dso-toolkit";

import * as React from "react";

import { DsoTabs, DsoTab } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactTabs: ComponentImplementation<Tabs<JSX.Element>> = {
  component: "tabs",
  implementation: "react",
  template: () =>
    function tabsTemplate({ items, dsoTabSwitch }) {
      return (
        <DsoTabs onDsoTabSwitch={dsoTabSwitch}>
          {items.map(({ label, id, modifiers, content }, i) => (
            <DsoTab
              key={`dsoAccordionSection-${i}`}
              label={label}
              identifier={id}
              active={modifiers === "active"}
              disabled={modifiers === "disabled"}
            >
              {content}
            </DsoTab>
          ))}
        </DsoTabs>
      );
    },
};
