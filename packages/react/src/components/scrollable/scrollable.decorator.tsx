import { ScrollableDecorator } from "dso-toolkit";
import React from "react";

export const decorator: ScrollableDecorator<React.JSX.Element> = (storyFn) => {
  const story = storyFn();
  return (
    <div id="scrollable-mock" style={{ backgroundColor: "#efefef", height: "100vh", width: "500px" }}>
      {React.isValidElement(story) ? story : null}
    </div>
  );
};
