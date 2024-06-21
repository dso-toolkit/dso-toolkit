import React from "react";
import { ExpandableDecorator } from "dso-toolkit";

export const decorator: ExpandableDecorator<JSX.Element> = (story) => (
  <>
    <span>toggle open control in the controls panel to expand/collapse.</span>
    {story()}
    <style>
      {`
        dso-expandable[open]:not([open="false"]),
        dso-expandable:not(.dso-hide):not([open="false"]) {
          border: 1px solid #000;
        }
    `}
    </style>
  </>
);
