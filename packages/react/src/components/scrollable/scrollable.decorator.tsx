import { Addon_DecoratorFunction } from "@storybook/types";
import React from "react";

export const decorator: Addon_DecoratorFunction<JSX.Element> = (story) => (
  <div id="scrollable-mock" style={{ backgroundColor: "#efefef", height: "750px", width: "500px" }}>
    {story()}
  </div>
);
