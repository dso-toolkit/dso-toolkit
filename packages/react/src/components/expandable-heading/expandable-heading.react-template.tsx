import { ExpandableHeading } from "dso-toolkit";
import * as React from "react";

import { DsoExpandableHeading } from "../../components";
import { ComponentImplementation } from "../../templates";

import { v4 as uuidv4 } from "uuid";

export const reactExpandableHeading: ComponentImplementation<ExpandableHeading<JSX.Element>> = {
  component: "expandableHeading",
  implementation: "react",
  template: () =>
    function expandableHeadingTemplate({
      heading,
      title,
      color,
      addonsStart,
      addonsEnd,
      content,
      dsoToggle,
    }: ExpandableHeading<JSX.Element>) {
      const key = uuidv4();

      return (
        <DsoExpandableHeading key={key} heading={heading} color={color} onDsoToggle={dsoToggle}>
          {title} {addonsStart} {addonsEnd} {content}
        </DsoExpandableHeading>
      );
    },
};
