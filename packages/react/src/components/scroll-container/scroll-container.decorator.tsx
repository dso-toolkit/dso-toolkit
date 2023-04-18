import { DecoratorFunction } from "@storybook/addons";
import React from "react";

export const decorator: DecoratorFunction<JSX.Element> = (story) => (
  <div id="scroll-container-mock" style={{ backgroundColor: "#efefef", height: "750px", width: "500px" }}>
    {story()}
  </div>
);
