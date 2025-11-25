import { LabelDecorator } from "dso-toolkit";
import React, { JSX } from "react";

export const decorator: LabelDecorator<JSX.Element> = (story, css) => {
  const s = story();
  if (!React.isValidElement(s)) {
    throw new Error("Expected a valid JSX element");
  }

  return (
    <>
      {s}

      <style>{css}</style>
    </>
  );
};
