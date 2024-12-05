import React from "react";
import { ScrollableDecorator } from "dso-toolkit";

export const decorator: ScrollableDecorator<JSX.Element> = (story) => (
  <div id="scrollable-mock" style={{ backgroundColor: "#efefef", height: "750px", width: "500px" }}>
    {story() as React.ReactNode}
  </div>
);
