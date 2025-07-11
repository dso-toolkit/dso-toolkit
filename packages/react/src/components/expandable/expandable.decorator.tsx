import { ExpandableDecorator } from "dso-toolkit";
import React from "react";

export const decorator: ExpandableDecorator<JSX.Element> = (story) => {
  const s = story();
  if (!React.isValidElement(s)) {
    throw new Error("Expected a valid JSX element");
  }

  return (
    <>
      <span>toggle open control in the controls panel to expand/collapse.</span>
      {s}
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
};
