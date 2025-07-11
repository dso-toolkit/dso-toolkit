import { ScrollableDecorator } from "dso-toolkit";
import React from "react";

export const decorator: ScrollableDecorator<React.JSX.Element> = (story) => {
  const s = story();
  if (!React.isValidElement(s)) {
    throw new Error("Expected a valid JSX element");
  }

  return (
    <div id="scrollable-mock" style={{ backgroundColor: "#efefef", height: "100vh", width: "500px" }}>
      {s}
    </div>
  );
};
