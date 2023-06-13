import { DecoratorFunction } from "@storybook/addons";
import React from "react";

export const decorator: DecoratorFunction<JSX.Element> = (story) => (
  <div id="scrollable-mock" style={{ backgroundColor: "#efefef", height: "750px", width: "500px" }}>
    {story()}
  </div>
);
