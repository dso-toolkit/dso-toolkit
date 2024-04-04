import { Addon_DecoratorFunction } from "@storybook/types";
import React from "react";

export const decorator: Addon_DecoratorFunction<JSX.Element> = (story) => (
  <>
    <span>toggle open control in the controls panel to expand/collapse.</span>
    {story()}
    <style>
      {`
        dso-expandable[open],
        dso-expandable:not(.dso-hide) {
          border: 1px solid #000;
        }
    `}
    </style>
  </>
);
