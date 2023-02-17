import { ExpandableHeading } from "dso-toolkit";
import * as React from "react";

import { DsoExpandableHeading } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactExpandableHeading: ComponentImplementation<ExpandableHeading<JSX.Element>> = {
  component: "expandableHeading",
  implementation: "react",
  template: () =>
    function expandableHeadingTemplate({ title, addonsStart, addonsEnd, content }: ExpandableHeading<JSX.Element>) {
      return (
        <DsoExpandableHeading>
          {title} {addonsStart} {addonsEnd} {content}
        </DsoExpandableHeading>
      );
    },
};
