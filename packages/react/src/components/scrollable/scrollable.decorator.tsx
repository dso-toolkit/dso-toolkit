import React from "react";
import { ScrollableDecorator } from "dso-toolkit";

export const decorator: ScrollableDecorator<React.JSX.Element> = (storyFn) => {
  const story = storyFn();
  return (
    <div id="scrollable-mock" style={{ backgroundColor: "#efefef", height: "750px", width: "500px" }}>
      {React.isValidElement(story) ? story : null}
    </div>
  );
};
