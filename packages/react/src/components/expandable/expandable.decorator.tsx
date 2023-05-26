import { DecoratorFunction } from "@storybook/addons";
import React from "react";

export const decorator: DecoratorFunction<JSX.Element> = (story) => (
  <>
    <span>toggle open control in the controls panel to expand/collapse.</span>
    {story()}
    <style>
      {`
        dso-expandable {
          border: 1px solid black;
        }
    `}
    </style>
  </>
);
